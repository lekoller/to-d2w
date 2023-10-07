import axios, { AxiosInstance } from "axios";
import { TodoItem } from "../interfaces";

export class TodoListClient {

    instance: AxiosInstance; 

    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:5000/api/v1',
            timeout: 1000,
            headers: { 'X-Custom-Header': 'front-end' }
        });
    }

    async listItems(): Promise<TodoItem[]> {
        return (await this.instance.get("/item")).data
    }

    async addItem(item: TodoItem): Promise<TodoItem> {
        return (await this.instance.post("/item", item)).data
    }

    async deleteItem(id: string): Promise<void> {
        return (await this.instance.delete(`/item?id=${id}`)).data
    }

    async updateItem(item: TodoItem): Promise<TodoItem> {
        return (await this.instance.put("/item", item)).data
    }

    async completeItem(id: string): Promise<TodoItem> {
        return (await this.instance.put(`/item/done?id=${id}`)).data
    }
}


// export async function listItems(): Promise<TodoItem[]> {
//     return (await axios.get("http://localhost:5000/api/v1/item")).data
// }
