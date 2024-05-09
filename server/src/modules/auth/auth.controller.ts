import { Body, Controller,Post,Get, Query, NotFoundException, UseGuards } from "@nestjs/common";
import { Version } from "@nestjs/common";
import { FindExistAccountDTO, LoginDTO, RegisterDTO } from "./auth.dto";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { ThrottlerGuard } from "@nestjs/throttler";

@ApiTags("AUTH")
@UseGuards(ThrottlerGuard)
@Controller('api/auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}

    @Version('1')
    @Get('find-existing')
    async findExistingAccount(@Query() query: FindExistAccountDTO) {
        return await this.authService.findUserByEmail(query.email);
    }

    @Version('1')
    @Post('login')
    async login(@Body() body: LoginDTO) {
         return await this.authService.login(body);
    }

    @Version('1')
    @Post('register')
    async register(@Body() body: RegisterDTO){
        return await this.authService.register(body);
    }
}