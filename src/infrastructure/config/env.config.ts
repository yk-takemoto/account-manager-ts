import { z } from "zod";

export const accountEnvSchema = z.enum(["local", "production"]);
export type AccountEnv = z.infer<typeof accountEnvSchema>;

export const databaseTypeSchema = z.enum(["local", "dynamodb"]);
export type DatabaseType = z.infer<typeof databaseTypeSchema>;

export const organizationYamlSchema = z.record(
  z.object({
    display_name: z.string().min(1),
    llm_apis: z.array(z.record(z.string())),
    translate_apis: z.array(z.record(z.string())),
  }),
);

export type OrganizationYaml = z.infer<typeof organizationYamlSchema>;

export const userYamlSchema = z.record(
  z.object({
    display_name: z.string().min(1),
    organization: z.string().min(1),
  }),
);

export type UserYaml = z.infer<typeof userYamlSchema>;

export const authEnvParamSchema = z.object({
  accountEnv: accountEnvSchema.optional(),
  databaseType: databaseTypeSchema.optional(),
  databaseData: z
    .object({
      organization: organizationYamlSchema.optional(),
      user: userYamlSchema.optional(),
    })
    .optional(),
});

export type AuthEnvParam = z.infer<typeof authEnvParamSchema>;

export const createAuthEnvParam = () =>
  authEnvParamSchema.parse({
    accountEnv: process.env.AUTHSERVER_ACCOUNT_ENV,
    databaseType: process.env.AUTHSERVER_DATABASE_TYPE,
    databaseData:
      process.env.ORGANIZATION_YAML && process.env.USER_YAML
        ? {
            organization: organizationYamlSchema.parse(JSON.parse(process.env.ORGANIZATION_YAML)),
            user: userYamlSchema.parse(JSON.parse(process.env.USER_YAML)),
          }
        : undefined,
  });
