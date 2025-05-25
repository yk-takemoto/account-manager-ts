import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "@/domain/repositories/user.repository";

@Injectable()
export class NestjsExampleService {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: UserRepository,
  ) {}

  async findUser(userId: string) {
    return this.userRepository.findById(userId);
  }
}
