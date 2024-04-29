package com.mzj.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CharasetFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse resp = (HttpServletResponse) servletResponse;
        resp.setContentType("text/html;charset=UTF-8");
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        filterChain.doFilter(req,resp);
    }

    @Override
    public void destroy() {

    }
}
