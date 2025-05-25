import { User } from "@/domain/models/user";

export interface UserRepository {
  findById(userId: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
