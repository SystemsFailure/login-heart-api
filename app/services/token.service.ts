import User from "#models/user";
import { AccessToken } from "@adonisjs/auth/access_tokens";

export default class TokenService {
    public async create(payload: User) : Promise<AccessToken> 
    {
        const token: AccessToken = await User.accessTokens.create(payload);
        return token;
    }
}