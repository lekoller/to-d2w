import { CreateItemDTO, TodoItem, UpdateItemDTO } from "../interfaces";
import { Client } from "./client";

export class TodoListClient extends Client<
  TodoItem,
  CreateItemDTO,
  UpdateItemDTO
> {
  constructor() {
    super("/todo");
  }

  async completeItem(id: number): Promise<TodoItem> {
    return (await this.instance.patch(`${this.path}/done?id=${id}`)).data;
  }
}
