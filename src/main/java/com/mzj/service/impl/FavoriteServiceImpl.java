package com.mzj.service.impl;

import com.mzj.dao.FavoriteMapper;
import com.mzj.pojo.Favorite;
import com.mzj.pojo.Game;
import com.mzj.service.FavoriteService;
import com.mzj.utils.MybatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;

import java.util.List;

public class FavoriteServiceImpl implements FavoriteService {
    @Override
    public List<Game> getFavoriteGames(String email) {
        SqlSession session = MybatisUtil.getSession();
        FavoriteMapper mapper = session.getMapper(FavoriteMapper.class);
        Favorite favorite = mapper.getFavorite(email);
        if (favorite != null){
            List<Game> games = favorite.getGames();
            session.close();
            return games;
        }else {
            session.close();
            return null;
        }

    }

    @Override
    public int addFavorite(String email, String code) {
        SqlSession session = MybatisUtil.getSession();
        FavoriteMapper mapper = session.getMapper(FavoriteMapper.class);
        if (!this.isExit(email,code)){
            int res = mapper.insert(email,code);
            session.close();
            return res;
        }
        session.close();
        return 0;

    }

    @Override
    public int removeFavorite(String email,String code) {
        SqlSession session = MybatisUtil.getSession();
        FavoriteMapper mapper = session.getMapper(FavoriteMapper.class);
        int res = mapper.remove(email,code);
        session.close();
        return res;
    }

    private boolean isExit(String email,String code){
        SqlSession session = MybatisUtil.getSession();
        FavoriteMapper mapper = session.getMapper(FavoriteMapper.class);
        Favorite favorite2 = mapper.getFavorite2(email, code);
        session.close();
        if (favorite2 == null){
            return false;
        }
        return true;

    }

    @Test
    public void removeTest(){
        this.removeFavorite("mazhj180@163.com","101");
    }
    @Test
    public void insert(){
        addFavorite("mazhj180@163.com","101");
        addFavorite("mazhj180@163.com","102");
        addFavorite("mazhj180@163.com","103");
        addFavorite("mazhj180@163.com","104");
        addFavorite("mazhj180@163.com","105");
        addFavorite("mazhj180@163.com","106");
    }
}
