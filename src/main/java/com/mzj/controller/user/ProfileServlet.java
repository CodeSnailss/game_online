package com.mzj.controller.user;

import com.alibaba.fastjson.JSONObject;
import com.mysql.jdbc.StringUtils;
import com.mzj.Final;
import com.mzj.pojo.User;
import com.mzj.service.UserService;
import com.mzj.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.dsig.SignatureProperties;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class ProfileServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = req.getParameter("method");
        if (method.equals("show")){
            this.show(req,resp);
            req.getRequestDispatcher("/jsp/admin/profile.jsp").forward(req,resp);
        }else if (method.equals("update")){
            try {
                this.update(req,resp);
                resp.sendRedirect("/jsp/admin/profile.jsp");
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        } else if (method.equals("verify")) {
            this.verify(req,resp);
            req.getRequestDispatcher("/jsp/admin/profile.jsp").forward(req,resp);
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    private void show(HttpServletRequest req, HttpServletResponse resp){
        User user = (User) req.getSession().getAttribute(Final.USER_SESSION);
        String phone = user.getTel();
        String email = user.getEmail();
        Date date = user.getBirthday();
        String username = user.getUsername();
        String birthday = null;
        if (date != null){
            birthday = new SimpleDateFormat("yyyy-MM-dd").format(user.getBirthday());
        }
        req.setAttribute("phone",phone);
        req.setAttribute("email",email);
        req.setAttribute("birthday",birthday);
        req.setAttribute("username",username);
    }

    private void update(HttpServletRequest req, HttpServletResponse resp) throws ParseException {
        User user = (User) req.getSession().getAttribute(Final.USER_SESSION);
        String email =user.getEmail();
        String oldpassword = user.getPassword();
        String newpassword = req.getParameter("newpassword");
        String birthday = req.getParameter("birthday");
        String phone = req.getParameter("phone");
        String username = req.getParameter("username");
        if (StringUtils.isNullOrEmpty(newpassword)){
            newpassword = oldpassword;
        }
        Date date = user.getBirthday();
        if(!StringUtils.isNullOrEmpty(birthday)){
            date = new SimpleDateFormat("yyyy-MM-dd").parse(birthday);
        }
        String phone2 = user.getTel();
        if (!StringUtils.isNullOrEmpty(phone)){
            phone2 = phone;
        }
        String name = user.getUsername();
        if (!StringUtils.isNullOrEmpty(username)){
            name = username;
        }

        UserService userService = new UserServiceImpl();
        userService.updateInfo(email,newpassword,date,phone2,name);
        req.getSession().removeAttribute(Final.USER_SESSION);
    }
    private void verify(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String oldPassword = req.getParameter("oldpassword");
        User user = (User) req.getSession().getAttribute(Final.USER_SESSION);
        String password = "1";
        if (user != null){
            password = user.getPassword();
        }
        Map<String,String> res = new HashMap<>();
        if (password.equals(oldPassword)){
            res.put("result","true");
        } else if (user == null) {
            res.put("result","sessionerror");
        } else if (StringUtils.isNullOrEmpty(oldPassword)){
            res.put("result","error");
        }else {
            res.put("result","false");
        }
        String jsonString = JSONObject.toJSONString(res);
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();
        writer.write(jsonString);
        writer.flush();
        writer.close();
    }
}
