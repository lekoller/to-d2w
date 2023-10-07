import React from "react";
import { TodoListContext, TodoListUpdateContext } from "./TodoListContext";

export function useTodoList() {
    return React.useContext(TodoListContext);
}

export function useTodoListUpdate() {
    return React.useContext(TodoListUpdateContext)
}