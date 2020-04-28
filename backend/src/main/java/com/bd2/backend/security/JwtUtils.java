package com.bd2.backend.security;

import com.bd2.backend.service.MyUserDetails;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private final String JWT_SECRET = "JWT_SECRET_KEY";

    private final int JWT_EXPIRATION = 60 * 60 * 1000;

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    public String generateJwtToken(Authentication authentication) {
        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + JWT_EXPIRATION))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();

    }

    public String getUsernameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
            return true;
        } catch(SignatureException e) {
            logger.error("Invalid JWT signature: " + e.getMessage());
        } catch(MalformedJwtException e) {
            logger.error("Invalid JWT token: " + e.getMessage());
        } catch(ExpiredJwtException e) {
            logger.error("JWT token is expired: " + e.getMessage());
        } catch(UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: " + e.getMessage());
        } catch(IllegalArgumentException e) {
            logger.error("JWT claims string is empty: " + e.getMessage());
        }

        return false;
    }
}
