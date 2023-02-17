import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, UsePipes} from '@nestjs/common';
import {UserDTO} from "./userDTO";
import {UserService} from "./user.service";
import {AuthGuard} from "../auth/authGuard";
import {Roles} from "../auth/rolesDecorator";
import {RoleGuard} from "../auth/roleGuard";
import {RolesEnum} from "./enumRoles";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserModel} from "./userModel";
import {ValidatorPipe} from "../pipes/validationPipe";

@ApiTags("Users")
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @ApiOperation({summary:'Create user'})
    @ApiResponse({status: 200, type: UserDTO})
    @UsePipes(ValidatorPipe)
    @Post()
    postUser(@Body()userDTO: UserDTO){
        const res = this.userService.postUser(userDTO)
        return res
    }

    @ApiOperation({summary:'get Users for admin'})
    @ApiResponse({status: 200, type: [UserModel]})
    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
    getAllUsers(){
        const res = this.userService.getUsers()
        return res
    }

    @ApiOperation({summary:'get Users for developer'})
    @ApiResponse({status: 200, type: [UserModel]})
    @Roles(RolesEnum.ADMIN, RolesEnum.DEVELOPER)
    @UseGuards(AuthGuard, RoleGuard)
    @Get('/developer')
    getUsersAndDeveloper(){
        const res = this.userService.getUserWithRoleUserAndDeveloper()
        return res
    }

    @ApiOperation({summary:'get Users for user'})
    @ApiResponse({status: 200, type: [UserModel]})
    @UseGuards(AuthGuard)
    @Get('/user')
    getUsers(){
        const res = this.userService.getUserWithRoleUser()
        return res
    }

    @ApiOperation({summary:'get user by id'})
    @ApiResponse({status: 200, type: UserModel})
    @Get('/:id')
    getUserById(@Param('id')id: number){
        const user = this.userService.getUserById(id)
        return user
    }

    @ApiOperation({summary:'patch user role'})
    @ApiResponse({status: 200, type: UserModel})
    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Patch('/:id')
    patchRole(@Body()role, @Param('id')id: number){
        const res = this.userService.putUser(role.role, id)
        return res
    }

    @ApiOperation({summary:'delete user'})
    @ApiResponse({status: 200, type: UserModel})
    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete('/:id')
    deleteUser(@Param("id")id: number){
        const res = this.userService.deleteUser(id)
        return res
    }



}
