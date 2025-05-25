import { NestFactory } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RepositoryModule } from "@/infrastructure/config/repository.config";
import { NestjsExampleService } from "./nestjs_example_service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => ({ DATABASE_TYPE: "local", ACCOUNT_ENV: "local" })],
    }),
    RepositoryModule,
  ],
  providers: [NestjsExampleService],
})
class AppModule {}

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(NestjsExampleService);
  const user = await service.findUser("takemoto");
  console.log(user);
  await app.close();
}

main().catch(console.error);
