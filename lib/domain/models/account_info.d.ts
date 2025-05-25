import { z } from "zod";
export declare const AccountInfoSchema: z.ZodObject<{
    userId: z.ZodString;
    userName: z.ZodString;
    orgId: z.ZodString;
    orgName: z.ZodString;
    llmList: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>, "many">;
    translateList: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>, "many">;
}, "strip", z.ZodTypeAny, {
    userId: string;
    userName: string;
    orgId: string;
    orgName: string;
    llmList: Record<string, string>[];
    translateList: Record<string, string>[];
}, {
    userId: string;
    userName: string;
    orgId: string;
    orgName: string;
    llmList: Record<string, string>[];
    translateList: Record<string, string>[];
}>;
export type AccountInfo = z.infer<typeof AccountInfoSchema>;
export declare class AccountInfoMapper implements AccountInfo {
    readonly userId: string;
    readonly userName: string;
    readonly orgId: string;
    readonly orgName: string;
    readonly llmList: Record<string, string>[];
    readonly translateList: Record<string, string>[];
    private constructor();
    static from(args: AccountInfo): AccountInfo;
}
