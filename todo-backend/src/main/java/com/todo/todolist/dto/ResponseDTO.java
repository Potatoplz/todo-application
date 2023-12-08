package com.todo.todolist.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * HTTP 응답으로 사용할 DTO
 * - 다른 모델의 DTO오 ResponseDTO를 이용해 리턴할 수 있도록 자바 Generic 사용
 */

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResponseDTO<T> {
	private String error;
	private List<T> data;
}
