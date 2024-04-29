package com.mzj.service;

import com.mzj.pojo.User;

import java.util.Date;

public interface UserService {
    User login(String email, String password);
    boolean isHaveUser(String email);
    int register(User user);
    int updateInfo(String email, String newpassword, Date birthday, String phone,String name);
}
