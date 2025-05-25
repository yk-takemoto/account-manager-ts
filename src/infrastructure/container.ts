import { OrganizationRepository } from "@/domain/repositories/organization.repository";
import { UserRepository } from "@/domain/repositories/user.repository";
import { OrganizationLocalRepository } from "@/infrastructure/repositories/organization.repository.impl";
import { UserLocalRepository } from "@/infrastructure/repositories/user.repository.impl";
import { AccountEnv, AuthEnvParam, createAuthEnvParam } from "@/infrastructure/config/env.config";

export class Container {
  private static instance: Container;
  public readonly accountEnv: AccountEnv;
  public readonly organizationRepository: OrganizationRepository;
  public readonly userRepository: UserRepository;

  private constructor({ accountEnv = "local", databaseType = "local", databaseData }: AuthEnvParam = createAuthEnvParam()) {
    // debug
    console.log("Container.constructor authEnvParam: ", JSON.stringify(databaseData));
    this.accountEnv = accountEnv;
    switch (databaseType) {
      case "local":
        if (!databaseData?.organization || !databaseData?.user) {
          throw new Error("Database data is required for local database");
        }
        this.organizationRepository = OrganizationLocalRepository.getInstance(databaseData.organization);
        this.userRepository = UserLocalRepository.getInstance(OrganizationLocalRepository.getInstance(), databaseData.user);
        break;
      default:
        throw new Error(`Unsupported database type: ${databaseType}`);
    }
  }

  static getInstance(param?: AuthEnvParam): Container {
    if (!Container.instance) {
      Container.instance = new Container(param);
    }
    return Container.instance;
  }
}
