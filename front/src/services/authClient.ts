import { AuthDTO, LoginResponse } from "../interfaces";
import { Client } from "./client";

export class AuthClient extends Client<AuthDTO, AuthDTO, AuthDTO> {
  constructor(baseURL: string) {
    super(baseURL, "/auth");
  }

  async login(dto: AuthDTO): Promise<LoginResponse> {
    return (await this.instance.post(`${this.path}/login`, dto, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })).data;
  }
}