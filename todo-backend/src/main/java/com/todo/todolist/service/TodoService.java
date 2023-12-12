package com.todo.todolist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.todolist.model.TodoEntity;
import com.todo.todolist.persistence.TodoRepository;

/**
 * @Service
 * - 이 클래스는 스프링 컴포넌트며 기능적으로 비즈니스 로직을 수행하는 서비스 레이어임을 알려주는 어노테이션
 */

@Service
public class TodoService {
	
	@Autowired
	private TodoRepository repository;
	
	public String testService() {
		// TodoEntity 생성
		TodoEntity entity = TodoEntity.builder().title("My first todo item.").build();
		
		// TodoEntity 저장
		repository.save(entity);
		
		// TodoEntity 검색
		TodoEntity savedEntity = repository.findById(entity.getId()).get();
		
		return savedEntity.getTitle();
	}

}
