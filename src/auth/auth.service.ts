import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {UserDTO} from "../user/userDTO";
import {UserModel} from "../user/userModel";
import {AuthDTO} from "./authDTO";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) {
    }

    async registration(body: UserDTO) {
        try {
            const candidate = await this.userService.getUserByEmail(body.email)
            if (candidate) {
                return {
                    message: "User with such email already exist",
                    status: 400
                }

            }
            let hashPassword = await bcrypt.hash(body.password, 4)
            let user = await this.userService.postUser({...body, password: hashPassword})
            return this.generateToken(user)
        } catch (e) {
            console.log(e)
            return {
                message: "Server error",
                status: 500
            }
        }
    }

    async login(body: AuthDTO){
        try {
            let user = await this.userService.getUserByEmail(body.email)
            if (!user) {
                return {
                    message: "Wrong email or password", status: 401
                }
            }
            let password = await bcrypt.compare(body.password, user.password)
            if (!password) {
                return {
                    message: "Wrong email or password", status: 401
                }
            }
            return this.generateToken(user)
        } catch (e) {
            return {
                message: "Server Error", status: 500
            }
        }

    }

    private async generateToken(user: UserModel){
        let payload = {
            id: user.id,
            username: user.username,
            role: user.role
        }
        return {
            token: this.jwtService.sign(payload),
            user: payload
        }
    }

}
