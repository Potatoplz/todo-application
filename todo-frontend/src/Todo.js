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
  const deleteItem = props.deleteItem; // App.js에서 props로 받아온 deleteItem()함수

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

  return (
    <ListItem>
      <Checkbox checked={item.done} />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked" }}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
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
