import { z } from "zod";
import { AuthUsecase } from "../application/auth.usecase";
declare const AuthByCredentialsInputSchema: z.ZodObject<{
    userId: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    password: string;
}, {
    userId: string;
    password: string;
}>;
declare const GetAccountInfoInputSchema: z.ZodObject<{
    userId: z.ZodString;
    accessToken: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    accessToken?: string | undefined;
}, {
    userId: string;
    accessToken?: string | undefined;
}>;
export type AuthByCredentialsInput = z.infer<typeof AuthByCredentialsInputSchema>;
export type GetAccountInfoInput = z.infer<typeof GetAccountInfoInputSchema>;
export declare class AuthFunctionServer {
    private readonly usecase;
    constructor(usecase?: AuthUsecase);
    get accountEnv(): "local" | "production";
    authByCredentials(input: AuthByCredentialsInput): Promise<string | null>;
    getAccountInfo(input: GetAccountInfoInput): Promise<{
        userId: string;
        userName: string;
        orgId: string;
        orgName: string;
        llmList: Record<string, string>[];
        translateList: Record<string, string>[];
    }>;
}
export {};
