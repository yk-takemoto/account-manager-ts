// import { Injectable } from "@nestjs/common";
import { User, UserMapper } from "@/domain/models/user";
import { UserRepository } from "@/domain/repositories/user.repository";
import { OrganizationRepository } from "@/domain/repositories/organization.repository";
import { UserYaml } from "@/infrastructure/config/env.config";

// @Injectable()
export class UserLocalRepository implements UserRepository {
  private static instance: UserLocalRepository;
  private readonly users: Map<string, User>;

  private constructor(
    private readonly organizationRepository: OrganizationRepository,
    userData: UserYaml,
    // private readonly accountEnv: AccountEnv = "local",
  ) {
    this.users = new Map();
    this.loadData(userData);
  }

  static getInstance(organizationRepository: OrganizationRepository, userData?: UserYaml): UserRepository {
    if (!UserLocalRepository.instance) {
      if (!userData) {
        throw new Error("User data is required for local database");
      }
      UserLocalRepository.instance = new UserLocalRepository(organizationRepository, userData);
    }
    return UserLocalRepository.instance;
  }

  private async loadData(userYaml: UserYaml) {
    for (const [userId, user] of Object.entries(userYaml)) {
      const organization = await this.organizationRepository.findById(user.organization);
      if (organization) {
        const userEntity = UserMapper.from({
          userId,
          userName: user.display_name,
          organization,
        });
        this.users.set(userId, userEntity);
      }
    }
  }

  async findById(userId: string): Promise<User | null> {
    return this.users.get(userId) || null;
  }

  async save(user: User): Promise<void> {
    this.users.set(user.userId, user);
  }
}
