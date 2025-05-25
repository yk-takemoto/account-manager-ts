import { z } from "zod";
import { Organization, organizationSchema } from "@/domain/models/organization";

const userSchema = z.object({
  userId: z.string().min(1),
  userName: z.string().min(1),
  organization: organizationSchema,
});

export type User = z.infer<typeof userSchema>;

export class UserMapper implements User {
  constructor(
    public readonly userId: string,
    public readonly userName: string,
    public readonly organization: Organization,
  ) {
    userSchema.parse(this);
  }

  static from(args: User): User {
    return new UserMapper(args.userId, args.userName, args.organization);
  }

  update(args: { userName?: string; organization?: Organization }): User {
    return UserMapper.from({
      userId: this.userId,
      userName: args.userName ?? this.userName,
      organization: args.organization ?? this.organization,
    });
  }
}
