import{
    ApiProperty
} from "@nestjs/swagger";
import {
    IsEmail,
    IsJWT,
    IsString,
    IsNotEmpty
} from "class-validator";

export class VerifyEmailDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsJWT()
    key:string;
}

export class ResendVerificationEmail{
    @ApiProperty()
    @IsString()
    @IsEmail()
    email:string;
}