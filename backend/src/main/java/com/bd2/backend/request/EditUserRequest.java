package com.bd2.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EditUserRequest {

    private String email;
    private String password;
    private String username;
}
