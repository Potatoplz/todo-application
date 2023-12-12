package com.todo.todolist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.todolist.model.TodoEntity;
import com.todo.todolist.persistence.TodoRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * @Service
 * - 이 클래스는 스프링 컴포넌트며 기능적으로 비즈니스 로직을 수행하는 서비스 레이어임을 알려주는 어노테이션
 */

@Slf4j
@Service
public class TodoService {
	
	@Autowired
	private TodoRepository repository;
	
	// 연습
	public String testService() {
		// TodoEntity 생성
		TodoEntity entity = TodoEntity.builder().title("My first todo item.").build();
		
		// TodoEntity 저장
		repository.save(entity);
		
		// TodoEntity 검색
		TodoEntity savedEntity = repository.findById(entity.getId()).get();
		
		return savedEntity.getTitle();
	}
	
	// Validations(검증 메서드)
	private void validate(final TodoEntity entity) {
		if (entity == null) {
			log.warn("엔티티는 null이 될 수 없습니다.");
			throw new RuntimeException("엔티티는 null이 될 수 없습니다.");
		}

		if (entity.getUserId() == null) {
			log.warn("알 수 없는 유저입니다.");
			throw new RuntimeException("알 수 없는 유저입니다.");
		}	
	}
	
	// Create
	public List<TodoEntity> create(final TodoEntity entity) {
		// Validations
		validate(entity);
		
		// save(): JpaRepository가 제공하는 엔티티 저장 메서드
		repository.save(entity);
		
		log.info("Entity Id : {} is saved.", entity.getId());
		
		// userId로 select한 새Todo리스트 반환
		return repository.findByUserId(entity.getUserId());
	}
	
	// Retrieve
	public List<TodoEntity> retrieve(final String userId) {
		
		log.info("User Id : {} is retrieved.", userId);
		
		return repository.findByUserId(userId);
	}

}
