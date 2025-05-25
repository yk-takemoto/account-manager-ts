import { z } from "zod";
import { Organization } from "../../domain/models/organization";
declare const userSchema: z.ZodObject<{
    userId: z.ZodString;
    userName: z.ZodString;
    organization: z.ZodObject<{
        orgId: z.ZodString;
        orgName: z.ZodString;
        llmList: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>, "many">;
        translateList: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>, "many">;
    }, "strip", z.ZodTypeAny, {
        orgId: string;
        orgName: string;
        llmList: Record<string, string>[];
        translateList: Record<string, string>[];
    }, {
        orgId: string;
        orgName: string;
        llmList: Record<string, string>[];
        translateList: Record<string, string>[];
    }>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    userName: string;
    organization: {
        orgId: string;
        orgName: string;
        llmList: Record<string, string>[];
        translateList: Record<string, string>[];
    };
}, {
    userId: string;
    userName: string;
    organization: {
        orgId: string;
        orgName: string;
        llmList: Record<string, string>[];
        translateList: Record<string, string>[];
    };
}>;
export type User = z.infer<typeof userSchema>;
export declare class UserMapper implements User {
    readonly userId: string;
    readonly userName: string;
    readonly organization: Organization;
    constructor(userId: string, userName: string, organization: Organization);
    static from(args: User): User;
    update(args: {
        userName?: string;
        organization?: Organization;
    }): User;
}
export {};
