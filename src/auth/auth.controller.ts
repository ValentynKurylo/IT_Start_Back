import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDTO} from "../user/userDTO";
import {AuthDTO} from "./authDTO";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ValidatorPipe} from "../pipes/validationPipe";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary:'registration'})
    @ApiResponse({status: 200, type: String})
    @UsePipes(ValidatorPipe)
    @Post('registration')
    registration(@Body()userDTO: UserDTO){
        let res = this.authService.registration(userDTO)
        return res
    }

    @ApiOperation({summary:'login'})
    @ApiResponse({status: 200, type: String})
    @Post('login')
    login(@Body() authDTO: AuthDTO){
        let res = this.authService.login(authDTO)
        return res
    }


}
