package com.example.backend.repository;

import com.example.backend.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountNumber(Long accountNumber);

    boolean existsByAccountNumber(Long accountNumber);

    Account findByUserId(Long id);
}
