import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class SignupDto{

    @IsString()
    @IsNotEmpty()
    contactName:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    @Length(8)
    password:string
    
    @IsString()
    @IsNotEmpty()
    contactNumber:string

}