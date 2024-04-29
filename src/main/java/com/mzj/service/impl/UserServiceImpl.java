package com.mzj.service.impl;

import com.mzj.dao.UserMapper;
import com.mzj.pojo.User;
import com.mzj.service.UserService;
import com.mzj.utils.MybatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;

import java.util.Date;

public class UserServiceImpl implements UserService {

    @Override
    public User login(String email, String password) {
        SqlSession session = MybatisUtil.getSession();
        UserMapper mapper = session.getMapper(UserMapper.class);
        User user = mapper.queryUser(email, password);
        session.close();
        return user;
    }

    @Override
    public boolean isHaveUser(String email) {
        SqlSession session = MybatisUtil.getSession();
        UserMapper mapper = session.getMapper(UserMapper.class);
        Integer res = mapper.isHaveUserByEmail(email);
        session.close();
        System.out.println(res);
        if (res == null)return false;
        return true;
    }

    @Override
    public int register(User user) {
        SqlSession session = MybatisUtil.getSession();
        UserMapper mapper = session.getMapper(UserMapper.class);
        int insert = mapper.insert(user);
        session.close();
        return insert;
    }

    @Override
    public int updateInfo(String email, String newpassword, Date birthday, String phone,String name) {
        SqlSession session = MybatisUtil.getSession();
        UserMapper mapper = session.getMapper(UserMapper.class);
        int update = mapper.update(email, newpassword, birthday, phone,name);
        session.close();
        return update;
    }

    @Test
    public void test(){
        System.out.println(isHaveUser("17432431@qq.com"));
        System.out.println(isHaveUser("mzhj180@163.com"));
    }

}
