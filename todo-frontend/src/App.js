import React, { useState, useEffect } from "react";
import { Container, List, Paper } from "@mui/material";

import { call } from "./service/ApiService";

import "./App.css";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

// App 컴포넌트 정의
function App() {
  // 할 일 목록을 상태로 관리하기 위한 useState 훅
  const [items, setItems] = useState([]);

  useEffect(() => {
    call("/todo", "GET", null).then((response) => setItems(response.data));
  }, []);

  /**
   * addItem 함수의 매개변수(item)는 AddTodo.js에서 받음.
   * 새로운 할 일(item)을 기존 할 일 목록에 추가하는 함수
   * @param {Object} item - item이라는 객체를 매개변수로 받는다. item은 AddTodo.js에서 +버튼 클릭시 전달된다.
   */
  const addItem = (item) => {
    /*
    item.id = "ID-" + items.length; // 새 항목에 고유 ID 생성
    item.done = false; // 새 항목의 완료 상태 초기화

    // items 상태를 업데이트하기 위해 setItems 사용
    setItems([...items, item]); // 기존 items에 새 item 추가
		*/

    call("/todo", "POST", item).then((response) => setItems(response.data));
  };

  /**
   * 삭제 함수
   * 기존 items에서 매개변수로 넘어온 item을 제외한 새 items를 items 변수에 다시 저장하는 것
   * @param {Object} selectedItem - 유저가 삭제하려고 선택한 아이템
   */
  const deleteItem = (selectedItem) => {
    /**
     * filter함수로 현재 할일 목록 배열을 순회하며,
     * currentItemList.id !== selectedItem.id인 조건을 찾아 newItems에 저장한다.
     * currentItemList : 현재 할일 목록
    const newItems = items.filter(
      (currentItemList) => currentItemList.id !== selectedItem.id
    );
    // 삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다.
    setItems([...newItems]);
     */

    call("/todo", "DELETE", selectedItem).then((response) =>
      setItems(response.data)
    );
  };

  // 리스트 수정 함수
  const editItem = () => {
    console.log("editItem >>>", ...items);
    setItems([...items]);
  };

  // 할 일 목록을 표시하는 부분
  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}
          /> // 각 할 일을 Todo 컴포넌트로 렌더링
        ))}
      </List>
    </Paper>
  );

  // 렌더링 부분
  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addItem={addItem} /> {/*AddTodo 컴포넌트에 addItem 함수 전달*/}
        <div className="TodoList">{todoItems}</div> {/*할 일 목록 렌더링*/}
      </Container>
    </div>
  );
}

export default App;
