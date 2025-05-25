"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLocalRepository = void 0;
// import { Injectable } from "@nestjs/common";
const user_1 = require("../../domain/models/user");
// @Injectable()
class UserLocalRepository {
    constructor(organizationRepository, userData) {
        this.organizationRepository = organizationRepository;
        this.users = new Map();
        this.loadData(userData);
    }
    static getInstance(organizationRepository, userData) {
        if (!UserLocalRepository.instance) {
            if (!userData) {
                throw new Error("User data is required for local database");
            }
            UserLocalRepository.instance = new UserLocalRepository(organizationRepository, userData);
        }
        return UserLocalRepository.instance;
    }
    async loadData(userYaml) {
        for (const [userId, user] of Object.entries(userYaml)) {
            const organization = await this.organizationRepository.findById(user.organization);
            if (organization) {
                const userEntity = user_1.UserMapper.from({
                    userId,
                    userName: user.display_name,
                    organization,
                });
                this.users.set(userId, userEntity);
            }
        }
    }
    async findById(userId) {
        return this.users.get(userId) || null;
    }
    async save(user) {
        this.users.set(user.userId, user);
    }
}
exports.UserLocalRepository = UserLocalRepository;
