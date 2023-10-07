import { CreateItemDTO, TodoItem } from "../interfaces";
import { Client } from "./client";

export class TodoListClient extends Client<TodoItem, CreateItemDTO> {
  constructor() {
    super("/item");
  }

  async completeItem(id: number): Promise<TodoItem> {
    return (await this.instance.patch(`${this.path}/done?id=${id}`)).data;
  }
}
