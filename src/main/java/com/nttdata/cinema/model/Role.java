package com.nttdata.cinema.model;

import static com.nttdata.cinema.model.constant.Authority.*;

public enum Role {
    ROLE_USER(USER_AUTHORITIES),

    ROLE_ADMIN(ADMIN_AUTHORITIES);


    private String[] authorities;

    Role(String... authorities) {
        this.authorities = authorities;
    }

    public String[] getAuthorities() {
        return authorities;
    }
}
