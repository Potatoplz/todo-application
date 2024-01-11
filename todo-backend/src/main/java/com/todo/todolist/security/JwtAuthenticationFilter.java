package com.todo.todolist.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            // 요청에서 토큰 가져오기
            String token = parseBearerToken(request);
            log.info("Filter is running...");

            // 토큰 검사하기. JWT이므로 인가 서버에 요청하지 않고도 검증 가능.
            if (token != null && !token.equalsIgnoreCase("null")) {
                // userId 가져오기. 위조된 경우 예외 처리된다.
                String userId = tokenProvider.validateAndGetUserId(token);
                log.info("Authenticated user ID >>> " + userId);

                //인증 완료; SecurityContextHolder에 등록해야 인증된 사용자라고 생각한다.
                // UsernamePasswordAuthenticationToken : 이 오브젝트에 인증 정보 저장하고, SecurityContext에 인증된 사용자를 등록
                AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userId, // 인증된 유저 정보. 보통 UserDetails라는 오브젝트를 넣는다.(@AuthenticationPrincipal String userId)
                        null,
                        AuthorityUtils.NO_AUTHORITIES
                );

                log.info("UsernamePasswordAuthenticationToken >>>" + authentication);

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(authentication);
                SecurityContextHolder.setContext(securityContext);
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }

        filterChain.doFilter(request, response);
    }

    // HTTP request의 header를 파싱해서 Bearer 토큰을 리턴한다.
    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}
