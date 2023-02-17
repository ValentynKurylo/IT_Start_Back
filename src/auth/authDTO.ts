import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString} from "class-validator";

export class AuthDTO{
    @ApiProperty({example: "User@gmail.com"})
    readonly email
    @ApiProperty({example: "1111"})
    readonly password
}