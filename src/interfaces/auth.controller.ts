import { z } from "zod";
import { AuthUsecase } from "@/application/auth.usecase";

const AuthByCredentialsInputSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

const GetAccountInfoInputSchema = z.object({
  userId: z.string(),
  accessToken: z.string().optional(),
});

export type AuthByCredentialsInput = z.infer<typeof AuthByCredentialsInputSchema>;
export type GetAccountInfoInput = z.infer<typeof GetAccountInfoInputSchema>;

export class AuthFunctionServer {
  constructor(private readonly usecase: AuthUsecase = new AuthUsecase()) {}

  get accountEnv() {
    return this.usecase.accountEnv;
  }

  async authByCredentials(input: AuthByCredentialsInput): Promise<string | null> {
    const validated = AuthByCredentialsInputSchema.parse(input);
    return await this.usecase.authByCredentials(validated.userId, validated.password);
  }

  async getAccountInfo(input: GetAccountInfoInput) {
    const validated = GetAccountInfoInputSchema.parse(input);
    return await this.usecase.getAccountInfo(validated.userId, validated.accessToken);
  }
}
