import { z } from "zod";

export const organizationSchema = z.object({
  orgId: z.string().min(1),
  orgName: z.string().min(1),
  llmList: z.array(z.record(z.string())),
  translateList: z.array(z.record(z.string())),
});

export type Organization = z.infer<typeof organizationSchema>;

export class OrganizationMapper implements Organization {
  private constructor(
    public readonly orgId: string,
    public readonly orgName: string,
    public readonly llmList: Record<string, string>[],
    public readonly translateList: Record<string, string>[],
  ) {
    organizationSchema.parse(this);
  }

  static from(args: Organization): Organization {
    return new OrganizationMapper(args.orgId, args.orgName, args.llmList, args.translateList);
  }

  update(args: { orgName?: string; llmList?: Record<string, string>[]; translateList?: Record<string, string>[] }): Organization {
    return OrganizationMapper.from({
      orgId: this.orgId,
      orgName: args.orgName ?? this.orgName,
      llmList: args.llmList ?? this.llmList,
      translateList: args.translateList ?? this.translateList,
    });
  }
}
