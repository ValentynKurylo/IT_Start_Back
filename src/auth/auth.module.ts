import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {UserModel} from "../user/userModel";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(()=>UserModule),
      UserModel,
      JwtModule.register({
        secret: process.env.SECRET_KEY || 'SECRET',
        signOptions:{
          expiresIn: "30m"
        }
      })
  ],
    exports: [
        AuthService,
        JwtModule]
})
export class AuthModule {}
