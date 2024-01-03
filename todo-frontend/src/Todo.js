// 할일 목록을 보여주는 컴포넌트
import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

const Todo = (props) => {
  const [item, setItem] = useState(props.item);
  const [readOnlyState, setReadOnly] = useState(true);

  const deleteItem = props.deleteItem; // App.js에서 props로 받아온 deleteItem()함수
  const editItem = props.editItem; // App.js에서 props로 받아온 editItem()함수

  /**
   * deleteEventHandler 함수
   * - 이 함수는 Todo 컴포넌트의 삭제 아이콘(DeleteOutlined) 클릭 시 호출된다.
   * - 이 함수는 현재 Todo 컴포넌트가 나타내는 항목(item)을 삭제하기 위해 App.js의 deleteItem() 함수를 호출한다.
   * - Todo 컴포넌트는 할일 목록의 개별 항목을 나타내며, App.js에서 map 함수를 사용해 여러 개의 Todo 컴포넌트를 생성한다.
   * - deleteItem() 함수는 해당 Todo 컴포넌트의 item 객체를 매개변수로 받아 전체 할일 목록에서 이 item을 제거한다.
   */
  const deleteEventHandler = () => {
    deleteItem(item);
  };

  // 사용자의 키입력에 따라 title을 변경해주는 함수
  const editEventHandler = (e) => {
    /*
    item.title = e.target.value;
    editItem(item);
		*/
    setItem({ ...item, title: e.target.value });
  };

  // turnOffReadOnly() : readOnlyState라는 상태를 false로 변경해주는 함수
  const turnOffReadOnly = () => {
    setReadOnly(false);
  };

  // turnOnReadOnly() : 엔터키 입력시 readOnlyState라는 상태를 true로 변경해주는 함수
  const turnOnReadOnly = (e) => {
    if (e.key === "Enter" && readOnlyState === false) {
      setReadOnly(true);
      editItem(item);
    }
  };

  // 체크박스
  const checkboxEventHandler = (e) => {
    item.done = e.target.checked;
    editItem(item);
  };

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{
            "aria-label": "naked",
            readOnly: readOnlyState, // material-ui에서 제공하는 props로 생성한 readOnly를 넘겨준다. true: 마우스 커서 깜빡임
          }}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
        {/*
				<input
          aria-label="naked"
          readOnly={readOnlyState}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
        />
				*/}
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
