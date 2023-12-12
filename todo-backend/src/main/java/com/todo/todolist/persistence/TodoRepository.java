package com.todo.todolist.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todo.todolist.model.TodoEntity;

/**
 * JpaRepository
 * - 인터페이스이며, 사용하기 위해 새 인터페이스를 작성해서 extends를 사용해서 상속받아야 한다. 
 * - <'테이블에 매핑할 엔티티 클래스', '엔티티의 기본키 타입'>
 * - save, findById, findAll 등 기본적인 데이터베이스 오퍼레이션 인터페이스를 제공한다.
 * - save 메서드를 구현하기 위해 "Insert into ...."와 같은 sql쿼리를 짤 필요가 없다.
 * 
 * @Repository
 * - @Service 같이 스프링이 관리하는 Component 어노테이션의 특별 케이스
 */
@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, String> {
	// 기본 쿼리 외의 쿼리는 어떻게 짤까?
	// findByUserId 메서드 
	List<TodoEntity> findByUserId(String userId); // = SELECT * FROM Todo WHERE userId = '{userId}'
	
	// @Query를 이용한 쿼리 메서드 작성
//	@Query("select * from TodoEntity t where t.userId = ?1") //?1은 메서드의 매개변수의 순서 위치
//	List<TodoEntity> findByUserIdQuery(String userId);
}
