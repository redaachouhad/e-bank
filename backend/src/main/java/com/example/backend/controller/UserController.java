package com.example.backend.controller;


import com.example.backend.dto.*;
import com.example.backend.models.Transaction;
import com.example.backend.models.User;
import com.example.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@AllArgsConstructor
public class UserController {
    private final UserService userService;

//    @GetMapping("/hello")
//    public ResponseEntity<String> greeting(){
//        return new ResponseEntity<>("Hello", HttpStatus.OK);
//    }

    @PostMapping("/auth/registerUser")
    public ResponseEntity<String> registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }

    @PostMapping("/auth/loginUser")
    public ResponseEntity<ResponseLoginDto> loginUser(@RequestBody LoginUserDto user){
        return userService.loginUser(user);
    }

    @PostMapping("/user/addDeposits")
    public ResponseEntity<String> addDeposits(@RequestBody DepositsDto depositsDto){
        return userService.addDeposits(depositsDto);
    }

    @PostMapping("/user/transfer")
    public ResponseEntity<String> transferMoney(@RequestBody TransferDto transferDto){
        return userService.transferMoney(transferDto);

    }

    @GetMapping("/user/getTransactions")
    public ResponseEntity<List<Transaction>> getTransactions(@RequestBody Long numberAccount){
        return userService.getTransactions(numberAccount);
    }

    @PostMapping("/user/getUserByEmail")
    public ResponseEntity<UserDto> getUser(@RequestBody EmailDto emailDto){
        return userService.getUser(emailDto);
    }

}
