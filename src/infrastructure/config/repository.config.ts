import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { createAuthEnvParam } from "@/infrastructure/config/env.config";
import { OrganizationLocalRepository } from "@/infrastructure/repositories/organization.repository.impl";
import { UserLocalRepository } from "@/infrastructure/repositories/user.repository.impl";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "UserRepository",
      useFactory: (__: ConfigService) => {
        const authEnvParam = createAuthEnvParam();
        switch (authEnvParam.databaseType) {
          // case "dynamodb":
          //   return new UserDynamoDBRepository();
          case "local":
            if (!authEnvParam.databaseData?.organization || !authEnvParam.databaseData?.user) {
              throw new Error("Database data is required for local database");
            }
            return UserLocalRepository.getInstance(
              OrganizationLocalRepository.getInstance(authEnvParam.databaseData.organization),
              authEnvParam.databaseData.user,
            );
          default:
            throw new Error(`Unsupported database type: ${authEnvParam.databaseType}`);
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: ["UserRepository"],
})
export class RepositoryModule {}
