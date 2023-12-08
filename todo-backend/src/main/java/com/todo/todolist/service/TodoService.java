package com.todo.todolist.service;

import org.springframework.stereotype.Service;

/**
 * @Service
 * - 이 클래스는 스프링 컴포넌트며 기능적으로 비즈니스 로직을 수행하는 서비스 레이어임을 알려주는 어노테이션
 */

@Service
public class TodoService {
	
	public String testService() {
		return "Test Service";
	}

}
