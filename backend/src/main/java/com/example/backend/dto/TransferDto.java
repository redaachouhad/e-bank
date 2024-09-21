package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TransferDto {
    private Long senderAccountNumber;
    private Long receiverAccountNumber;
    private BigDecimal sentAmount;
}
