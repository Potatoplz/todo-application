package com.todo.todolist.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = "username")})
public class UserEntity {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id; //유저에게 고유하게 부여되는 id

    @Column(nullable = false)
    private String username;
    
    /**
     * nullable인 이유 : OAuth를 이용한 SSO 구현시 password가 필요없다.
     * DB는 null을 입력할 수 있는 대신, 회원가입 컨트롤러에서 password를 반드시 입력하도록 구현
     */
    private String password;

    private String role; // 사용자의 롤 (ex. 어드민, 일반사용자)
    
    private String authProvider; // OAuth에서 사용할 유저 정보 제공자
}
