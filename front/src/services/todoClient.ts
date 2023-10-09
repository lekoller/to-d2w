import { CreateItemDTO, TodoItem, UpdateItemDTO } from "../interfaces";
import { Client } from "./client";

export class TodoListClient extends Client<
  TodoItem,
  CreateItemDTO,
  UpdateItemDTO
> {
  constructor(baseURL: string, token: string) {
    super(baseURL, "/todo", token);
  }

  setToken(token: string): void {
    this.token = token;
    this.config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  async completeItem(id: number): Promise<TodoItem> {
    return (
      await this.instance.patch(`${this.path}/done?id=${id}`, {}, this.config)
    ).data;
  }
}
