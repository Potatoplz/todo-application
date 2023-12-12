package com.todo.todolist.dto;

import com.todo.todolist.model.TodoEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO(Data Transfer Object)
 * - 비즈니스 로직을 캡슐화: 클라이언트에게 DTO로 변환한 데이터를 전달
 * - 비즈니스 로직과 관련 없는 필드 선언: 에러 메시지 등
 */

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TodoDTO { //TodoEntity의 DTO 버전
	private String id;
	private String title;
	private boolean done;
	
	public TodoDTO(final TodoEntity entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.done = entity.isDone();			
	}
	
	//DTO를 Entity로 변환하기 위한 메서드
	public static TodoEntity toEntity(final TodoDTO dto) {
		return TodoEntity.builder()
				.id(dto.getId())
				.title(dto.getTitle())
				.done(dto.isDone())
				.build();
	}
}
