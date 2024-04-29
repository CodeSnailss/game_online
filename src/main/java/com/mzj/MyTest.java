package com.mzj;


import com.mzj.dao.FavoriteMapper;
import com.mzj.dao.UserMapper;
import com.mzj.pojo.Favorite;
import com.mzj.pojo.User;
import com.mzj.utils.MailUtil;
import com.mzj.utils.MybatisUtil;
import com.mzj.utils.UUIDUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public class MyTest {
    public static void main(String[] args) {
        SqlSession session = MybatisUtil.getSession();
        UserMapper mapper = session.getMapper(UserMapper.class);
        Integer i = mapper.isHaveUserByEmail("mazhj180@163.com");
        System.out.println(i);
    }
    @Test
    public void testSend(){
        try {
            MailUtil.send("17432431@qq.com","我成功了","Gamer");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    public void testInsert(){
        SqlSession session = MybatisUtil.getSession();
        UserMapper mapper = session.getMapper(UserMapper.class);
        User user = new User(UUIDUtil.randomUUID(),"mzhj180@163.com","12345",1);
        mapper.insert(user);
    }
    @Test
    public void favoriteTest(){
        SqlSession session = MybatisUtil.getSession();
        FavoriteMapper mapper = session.getMapper(FavoriteMapper.class);
        Favorite favorite = mapper.getFavorite("mazhj180@163.com");
        System.out.println(favorite);
    }
    @Test
    public void testInsertF(){
        SqlSession session = MybatisUtil.getSession();
        FavoriteMapper mapper = session.getMapper(FavoriteMapper.class);
        mapper.insert("mazhj180@163.com","103");
    }

}
