import { User, UserMapper } from "@/domain/models/user";
import { OrganizationMapper } from "@/domain/models/organization";
import { AccountInfoMapper, AccountInfo } from "@/domain/models/account_info";

export class AccountInfoDto {
  static toDomain(accountInfo: AccountInfo): User {
    const organization = OrganizationMapper.from({
      orgId: accountInfo.orgId,
      orgName: accountInfo.orgName,
      llmList: accountInfo.llmList,
      translateList: accountInfo.translateList,
    });

    return UserMapper.from({
      userId: accountInfo.userId,
      userName: accountInfo.userName,
      organization,
    });
  }

  static fromDomain(user: User): AccountInfo {
    return AccountInfoMapper.from({
      userId: user.userId,
      userName: user.userName,
      orgId: user.organization.orgId,
      orgName: user.organization.orgName,
      llmList: user.organization.llmList,
      translateList: user.organization.translateList,
    });
  }
}
