import { z } from "zod";

export const AccountInfoSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  orgId: z.string(),
  orgName: z.string(),
  llmList: z.array(z.record(z.string())),
  translateList: z.array(z.record(z.string())),
});

export type AccountInfo = z.infer<typeof AccountInfoSchema>;

export class AccountInfoMapper implements AccountInfo {
  private constructor(
    public readonly userId: string,
    public readonly userName: string,
    public readonly orgId: string,
    public readonly orgName: string,
    public readonly llmList: Record<string, string>[],
    public readonly translateList: Record<string, string>[],
  ) {
    AccountInfoSchema.parse(this);
  }

  static from(args: AccountInfo): AccountInfo {
    return new AccountInfoMapper(args.userId, args.userName, args.orgId, args.orgName, args.llmList, args.translateList);
  }
}
