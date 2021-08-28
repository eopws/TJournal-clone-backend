import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as bcrypt from 'bcryptjs'
import { UsersService } from 'src/users/users.service';
import { MailService } from '../common-services/mail.service';
import { TokenService } from './token.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly tokenService: TokenService,
        private readonly mailService: MailService,
    ) {}

    async registration(userDto: RegistrationDto): Promise<object> {
        const candidate = await this.userService.getUserBy('email', userDto.email);

        if (candidate) {
            throw new HttpException('User with such email already exist', HttpStatus.BAD_REQUEST);
        }

        const passwordHash   = await bcrypt.hash(userDto.password, 6);
        const activationLink = uuid.v4();

        const user = await this.userService.createUser({...userDto, password: passwordHash, activationLink});

        this.mailService.sendActivationMessage(userDto.email, activationLink);

        const tokens = {
            accessToken : this.tokenService.generateAccessToken(user),
            refreshToken: this.tokenService.generateRefreshToken(user)
        };

        this.tokenService.saveRefreshToken({
            user,
            refreshToken: tokens.refreshToken
        })

        return tokens;
    }

    async login(userDto: LoginDto): Promise<object> {
        const user = await this.userService.getUserBy('email', userDto.email);

        if (!user) {
            throw new HttpException('User with such email doesn\'t exist', HttpStatus.BAD_REQUEST);
        }

        const passwordMatches = await bcrypt.compare(userDto.password, user.password);

        if (!passwordMatches) {
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
        }

        const tokens = {
            accessToken : this.tokenService.generateAccessToken(user),
            refreshToken: this.tokenService.generateRefreshToken(user)
        };

        this.tokenService.saveRefreshToken({
            user,
            refreshToken: tokens.refreshToken
        })

        return tokens;
    }

    async logout(refreshToken: string): Promise<any> {
        return this.tokenService.removeRefreshToken(refreshToken);
    }

    async activate(activationLink: string): Promise<void> {
        const user = await this.userService.getUserBy('activationLink', activationLink);

        if (!user) {
            throw new HttpException('Wrong activation link', HttpStatus.BAD_REQUEST);
        }

        this.userService.activate(user);
    }

    async refresh(refreshToken: string): Promise<object> {
        const userData = this.tokenService.decodeRefreshToken(refreshToken);

        const isTokenInDB = await this.tokenService.findRefreshToken(refreshToken);

        if (!userData || !isTokenInDB) {
            throw new HttpException('Wrong refresh token', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.userService.getUserBy('email', userData.email);

        const tokens = {
            accessToken : this.tokenService.generateAccessToken(user),
            refreshToken: this.tokenService.generateRefreshToken(user)
        };

        this.tokenService.saveRefreshToken({
            user,
            refreshToken: tokens.refreshToken
        })

        return tokens;
    }
}
