package com.mzj.service;

import com.mzj.pojo.Game;

import java.util.List;
import java.util.Map;

public interface GameService {
    List<Game> queryGame(Map<String, Object> map);
    int getCount(Map<String, Object> map);
}
