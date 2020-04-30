package com.bd2.backend.service;

import com.bd2.backend.entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

public class MyUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;
    private String email;
    private String password;
    private Boolean isActive;
    private GrantedAuthority authority;

    public MyUserDetails(Long id, String username, String email, String password, Boolean isActive, GrantedAuthority authority) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.authority = authority;
    }

    public static MyUserDetails build(User user) {
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getRole().name());

        return new MyUserDetails(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getActive(),
                authority
        );

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(this.authority);
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Boolean getActive() {
        return isActive;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isActive;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object)
            return true;
        if (object == null || getClass() != object.getClass())
            return false;
        MyUserDetails user = (MyUserDetails) object;
        return Objects.equals(id, user.id);
    }
}