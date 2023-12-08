package com.todo.todolist.model;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * model
 * - 비즈니스 데이터를 담는 역할
 * - DB테이블과 스키마를 표현하는 역할
 * 
 * @Entity 
 * - JAVA class를 entity로 지정
 * - @Entity 이름을 지정하지 않으면 클래스 이름을 테이블 이름으로 간주
 * 
 * @Table(name = "Todo")
 * - 테이블 이름 지정
 * - 명시하지 않으면 @Entity 이름을 테이블 이름으로 간주
 * 
 * @Id
 * - 기본키가 될 필드에 지정
 */

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="Todo")
public class TodoEntity {
	@Id
	@GeneratedValue(generator="system-uuid") // ID자동 생성
	@GenericGenerator(name="system-uuid", strategy="uuid") // 어떻게 ID를 생성할지 지정
	private String id; // 이 오브젝트의 아이디
	private String userId; // 이 오브젝트를 생성한 유저의 아이디
	private String title; // Todo 타이틀
	private boolean done; // Todo 완료 여부
}
