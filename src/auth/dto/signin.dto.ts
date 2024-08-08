import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class SigninDto{

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}