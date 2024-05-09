import { 
    Body,
    Controller ,
    Get,
    Query,
    Res,
    UseGuards,
    Post,
    Version
} from "@nestjs/common";
import { EmailService } from "./email.service";
import { ResendVerificationEmail, VerifyEmailDTO } from "./email.dto";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ThrottlerGuard } from "@nestjs/throttler";

@ApiTags("Email")
@UseGuards(ThrottlerGuard)
@Controller('api/email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService
    ){}

    @Version('1')
    @Post('resend')
    async resendVerificationEmail(@Body() body: ResendVerificationEmail){
        return await this.emailService.resendVerification(body);
    }
    
    @Version('1')
    @Get('verify')
    async verifyEmail(@Query() query: VerifyEmailDTO, @Res() res: Response) {
        return await this.emailService.verifyEmail(query,res);
    }
}