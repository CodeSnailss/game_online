package com.mzj.controller.user;

import com.alibaba.fastjson.JSONObject;
import com.mzj.service.UserService;
import com.mzj.service.impl.UserServiceImpl;
import com.mzj.utils.MailUtil;

import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

public class ForgotServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String email = req.getParameter("email");
        UserService userService = new UserServiceImpl();
        Map<String,String> res = new HashMap<>();
        if (!userService.isHaveUser(email)){
            res.put("result","No");
            try {
                MailUtil.send(email,"验证消息","Gamer账户电子邮件验证");
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        }else {
            res.put("result","Yes");
        }
        String jsonString = JSONObject.toJSONString(res);
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();
        writer.write(jsonString);
        writer.flush();
        writer.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
