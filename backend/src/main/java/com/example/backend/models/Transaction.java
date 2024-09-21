package com.example.backend.models;

import com.example.backend.dto.TypeTransaction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;
    private BigDecimal transactionAmount;
    private Date transactionDate;
    @Enumerated(EnumType.STRING)
    private TypeTransaction typeTransaction;
//    private String status = "non";

    // foreign keys
    private Long receiverAccountNumber;
    private Long senderAccountNumber;




}
