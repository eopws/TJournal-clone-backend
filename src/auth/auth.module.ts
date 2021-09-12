import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailService } from '../common-services/mail.service';
import { TokenService } from './token.service';
import { Token, TokenSchema } from './schemas/token.schema';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: Token.name, schema: TokenSchema}
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, MailService]
})
export class AuthModule {}
