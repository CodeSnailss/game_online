package com.mzj.filter;

import com.mzj.Final;
import com.mzj.pojo.User;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse resp = (HttpServletResponse) servletResponse;
        //获取session中的user
        User user = (User) req.getSession().getAttribute(Final.USER_SESSION);
        if (user == null){
            //转发到登录页面
            System.out.println("Servlet2"+req.getServletPath());
            resp.sendRedirect(req.getServletContext().getContextPath()+"/jsp/login.jsp");
        }else {
            filterChain.doFilter(req,resp);
        }

    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void destroy() {

    }
}
