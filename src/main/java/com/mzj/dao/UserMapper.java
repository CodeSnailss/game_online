package com.mzj.dao;

import com.mzj.pojo.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.Date;

public interface UserMapper {
    @Select("select * from user where email = #{email} and password = #{pwd}")
    User queryUser(@Param("email") String email, @Param("pwd") String password);

    @Select("select 1 from user where email = #{email} limit 1")
    Integer isHaveUserByEmail(@Param("email") String email);

    @Insert("insert into user (id,email,password,role) values (#{id},#{email},#{password},#{role})")
    int insert(User user);

    @Update("update user set password = #{password},birthday = #{birthday},tel = #{phone},username = #{username} where email = #{email}")
    int update(@Param("email") String email, @Param("password") String newpassword, @Param("birthday") Date birthday, @Param("phone") String phone,@Param("username") String name);
}
