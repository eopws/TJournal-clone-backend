import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailService } from '../common-services/mail.service';
import { TokenService } from './token.service';
import { Token, TokenSchema } from './schemas/token.schema';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SECRET'
    }),
    MongooseModule.forFeature([
      {name: Token.name, schema: TokenSchema}
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, MailService],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
