import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';
import { TokenDto } from './dto/token.dto';
import { Token, TokenDocument } from './schemas/token.schema';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>
    ) {}

    generateAccessToken(user: User): string {
        const payload = {nickname: user.nickname, email: user.email};

        return this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m'
        })
    }

    generateRefreshToken(user: User): string {
        const payload = {nickname: user.nickname, email: user.email};

        return this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '30d'
        })
    }

    decodeRefreshToken(refreshToken: string) {
        try {
            const userData = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET
            });
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findRefreshToken(refreshToken): Promise<Token[]> {
        return await this.tokenModel.find({refreshToken}).exec();
    }

    async saveRefreshToken(tokenDto: TokenDto): Promise<Token> {
        const tokenData = await this.tokenModel.findOne({user: tokenDto.user});

        if (tokenData) {
            tokenData.refreshToken = tokenDto.refreshToken;
            return tokenData.save();
        }

        const token = new this.tokenModel(tokenDto);

        return token.save();
    }

    async removeRefreshToken(refreshToken: string): Promise<any> {
        return await this.tokenModel.deleteOne({refreshToken})
    }
}
