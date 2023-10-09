import axios, { AxiosInstance } from "axios";

export class Client<T, C, U> {
  protected instance: AxiosInstance;
  protected path: string;
  protected token?: string;
  protected config?: object;

  constructor(path: string, token?: string) {
    this.instance = axios.create({
      baseURL: "http://localhost:5000/api/v1",
      timeout: 1000,
      headers: { "X-Custom-Header": "front-end" },
    });
    this.path = path;
    this.token = token;
    this.config = token
      ? {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      : undefined;
  }

  async list(): Promise<T[]> {
    return (await this.instance.get(this.path, this.config)).data;
  }

  async add(item: C): Promise<T> {
    return (await this.instance.post(this.path, item, this.config)).data;
  }

  async delete(id: number): Promise<void> {
    return (await this.instance.delete(`${this.path}?id=${id}`, this.config))
      .data;
  }

  async update(item: U): Promise<T> {
    return (await this.instance.patch(this.path, item, this.config)).data;
  }
}
