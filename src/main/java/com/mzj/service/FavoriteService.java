package com.mzj.service;

import com.mzj.pojo.Game;

import java.util.List;

public interface FavoriteService {
    List<Game> getFavoriteGames(String email);
    int addFavorite(String email, String code);
    int removeFavorite(String email, String code);
}
