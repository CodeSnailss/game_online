package com.mzj.controller.user;

import com.alibaba.fastjson.JSONObject;
import com.mzj.pojo.User;
import com.mzj.service.UserService;
import com.mzj.service.impl.UserServiceImpl;
import com.mzj.utils.MailUtil;
import com.mzj.utils.UUIDUtil;
import com.mzj.utils.VerifyCodeUtil;

import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

public class RegisterServlet extends HttpServlet {
    private String verCode;
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取前端传过来的方法名
        String method = req.getParameter("method");
        if (method.equals("verifyEmail")){
            this.verifyEmail(req,resp);
        } else if (method.equals("sendCode")) {
            try {
                this.sendCode(req,resp);
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        } else if (method.equals("registerVerify")){
            this.registerVer(req,resp);
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }

    /**
     * 验证邮箱是否存在
     * @param req
     * @param resp
     * @throws IOException
     */
    private void verifyEmail(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //获取ajax传来的email
        String email = req.getParameter("email");
        System.out.println(email);
        UserService userService = new UserServiceImpl();
        Map<String, String> map = new HashMap<>();

        if (!userService.isHaveUser(email)){ //查询数据库中是否存在
            map.put("result","true");
        }else {
            map.put("result","false");
        }
        String jsonString = JSONObject.toJSONString(map);
        System.out.println(jsonString);
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        writer.write(jsonString);
        writer.flush();
        writer.close();
    }

    /**
     * 发送验证码
     * @param req
     * @param resp
     * @throws MessagingException
     * @throws UnsupportedEncodingException
     */
    private void sendCode(HttpServletRequest req, HttpServletResponse resp) throws MessagingException, UnsupportedEncodingException {
        String emailPath = req.getParameter("emailPath");
        if (emailPath.matches("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$"))
        //生成随机验证码
        this.verCode = VerifyCodeUtil.verCode(1000, 9999);
        MailUtil.send(emailPath,"欢迎加入【GAMER】 验证码:"+verCode,"gamer登录验证");
    }

    /**
     * 注册
     * @param req
     * @param resp
     * @throws IOException
     */
    private void registerVer(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //获取前端的数据
        String email = req.getParameter("email");
        String password = req.getParameter("password");
        String verCodeForm = req.getParameter("vercode");
        System.out.println("----------");
        System.out.println(email);
        System.out.println(password);
        System.out.println(verCodeForm);
        Map<String,String> res = new HashMap<>();
        if (verCodeForm.equals(this.verCode)){
            res.put("result","true");
            UserService userService = new UserServiceImpl();
            userService.register(new User(UUIDUtil.randomUUID(),email,password,0));
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
