package com.example.backend.config.Security;


import com.example.backend.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
@Configuration
@PropertySource("classpath:custom.properties")
public class JwtUtilities {

    @Value("${jwt.expiration}")
    private Long expirationDuration;

    @Value("${jwt.secret}")
    private String secret ;


    // generating jwt token
    public String generateJwtToken(User newUser) {
        return Jwts.builder()
                .subject(newUser.getEmail())
                .claim("firstname", newUser.getFirstName())
                .claim("lastname", newUser.getLastName())
                .claim("numberPhone", newUser.getFirstName())
                .claim("type", newUser.getLastName())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationDuration))
                .signWith(getSigningKey())
                .compact();
    }
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // extracting the header authorization
    public String getJwtTokenAndVerifyBearerFormat(HttpServletRequest request) {
        String bearerToken =  request.getHeader("Authorization");
        if(bearerToken == null || !bearerToken.startsWith("Bearer ")){
            return null;
        }
        return bearerToken.substring(7);
    }


    //////// Extracting the payload of the jwt token that contains the data
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extracting email (from jwt token) which is stored as a subject of the token
    public String extractEmailFromJwt(String token){
        return extractClaim(token, Claims::getSubject);
    }

    // Extracting expiration date
    public Date extractExpirationDate(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    // verifying if the token is expired or not
    public boolean isTokenExpired(String token){
        return extractExpirationDate(token).before(new Date());
    }

    // validation of token
    public boolean validateToken(String jwtToken, UserDetails userDetails) {
        String email = extractEmailFromJwt(jwtToken);
        return !isTokenExpired(jwtToken) && email.equals(userDetails.getUsername());
    }




}