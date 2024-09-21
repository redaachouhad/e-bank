package com.example.backend.service;


import com.example.backend.config.Security.JwtUtilities;
import com.example.backend.dto.*;
import com.example.backend.models.Account;
import com.example.backend.models.Transaction;
import com.example.backend.models.User;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.TransactionRepository;
import com.example.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtilities jwtUtilities;

    private static final long MIN_ACCOUNT_NUMBER = 1000000000L;
    private static final long MAX_ACCOUNT_NUMBER = 9999999999L;


    public Long generateUniqueAccountNumber() {
        Random random = new Random();
        Long accountNumber;
        boolean isUnique;

        do {
            accountNumber = MIN_ACCOUNT_NUMBER + (long) (random.nextDouble() * (MAX_ACCOUNT_NUMBER - MIN_ACCOUNT_NUMBER));
            isUnique = !accountRepository.existsByAccountNumber(accountNumber);
        } while (!isUnique);

        return accountNumber;
    }

    // Function to generate random card number (16 digits)
    private String generateCardNumber() {
        StringBuilder cardNumber = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            cardNumber.append((int) (Math.random() * 10)); // Generates random digit from 0 to 9
        }
        return cardNumber.toString();
    }

    // Function to generate random CVC (3 digits)
    private String generateCVC() {
        StringBuilder cvc = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            cvc.append((int) (Math.random() * 10));
        }
        return cvc.toString();
    }

    // Function to generate expiration date in MM/YY format (2 years validity from now)
    private String generateExpirationDate() {
        LocalDate expirationDate = LocalDate.now().plusYears(2); // Valid for 2 years
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yy");
        return expirationDate.format(formatter);
    }

    public ResponseEntity<String> registerUser(User user) {
        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
        if(userOptional.isPresent()){
            return new ResponseEntity<>("Email already exist", HttpStatus.BAD_REQUEST);
        }
        User newUser = User.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .password(passwordEncoder.encode(user.getPassword()))
                .type(user.getType())
                .phoneNumber(user.getPhoneNumber())
                .build();
        newUser = userRepository.save(newUser);
        Account account = Account.builder()
                .accountNumber(generateUniqueAccountNumber())
                .accountBalance(BigDecimal.ZERO)
                .userId(newUser.getId())
                .numberOfCard(generateCardNumber())
                .expiration(generateExpirationDate())
                .cvc(generateCVC())
                .build();
        accountRepository.save(account);
        return new ResponseEntity<>("You are registered successfully", HttpStatus.OK);
    }

    public ResponseEntity<ResponseLoginDto> loginUser(LoginUserDto loginUserDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(), loginUserDto.getPassword())
        );
        if(!authentication.isAuthenticated()){
            return new ResponseEntity<>(new ResponseLoginDto("","Invalid username or password"), HttpStatus.BAD_REQUEST);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Optional<User> user = userRepository.findByEmail(loginUserDto.getEmail());
        if(user.isEmpty()){
            return new ResponseEntity<>(new ResponseLoginDto("","Invalid username or password"), HttpStatus.BAD_REQUEST);
        }
        String jwtToken = jwtUtilities.generateJwtToken(user.get());
        return new ResponseEntity<>(new ResponseLoginDto(jwtToken,"jwt generate successfully"), HttpStatus.OK);

    }

    public ResponseEntity<String> addDeposits(DepositsDto depositsDto) {
        Optional<Account> accountOptional = accountRepository.findByAccountNumber(depositsDto.getAccountNumber());
        if(accountOptional.isEmpty()){
            return new ResponseEntity<>("Account not found", HttpStatus.BAD_REQUEST);
        }
        Account account = accountOptional.get();
        account.setAccountBalance(account.getAccountBalance().add(depositsDto.getDeposit()));
        accountRepository.save(account);
        Transaction transaction = Transaction.builder()
                .transactionAmount(depositsDto.getDeposit())
                .transactionDate(new Date())
                .typeTransaction(TypeTransaction.DEPOSITS)
                .receiverAccountNumber(depositsDto.getAccountNumber())
                .senderAccountNumber(depositsDto.getAccountNumber())
                .build();
        transactionRepository.save(transaction);
        return new ResponseEntity<>("the amount of " + depositsDto.getDeposit() + " is added successfully to the account : " + depositsDto.getAccountNumber(), HttpStatus.OK);
    }

    public ResponseEntity<String> transferMoney(TransferDto transferDto) {
        Optional<Account> accountOptionalSender = accountRepository.findByAccountNumber(transferDto.getSenderAccountNumber());
        Optional<Account> accountOptionalReceiver = accountRepository.findByAccountNumber(transferDto.getReceiverAccountNumber());
        if(accountOptionalSender.isEmpty()){
            return new ResponseEntity<>("Accounts not found", HttpStatus.BAD_REQUEST);
        }
        if(accountOptionalReceiver.isEmpty()){
            return new ResponseEntity<>("Accounts not found", HttpStatus.BAD_REQUEST);
        }
        Account accountSender = accountOptionalSender.get();
        Account accountReceiver = accountOptionalReceiver.get();


        accountSender.setAccountBalance(accountSender.getAccountBalance().subtract(transferDto.getSentAmount()));
        accountReceiver.setAccountBalance(accountReceiver.getAccountBalance().add(transferDto.getSentAmount()));
        accountRepository.save(accountSender);
        accountRepository.save(accountReceiver);

        Transaction transaction = Transaction.builder()
                .transactionAmount(transferDto.getSentAmount())
                .transactionDate(new Date())
                .typeTransaction(TypeTransaction.TRANSFER)
                .receiverAccountNumber(transferDto.getReceiverAccountNumber())
                .senderAccountNumber(transferDto.getSenderAccountNumber())
                .build();
        transactionRepository.save(transaction);
        return new ResponseEntity<>("Successful transfer", HttpStatus.OK);
    }

    public ResponseEntity<List<Transaction>> getTransactions(Long numberAccount) {
        return new ResponseEntity<>(transactionRepository.findAllTransactions(numberAccount), HttpStatus.OK);
    }


    public ResponseEntity<UserDto> getUser(EmailDto emailDto) {
        Optional<User> optionalUser = userRepository.findByEmail(emailDto.getEmail());
        if(optionalUser.isEmpty()){
            return new ResponseEntity<>(new UserDto(), HttpStatus.BAD_REQUEST);
        }
        User user = optionalUser.get();
        user.setPassword("There is no password here !!!");
        Account account = accountRepository.findByUserId(user.getId());
        List<Transaction> transactions = transactionRepository.findAllTransactions(account.getAccountNumber());
        UserDto userDto = UserDto.builder()
                .user(user)
                .account(account)
                .transactionList(transactions)
                .build();
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }
}
