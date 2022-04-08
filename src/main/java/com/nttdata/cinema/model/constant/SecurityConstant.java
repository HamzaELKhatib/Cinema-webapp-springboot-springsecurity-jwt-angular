package com.nttdata.cinema.model.constant;

public class SecurityConstant {
    public static final long EXPIRATION_TIME = 432_000_000; // 5 dl2ayam
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String JWT_TOKEN_HEADER = "Jwt-Token";
    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verified";
    public static final String GET_ARRAYS_LLC = "Get Arrays, LLC";
    public static final String GET_ARRAYS_ADMINISTRATION = "Admin Dashboard";
    public static final String AUTHORITIES = "authorities";
    public static final String FORBIDDEN_MESSAGE = "You need to log in to access this page";
    public static final String ACCESS_DENIED_MESSAGE = "You do not have permission to access this page";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
    //jma3 URLs li permited for all
    public static final String[] PUBLIC_URLS = {
            "/projections/**",
            "/homepage/**",
            "/pages/**",
            "/layout/**",
            "/movies/**",
            "/artists/**",
            "/artists/actors/**",
            "/actors/**",
            "/user/login",
            "/user/register",
            "/movies",
            "/poster/**",
            "/slider/**",
            "/image/**",
            "/user/image/**",
            "/v2/api-docs",
            "/configuration/ui",
            "swagger-resources/**",
            "/review/**" ,
            "/configuration/security",
"/genres/**",
            "/webjars/**"};

}
