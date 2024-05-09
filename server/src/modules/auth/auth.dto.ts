import {  
    ApiProperty
} from "@nestjs/swagger";
import { 
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
 } from "class-validator";

 export class FindExistAccountDTO{
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   @IsEmail()
   email:string;
 }

 export class LoginDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
 }

 export class RegisterDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

 }