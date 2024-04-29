package com.mzj.utils;

import com.sun.mail.util.MailSSLSocketFactory;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

public final class MailUtil {
    private static Properties pro = new Properties();
    private static String mail_host;
    private static String mail_transport_protocol;
    private static String mail_smtp_auth_code;
    private static String mail_sender;
    private static String mail_sender_name;
    static {
        String mailConfig = "mail-config.properties";
        InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(mailConfig);
        try {
            pro.load(inputStream);
            mail_host = pro.getProperty("mail.host");
            mail_transport_protocol = pro.getProperty("mail.transport.protocol");
            mail_smtp_auth_code = pro.getProperty("mail.smtp.auth.code");
            mail_sender = pro.getProperty("mail.sender");
            mail_sender_name = pro.getProperty("mail.sender.name");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        /**
         * qq邮箱 设置ssl加密
         */
//        MailSSLSocketFactory sf = new MailSSLSocketFactory();
//        sf.setTrustAllHosts(true);
//        pro.put("mail.smtp.ssl.enable","true");
//        pro.put("mail.smtp.ssl.socketFactory",sf);
    }

    public static void send(String toEmail,String message,String title) throws MessagingException, UnsupportedEncodingException {

        /**
         * QQ邮箱
         */
//        Session session = Session.getDefaultInstance(pro, new Authenticator() {
//            @Override
//            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication("17432431@qq.com","授权码");
//            }
//        });
        //1.创建会话对象
        Session session = Session.getDefaultInstance(pro);
        session.setDebug(true);
        //2.通过session获取transport对象
        Transport transport = session.getTransport();

        //3.连接服务器
        transport.connect(mail_host,mail_sender,mail_smtp_auth_code);

        //4.创建邮箱对象
        MimeMessage mimeMessage = new MimeMessage(session);

        //5.发送邮件
        mimeMessage.setFrom(new InternetAddress(mail_sender,mail_sender_name,"UTF-8"));
        mimeMessage.setRecipient(Message.RecipientType.TO,new InternetAddress(toEmail));
        mimeMessage.setSubject(title);
        mimeMessage.setContent(message,"text/html;charset=UTF-8");
        transport.sendMessage(mimeMessage,mimeMessage.getAllRecipients());
        transport.close();
    }
}

