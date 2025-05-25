import { z } from "zod";
export declare const accountEnvSchema: z.ZodEnum<["local", "production"]>;
export type AccountEnv = z.infer<typeof accountEnvSchema>;
export declare const databaseTypeSchema: z.ZodEnum<["local", "dynamodb"]>;
export type DatabaseType = z.infer<typeof databaseTypeSchema>;
export declare const organizationYamlSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    display_name: z.ZodString;
    llm_apis: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>, "many">;
    translate_apis: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>, "many">;
}, "strip", z.ZodTypeAny, {
    display_name: string;
    llm_apis: Record<string, string>[];
    translate_apis: Record<string, string>[];
}, {
    display_name: string;
    llm_apis: Record<string, string>[];
    translate_apis: Record<string, string>[];
}>>;
export type OrganizationYaml = z.infer<typeof organizationYamlSchema>;
export declare const userYamlSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    display_name: z.ZodString;
    organization: z.ZodString;
}, "strip", z.ZodTypeAny, {
    organization: string;
    display_name: string;
}, {
    organization: string;
    display_name: string;
}>>;
export type UserYaml = z.infer<typeof userYamlSchema>;
export declare const authEnvParamSchema: z.ZodObject<{
    accountEnv: z.ZodOptional<z.ZodEnum<["local", "production"]>>;
    databaseType: z.ZodOptional<z.ZodEnum<["local", "dynamodb"]>>;
    databaseData: z.ZodOptional<z.ZodObject<{
        organization: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            display_name: z.ZodString;
            llm_apis: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>, "many">;
            translate_apis: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>, "many">;
        }, "strip", z.ZodTypeAny, {
            display_name: string;
            llm_apis: Record<string, string>[];
            translate_apis: Record<string, string>[];
        }, {
            display_name: string;
            llm_apis: Record<string, string>[];
            translate_apis: Record<string, string>[];
        }>>>;
        user: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            display_name: z.ZodString;
            organization: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            organization: string;
            display_name: string;
        }, {
            organization: string;
            display_name: string;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        organization?: Record<string, {
            display_name: string;
            llm_apis: Record<string, string>[];
            translate_apis: Record<string, string>[];
        }> | undefined;
        user?: Record<string, {
            organization: string;
            display_name: string;
        }> | undefined;
    }, {
        organization?: Record<string, {
            display_name: string;
            llm_apis: Record<string, string>[];
            translate_apis: Record<string, string>[];
        }> | undefined;
        user?: Record<string, {
            organization: string;
            display_name: string;
        }> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    accountEnv?: "local" | "production" | undefined;
    databaseType?: "local" | "dynamodb" | undefined;
    databaseData?: {
        organization?: Record<string, {
            display_name: string;
            llm_apis: Record<string, string>[];
            translate_apis: Record<string, string>[];
        }> | undefined;
        user?: Record<string, {
            organization: string;
            display_name: string;
        }> | undefined;
    } | undefined;
}, {
    accountEnv?: "local" | "production" | undefined;
    databaseType?: "local" | "dynamodb" | undefined;
    databaseData?: {
        organization?: Record<string, {
            display_name: string;
            llm_apis: Record<string, string>[];
            translate_apis: Record<string, string>[];
        }> | undefined;
        user?: Record<string, {
            organization: string;
            display_name: string;
        }> | undefined;
    } | undefined;
}>;
export type AuthEnvParam = z.infer<typeof authEnvParamSchema>;
export declare const createAuthEnvParam: () => {
    accountEnv?: "local" | "production" | undefined;
    databaseType?: "local" | "dynamodb" | undefined;
    databaseData?: {
        organization?: Record<string, {
            display_name: string;
            llm_apis: Record<string, string>[];
            translate_apis: Record<string, string>[];
        }> | undefined;
        user?: Record<string, {
            organization: string;
            display_name: string;
        }> | undefined;
    } | undefined;
};
