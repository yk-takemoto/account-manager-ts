import { z } from "zod";
export declare const organizationSchema: z.ZodObject<{
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
export type Organization = z.infer<typeof organizationSchema>;
export declare class OrganizationMapper implements Organization {
    readonly orgId: string;
    readonly orgName: string;
    readonly llmList: Record<string, string>[];
    readonly translateList: Record<string, string>[];
    private constructor();
    static from(args: Organization): Organization;
    update(args: {
        orgName?: string;
        llmList?: Record<string, string>[];
        translateList?: Record<string, string>[];
    }): Organization;
}
