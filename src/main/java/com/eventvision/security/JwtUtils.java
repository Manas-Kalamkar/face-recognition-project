package com.eventvision.security;


import com.eventvision.enums.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    private String jwtSecret = "bXlzZWNyZXRqd3RleHRyYXNlY3JldGtleXdpdGgzMmJ5dGVzISEK";
    private int jwtExpiration = 172800000;

    public String generateToken(String email, Role userRole){

        return Jwts.builder()
                .subject(email)
                .claim("roles", List.of(userRole.name()))
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(key())
                .compact();
    }

    public String getEmailByToken(String jwtToken) {
        return Jwts.parser().verifyWith((SecretKey) key())
                .build().parseSignedClaims(jwtToken)
                .getPayload().getSubject();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(jwtSecret));
    }

    public boolean validateToken(String jwt) {
        try {
            Jwts.parser()
                    .verifyWith((SecretKey) key())
                    .build()
                    .parseSignedClaims(jwt);
            return true; // ← only reaches here if token is valid
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public Claims getAllClaims(String jwt) {
        return Jwts.parser().verifyWith((SecretKey) key())
                .build().parseSignedClaims(jwt)
                .getPayload();
    }
}

