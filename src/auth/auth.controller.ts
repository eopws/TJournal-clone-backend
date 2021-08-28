import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/registration')
    registration(@Body() registrationDto: RegistrationDto): Promise<object> {
        return this.authService.registration(registrationDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<object> {
        return this.authService.login(loginDto);
    }

    @Post('/logout')
    logout(@Body() body): Promise<any> {
        return this.authService.logout(body.refreshToken);
    }

    @Get('/activate/:link')
    activate(@Param('link') activationLink: string): Promise<void> {
        return this.authService.activate(activationLink);
    }

    @Post('/refresh')
    refresh(@Body() body: any): Promise<object> {
        return this.authService.refresh(body.refreshToken);
    }
}
