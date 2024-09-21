package com.example.backend.repository;

import com.example.backend.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT transaction " +
            "from Transaction transaction " +
            "where transaction.receiverAccountNumber = :numberAccount " +
            "or transaction.senderAccountNumber = :numberAccount " +
            "order by transaction.transactionDate desc ")
    List<Transaction> findAllTransactions(Long numberAccount);
}
