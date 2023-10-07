import React, { useState, useEffect } from "react";
import axios from "axios";
import { TodoItem } from "../interfaces";

export const TodoListContext: React.Context<TodoItem[]> = React.createContext<
  TodoItem[]
>([]);

export const TodoListUpdateContext: React.Context<
  (todoList: TodoItem[]) => void
> = React.createContext<(todoList: TodoItem[]) => void>(() => {});

function TodoListProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/item")
      .then((res) => {
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateTodoList = (todoList: TodoItem[]) => {
    setTodoList(todoList);
  }

  return (
    <TodoListContext.Provider value={todoList}>
      <TodoListUpdateContext.Provider value={updateTodoList}>
        {children}
      </TodoListUpdateContext.Provider>
    </TodoListContext.Provider>
  );
}

export default TodoListProvider;