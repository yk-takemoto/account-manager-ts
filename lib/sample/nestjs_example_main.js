"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const repository_config_1 = require("../infrastructure/config/repository.config");
const nestjs_example_service_1 = require("./nestjs_example_service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [() => ({ DATABASE_TYPE: "local", ACCOUNT_ENV: "local" })],
            }),
            repository_config_1.RepositoryModule,
        ],
        providers: [nestjs_example_service_1.NestjsExampleService],
    })
], AppModule);
async function main() {
    const app = await core_1.NestFactory.createApplicationContext(AppModule);
    const service = app.get(nestjs_example_service_1.NestjsExampleService);
    const user = await service.findUser("takemoto");
    console.log(user);
    await app.close();
}
main().catch(console.error);
