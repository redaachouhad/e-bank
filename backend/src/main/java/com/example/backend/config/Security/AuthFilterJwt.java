package com.example.backend.config.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@AllArgsConstructor
public class AuthFilterJwt extends OncePerRequestFilter {

    private final JwtUtilities jwtUtilities;
    private final MyUserDetailsService myUserDetailsService;
    private void filterForJwtTokenPerRequest(HttpServletRequest request, HttpServletResponse response){

        // extracting the jwt token from authorization header, and verify the bearer format:
        String jwtToken = jwtUtilities.getJwtTokenAndVerifyBearerFormat(request);
        if(jwtToken == null){
            return;
        }

        // extracting email from jwt Token
        String email = jwtUtilities.extractEmailFromJwt(jwtToken);

        // Checking if there is an existing authentication in the SecurityContextHolder.
        // If it returns null, it means no user is currently authenticated.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(email == null || authentication != null ){
            return;
        }


        // validation of the token (expiration date)
        UserDetails userDetails = myUserDetailsService.loadUserByUsername(email);

        if (!jwtUtilities.validateToken(jwtToken, userDetails)) {
            return;
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        null
                );
        // Attach request-specific details (e.g., IP address, session ID) to the authentication token
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // Set the authentication token in the security context to establish the current user's identity
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // Validate the JWT token for each request using bearer authentication.
        filterForJwtTokenPerRequest(request, response);

        // Continue the request processing by passing the request and response to the next filter in the chain or to the target resource (e.g., a servlet).
        filterChain.doFilter(request, response);
    }

}