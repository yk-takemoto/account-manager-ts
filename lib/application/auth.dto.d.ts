import { User } from "../domain/models/user";
import { AccountInfo } from "../domain/models/account_info";
export declare class AccountInfoDto {
    static toDomain(accountInfo: AccountInfo): User;
    static fromDomain(user: User): AccountInfo;
}
