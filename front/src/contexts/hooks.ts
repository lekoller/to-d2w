import React from "react";
import { TodoListContext, TodoListUpdateContext } from "./TodoListContext";
import { SpinContext, UpdateSpinContext } from "./SpinContext";

export function useTodoList() {
    return React.useContext(TodoListContext);
}

export function useTodoListUpdate() {
    return React.useContext(TodoListUpdateContext)
}

export function useSpin() {
    return React.useContext(SpinContext)
}

export function useUpdateSpin() {
    return React.useContext(UpdateSpinContext)
}