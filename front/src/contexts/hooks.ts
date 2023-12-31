import React from "react";
import { TodoListContext, TodoListUpdateContext } from "./TodoListContext";
import { SpinContext, UpdateSpinContext } from "./SpinContext";
import { EditItemContext, UpdateEditItemContext } from "./EditItemContext";
import { AuthContext, UpdateAuthContext } from "./AuthContext";

export function useTodoList() {
  return React.useContext(TodoListContext);
}

export function useTodoListUpdate() {
  return React.useContext(TodoListUpdateContext);
}

export function useSpin() {
  return React.useContext(SpinContext);
}

export function useUpdateSpin() {
  return React.useContext(UpdateSpinContext);
}

export function useEditItem() {
  return React.useContext(EditItemContext);
}

export function useUpdateEditItem() {
  return React.useContext(UpdateEditItemContext);
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function useUpdateAuth() {
  return React.useContext(UpdateAuthContext);
}
