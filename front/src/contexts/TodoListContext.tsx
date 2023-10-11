import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
} from "react";
import { TodoItem } from "../interfaces";
import { TodoListClient } from "../services";

export const TodoListContext: React.Context<TodoItem[]> = createContext<
  TodoItem[]
>([]);

export const TodoListUpdateContext: React.Context<
  (todoList: TodoItem[], fromServer?: boolean) => void
> = createContext<(todoList: TodoItem[], fromServer?: boolean) => void>(
  () => {}
);

function TodoListProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const auth = useMemo(() => localStorage.getItem("token"), []);

  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/v1";

  const client = useMemo(() => new TodoListClient(baseURL, auth? auth : ""), [baseURL, auth]);

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
