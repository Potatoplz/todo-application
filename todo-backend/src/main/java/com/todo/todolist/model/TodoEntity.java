package com.todo.todolist.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * model
 * - 비즈니스 데이터를 담는 역할
 * - DB테이블과 스키마를 표현하는 역할
 */

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TodoEntity {
	private String id; // 이 오브젝트의 아이디
	private String userId; // 이 오브젝트를 생성한 유저의 아이디
	private String title; // Todo 타이틀
	private boolean done; // Todo 완료 여부

}
