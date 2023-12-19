// 할일 목록을 입력하는 input box와 버튼이 있는 컴포넌트
import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

const AddTodo = (props) => {
  // 사용자의 입력을 저장할 오브젝트
  const [item, setItem] = useState({ title: "" });
  const addItem = props.addItem;
  //console.log("addItem >>>", addItem);

  /**
   * 입력 필드의 변화를 처리하는 이벤트 핸들러 역할을 하는 함수
   * 사용자가 인풋필드에 키를 하나 입력할 때마다 실행되며, 인풋필드에 담긴 문자열을 js object에 저장
   * TextField에 onChange라는 이벤트에 연결해 놓았으므로, TextField에 변화가 생기면 이 함수가 실행됨.
   * e는 onChange이벤트가 발동하면 생성되는 이벤트 객체로 e.target.value를 통해 실제 입력값에 접근할 수 있다.
   * @param {Event} e - 이벤트 핸들러 함수에 전달되는 이벤트 객체(JS내장기능). 이 객체는 이벤트와 관련된 다양한 정보와 메소드를 포함하고 있다. 예를 들어, 사용자가 입력 필드에 입력하거나 버튼을 클릭할 때 발생하는 이벤트에 대한 상세 정보를 담고 있다. `e.target` 속성은 이벤트가 발생한 DOM 요소를 참조하고, `e.target.value`는 해당 요소의 현재 값을 나타낸다.
   */
  const onInputChange = (e) => {
    console.log("onInputChange");
    setItem({ title: e.target.value }); // 텍스트입력값이 담겨있는 e.target.value를 item에 세팅.
  };

  /**
   * 버튼 클릭 이벤트
   * + 버튼을 클릭하면 addItem 함수에 item이라는 매개변수를 전달하고(App.js에 있는 함수로 전달), item을 초기화해서 TextField입력값을 비워준다.
   */
  const onButtonClick = () => {
    console.log("AddTodo.js onButtonClick");
    addItem(item); // props로 받아온 addItem 함수
    setItem({ title: "" });
  };

  return (
    <Grid container style={{ marginTop: 20 }}>
      <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
        <TextField
          placeholder="Add Todo here"
          fullWidth
          onChange={onInputChange}
          value={item.title}
          /**
           * value={item.title}
           * 사용자가 필드에 텍스트를 입력하면 onInputChange 이벤트 핸들러가 호출되어,
           * item 상태를 업데이트하고, 이 변경된 item.title 값이 다시 TextField에 반영
           */
        />
      </Grid>
      <Grid xs={1} md={1} item>
        <Button
          fullWidth
          style={{ height: "100%" }}
          color="secondary"
          variant="outlined"
          onClick={onButtonClick}
        >
          +
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTodo;
