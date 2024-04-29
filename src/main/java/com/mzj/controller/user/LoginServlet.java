package com.mzj.controller.user;

import com.mzj.Final;
import com.mzj.pojo.User;
import com.mzj.service.UserService;
import com.mzj.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        UserService userService = new UserServiceImpl();
        //获取表单提交的数据
        String email = req.getParameter("email");
        String password = req.getParameter("password");

        User loginUser = userService.login(email, password); //用户是否存在
        if (loginUser == null){
            req.setAttribute("error","用户名或密码错误");
            req.getRequestDispatcher("/jsp/login.jsp").forward(req,resp);
        }else {
            req.getSession().setAttribute(Final.USER_SESSION,loginUser);
//            System.out.println("Path:"+req.getServletContext().getContextPath()+"/index.jsp");
            resp.sendRedirect(req.getServletContext().getContextPath()+"/index.jsp");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
