package com.mzj.service.impl;

import com.mzj.dao.GameMapper;
import com.mzj.pojo.Game;
import com.mzj.service.GameService;
import com.mzj.utils.MybatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GameServiceImpl implements GameService {
    @Override
    public List<Game> queryGame(Map<String, Object> map) {
        SqlSession session = MybatisUtil.getSession();
        GameMapper mapper = session.getMapper(GameMapper.class);
        List<Game> games = mapper.queryGame(map);
        session.close();
        return games;
    }

    @Override
    public int getCount(Map map) {
        SqlSession session = MybatisUtil.getSession();
        GameMapper mapper = session.getMapper(GameMapper.class);
        int count = mapper.getCount(map);
        session.close();
        return count;
    }

    @Test
    public void testQueryGame(){
        List<Game> games = queryGame(new HashMap<String, Object>());
        System.out.println(games);
    }
    @Test
    public void testCount(){
        int count = getCount(new HashMap<>());
        System.out.println(count);
    }
}
