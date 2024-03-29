import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  Paper,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

import { callAPI, signout } from "./service/ApiService";

import "./App.css";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

// App 컴포넌트 정의
function App() {
  // 할 일 목록을 상태로 관리하기 위한 useState 훅
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callAPI("/todo", "GET", null)
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // catch로 에러처리 안하면 화면에 에러화면이 뜨는군....
        console.log("App.js >>>", error);
      });
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

    callAPI("/todo", "POST", item).then((response) => setItems(response.data));
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

    callAPI("/todo", "DELETE", selectedItem).then((response) =>
      setItems(response.data)
    );
  };

  // 리스트 수정 함수
  const editItem = (item) => {
    console.log("editItem 1 >>>", item);
    //console.log("editItem 2 >>>", ...items);
    //setItems([...items]);

    callAPI("/todo", "PUT", item).then((response) => setItems(response.data));
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

  // navigationBar 추가
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  // 리스트 페이지
  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} /> {/*AddTodo 컴포넌트에 addItem 함수 전달*/}
        <div className="TodoList">{todoItems}</div> {/*할 일 목록 렌더링*/}
      </Container>
    </div>
  );

  // 로딩중
  let loadingPage = <h1> 로딩 중...</h1>;
  let content = loadingPage;

  if (!loading) {
    content = todoListPage;
  }

  // 렌더링 부분
  return <div className="App">{content}</div>;
}

export default App;
