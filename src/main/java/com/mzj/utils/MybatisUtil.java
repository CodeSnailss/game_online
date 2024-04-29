package com.mzj.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public final class MybatisUtil {
    private static SqlSessionFactory sqlSessionFactory;
    static {
        String path = "mybatis-config.xml";
        try {
            InputStream stream = Resources.getResourceAsStream(path);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(stream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public static SqlSession getSession(){
        return sqlSessionFactory.openSession(true);
    }
}
