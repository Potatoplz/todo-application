package com.todo.todolist.security;

import com.todo.todolist.model.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {
    // 유저 정보를 받아 JWT를 생성하는 일
    private static final String SECRET_KEY = "superUltraSecret"; // 임의로 지정한 개인키

    // JWT 토큰 생성
    public String create(UserEntity userEntity) {
        // 기한 지금으로부터 1일 설정
        Date expiryDate = Date.from(
                Instant.now()
                        .plus(1, ChronoUnit.DAYS));

        /*
        { // header
            "alg":"HS512"
        }.
        { // payload
            "sub":"",
            "iss":"demo app",
            "iat":"1234",
            "exp":"1234"
        }.
        // SECRET_KEY를 이용해 서명한 부분
        */

        // JWT Token 생성
        return Jwts.builder()
                // header에 들어갈 내용 및 셔명을 하기 위한 SECRET_KEY
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                // payload에 들어갈 내용
                .setSubject(userEntity.getId()) // sub
                .setIssuer("todo app") // iss
                .setIssuedAt(new Date()) // iat
                .setExpiration(expiryDate) // exp
                .compact();
    }

    // 디코딩, 파싱 및 위조여부 확인
    public String validateAndGetUserId(String token) {
        // parseClaimsJws 메서드가 Base64로 디코딩 및 파싱
        // 즉, 헤더와 페이로드를 setSigningKey로 넘어온 시크릿을 이용해 서명 후, token의 서명과 비교.
        // 위조되지 않았다면 페이로드(Claims) 리턴, 위조라면 예외를 날림
        // 그 중 우리는 userId가 필요하므로 getBody를 부른다.
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject(); // 우리가 원하는 subject 즉, 유저 id를 리턴
    }
}
