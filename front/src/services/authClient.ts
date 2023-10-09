import { AuthDTO } from "../interfaces";
import { Client } from "./client";

export class AuthClient extends Client<AuthDTO, AuthDTO, AuthDTO> {
  constructor() {
    super("/auth");
  }

  async login(dto: AuthDTO): Promise<AuthDTO> {
    return (await this.instance.post(`${this.path}/login`, dto)).data;
  }
}