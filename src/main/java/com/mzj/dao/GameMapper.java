package com.mzj.dao;

import com.mzj.pojo.Game;

import java.util.List;
import java.util.Map;

public interface GameMapper {

    List<Game> queryGame(Map<String, Object> map);
    int getCount(Map<String, Object> map);
}
