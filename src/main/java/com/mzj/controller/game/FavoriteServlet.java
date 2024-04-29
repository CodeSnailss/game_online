package com.mzj.controller.game;

import com.mzj.Final;
import com.mzj.pojo.Game;
import com.mzj.pojo.User;
import com.mzj.service.FavoriteService;
import com.mzj.service.impl.FavoriteServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class FavoriteServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = req.getParameter("method");
        if (method.equals("show")){
            this.show(req,resp);
        }else if (method.equals("add")){
            this.add(req,resp);
            this.show(req,resp);
        } else if (method.equals("remove")) {
            this.remove(req,resp);
            this.show(req,resp);
        }
        req.getRequestDispatcher("/jsp/admin/favorite.jsp").forward(req,resp);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
    private void show(HttpServletRequest req,HttpServletResponse resp){
        User user = (User) req.getSession().getAttribute(Final.USER_SESSION);
        String uemail = user.getEmail();
        FavoriteServiceImpl favoriteService = new FavoriteServiceImpl();
        List<Game> games = favoriteService.getFavoriteGames(uemail);
        req.setAttribute("gameList",games);
    }

    private void add(HttpServletRequest req,HttpServletResponse resp){
        String code = req.getParameter("code");
        User user = (User) req.getSession().getAttribute(Final.USER_SESSION);
        String uemail = user.getEmail();
        FavoriteService favoriteService = new FavoriteServiceImpl();
        int i = favoriteService.addFavorite(uemail, code);
        if (i == 0){
            req.setAttribute("error","Filed：cause duplicate collection");
        }
    }

    private void remove(HttpServletRequest req,HttpServletResponse resp){
        String code = req.getParameter("code");
        User user = (User) req.getSession().getAttribute(Final.USER_SESSION);
        String uemail = user.getEmail();
        FavoriteService favoriteService = new FavoriteServiceImpl();
        favoriteService.removeFavorite(uemail,code);
    }
}
