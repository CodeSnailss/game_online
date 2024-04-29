package com.mzj.utils;

import java.util.Random;

public final class VerifyCodeUtil {
    private static Random random = new Random();
    public static String verCode(int origin ,int bound){
        int res = random.nextInt(origin,bound);
        return String.valueOf(res);
    }
}
