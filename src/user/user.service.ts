import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./userModel";
import {UserDTO} from "./userDTO";
import {RolesEnum} from "./enumRoles";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel) {
    }

    async postUser(body: UserDTO) {
        const user = await this.userRepository.create(body)
        return user
    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email}})
        return user
    }

    async getUsers(){
        const users = await this.userRepository.findAll()
        return users
    }

    async getUserWithRoleUser(){
        const users = await this.userRepository.findAll({where: {role: RolesEnum.USER}})
        return users
    }

    async getUserWithRoleUserAndDeveloper(){
        const users = await this.userRepository.findAll({where: {role: RolesEnum.USER} || {role: RolesEnum.DEVELOPER}})
        return users
    }

    async getUserById(id: number){
        const user = await this.userRepository.findByPk(id)
        return user
    }

    async putUser(role: RolesEnum, id: number){
        try {
            const res = await this.userRepository.update({role: role}, {where: {id}})

            return {
                message: "User was updated"
            }
        } catch (e) {
            return {
                message: "Something Wrong"
            }
        }
    }
    async deleteUser(id: number){
        try {
            const res = await this.userRepository.destroy({where: {id}})
            return {
                message: "User was deleted"
            }
        } catch (e) {
            return {
                message: "Something Wrong"
            }
        }
    }

}
