import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TodoItem } from "../interfaces";
import { TodoListClient } from "../services";

export const TodoListContext: React.Context<TodoItem[]> = React.createContext<
  TodoItem[]
>([]);

export const TodoListUpdateContext: React.Context<
  (todoList: TodoItem[], fromServer?: boolean) => void
> = React.createContext<(todoList: TodoItem[], fromServer?: boolean) => void>(() => {});

function TodoListProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const client = useMemo(() => new TodoListClient(), []);
  

  const fetchTodoItems = useCallback(async () => {
    setTodoList(await client.list());
  }, [client]);

  useEffect(() => {
    fetchTodoItems();
  }, [fetchTodoItems]);

  const updateTodoList = (
    todoList: TodoItem[],
    fromServer: boolean = false
  ) => {
    if (fromServer) {
      fetchTodoItems();
      return;
    }

    setTodoList(todoList);
  };

  return (
    <TodoListContext.Provider value={todoList}>
      <TodoListUpdateContext.Provider value={updateTodoList}>
        {children}
      </TodoListUpdateContext.Provider>
    </TodoListContext.Provider>
  );
}

export default TodoListProvider;
