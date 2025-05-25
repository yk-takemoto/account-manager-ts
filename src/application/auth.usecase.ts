import { jwtDecode } from "jwt-decode";
import { AccountInfo } from "@/domain/models/account_info";
import { AccountInfoDto } from "@/application/auth.dto";
import { Container } from "@/infrastructure/container";

export class AuthUsecase {
  constructor(
    public readonly accountEnv = Container.getInstance().accountEnv,
    private readonly userRepository = Container.getInstance().userRepository,
  ) {}

  async authByCredentials(userId: string, __: string): Promise<string | null> {
    const user = await this.userRepository.findById(userId);
    // Currently, there is no password verification
    if (!user) {
      return null;
    }
    return userId;
  }

  private tokenUser(accessToken: string): string | null {
    const decoded = jwtDecode(accessToken);
    return decoded?.sub || null;
  }

  async getAccountInfo(userId: string, accessToken?: string): Promise<AccountInfo> {
    const authedUserId = accessToken ? this.tokenUser(accessToken) : userId;
    if (!authedUserId) {
      throw new Error("Invalid access token");
    }
    const user = await this.userRepository.findById(authedUserId);
    if (!user) {
      throw new Error("The user or organization information of the authorized user does not exist in the database");
    }
    return AccountInfoDto.fromDomain(user);
  }
}
