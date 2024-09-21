package com.example.backend.dto;

import com.example.backend.models.Account;
import com.example.backend.models.Transaction;
import com.example.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class UserDto {
    private User user;
    private Account account;
    private List<Transaction> transactionList;
}
