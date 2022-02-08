import { LoginOutput } from "../types/models";
import { ApiService } from "./ApiService";

export class LoginService {
    static async authenticate(user: string, pass: string) {
        return ApiService.Post<LoginOutput>('login/authenticate', {
            username: user,
            password: pass
        });
    }
}