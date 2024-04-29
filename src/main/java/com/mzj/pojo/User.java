package com.mzj.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    String id;
    String email;
    String password;
    int role;
    Date birthday;
    String tel;
    String username;

    public User(String id, String email, String password, int role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
