import axios, { AxiosInstance } from "axios";

export class Client<T, C> {
  protected instance: AxiosInstance;
  protected path: string;

  constructor(path: string) {
    this.instance = axios.create({
      baseURL: "http://localhost:5000/api/v1",
      timeout: 1000,
      headers: { "X-Custom-Header": "front-end" },
    });
    this.path = path;
  }

  async list(): Promise<T[]> {
    return (await this.instance.get(this.path)).data;
  }

  async add(item: C): Promise<T> {
    return (await this.instance.post(this.path, item)).data;
  }

  async delete(id: number): Promise<void> {
    return (await this.instance.delete(`${this.path}?id=${id}`)).data;
  }

  async update(item: T): Promise<T> {
    return (await this.instance.patch(this.path, item)).data;
  }
}
