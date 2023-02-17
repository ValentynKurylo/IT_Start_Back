import {Column, DataType, Model, Table} from "sequelize-typescript";
import {RolesEnum} from "./enumRoles"
import {ApiProperty} from "@nestjs/swagger";

interface UserCreate{
    username: string,
    email: string,
    password: string
}

@Table({tableName: "users"})
export class UserModel extends Model<UserModel, UserCreate>{
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey:true})
    id: number

    @ApiProperty({example: "userUser"})
    @Column({type: DataType.STRING, allowNull: false})
    username: string

    @ApiProperty({example: "user@gmail.com"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: "111"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: "user"})
    @Column({type: DataType.ENUM(RolesEnum.USER, RolesEnum.DEVELOPER, RolesEnum.ADMIN), defaultValue: RolesEnum.USER})
    role: RolesEnum
}