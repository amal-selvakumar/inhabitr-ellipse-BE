import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class AuthDto{

    @IsString()
    @IsNotEmpty()
    contactName:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
    
    @IsString()
    @IsNotEmpty()
    contactNumber:string

}