package com.mzj.controller.game;

import com.mzj.service.GameService;
import com.mzj.service.impl.GameServiceImpl;
import com.mzj.utils.PageUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ShowGameServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        GameService gameService = new GameServiceImpl();
        Map<String,Object> paraMap = new HashMap(); //参数集
        //获取前端数据
        String gameName = req.getParameter("queryname");
        String pageIndex = req.getParameter("pageIndex");
        int currentPageNo = 1;
        if (pageIndex != null){
            currentPageNo = Integer.parseInt(pageIndex);
        }
        paraMap.put("name",gameName);
        int count = gameService.getCount(paraMap); //游戏总数
        //分页处理
        PageUtil pageUtil = new PageUtil();
        pageUtil.setPageSize(6); //设置每页容量
        pageUtil.setCurrentPageNo(currentPageNo);
        pageUtil.setTotalCount(count);
        int startIndex =(currentPageNo - 1)*pageUtil.getPageSize();
        System.out.println(startIndex);
        paraMap.put("startIndex",startIndex);
        paraMap.put("pageSize", pageUtil.getPageSize());

        List games = gameService.queryGame(paraMap); //游戏列表
        //将数据列表给前端
        req.setAttribute("totalCount",pageUtil.getTotalCount());
        req.setAttribute("currentPageNo",pageUtil.getCurrentPageNo());
        req.setAttribute("totalPageCount",pageUtil.getTotalPageCount());
        req.setAttribute("gameList",games);
        req.getRequestDispatcher("/jsp/store.jsp").forward(req,resp);

        //测试
        System.out.println("Servlet:"+req.getServletPath());
        System.out.println(req.getContextPath());

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
