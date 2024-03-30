package com.hrms.employeemanagment.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.hrms.employeemanagment.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.Date;

@Service
public class TokenService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TokenService.class);

    private final Algorithm algorithm;
    private final long tokenExpirationHours;
    private final String timeZone;

    public TokenService(@Value("${api.security.token.secret}") String secret,
                        @Value("${api.security.token.expiration.hours}") long tokenExpirationHours,
                        @Value("${api.security.token.timezone}") String timeZone) {
        this.algorithm = Algorithm.HMAC256(secret);
        this.tokenExpirationHours = tokenExpirationHours;
        this.timeZone = timeZone;
    }

    public String generateToken(User user) {
        try {
            return JWT.create()
                    .withIssuer("TrilectUS")
                    .withSubject(user.getEmail())
                    .withExpiresAt(Date.from(generateExpirationDate()))
                    .sign(algorithm);
        } catch (Exception e) {
            LOGGER.error("Error creating JWT token for user: {}", user.getEmail(), e);
            throw new RuntimeException("Error while authenticating", e);
        }
    }

    public String validateToken(String token) {
        try {
            return JWT.require(algorithm)
                    .withIssuer("TrilectUS")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            LOGGER.warn("JWT token validation failed: {}", e.getMessage());
            return null;
        } catch (Exception e) {
            LOGGER.error("Error validating JWT token", e);
            throw new RuntimeException("Error validating token", e);
        }
    }

    private Instant generateExpirationDate() {
        return ZonedDateTime.now()
                .withZoneSameInstant(java.time.ZoneId.of(timeZone))
                .plusHours(tokenExpirationHours)
                .toInstant();
    }
}