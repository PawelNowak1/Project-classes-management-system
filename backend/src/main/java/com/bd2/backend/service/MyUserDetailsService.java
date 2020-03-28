package com.bd2.backend.service;

import com.bd2.backend.entities.Role;
import com.bd2.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByUsername(username);
        GrantedAuthority authority = getUserAuthority(user.getRole());
        return buildUser(user, authority);
    }

    private GrantedAuthority getUserAuthority(Role userRole) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(userRole.getRole());
        return grantedAuthority;
    }

    private UserDetails buildUser(User user, GrantedAuthority authority) {
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                user.getActive(), true, true, true,
                Collections.singletonList(authority));
    }
}
