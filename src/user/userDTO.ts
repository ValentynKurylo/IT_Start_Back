import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class UserDTO{
    @ApiProperty({example: "User User"})
    @IsString({message: "Must be string"})
    readonly username
    @IsString({message: "Must be string"})
    @IsEmail({}, {message: "Wrong email"})
    @ApiProperty({example: "User@gmail.com"})
    readonly email
    @IsString({message: "Must be string"})
    @Length(4, 12, {message: "Min length - 4, max - 12"})
    @ApiProperty({example: "1111"})
    readonly password
}