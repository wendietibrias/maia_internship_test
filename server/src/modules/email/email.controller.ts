import { 
    Body,
    Controller ,
    Get,
    Query,
    Res
} from "@nestjs/common";
import { EmailService } from "./email.service";
import { ResendVerificationEmail, VerifyEmailDTO } from "./email.dto";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("Email")
@Controller('api/email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService
    ){}

    @Get('resend')
    async resendVerificationEmail(@Body() body: ResendVerificationEmail){
        return await this.emailService.resendVerification(body);
    }
    
    @Get('verify')
    async verifyEmail(@Query() query: VerifyEmailDTO, @Res() res: Response) {
        return await this.emailService.verifyEmail(query,res);
    }
}