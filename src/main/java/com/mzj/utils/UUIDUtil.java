package com.mzj.utils;

import java.util.UUID;

public final class UUIDUtil {
    public static String randomUUID(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }
}
