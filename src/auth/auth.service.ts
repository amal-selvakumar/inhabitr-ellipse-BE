import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService{

    constructor(private prismaService:PrismaService){}

    async signup(dto:AuthDto){

        const {email,password} = dto
        const companyNames = ['pumexinfotech','inhabitr'];

        const isValidEmail = companyNames.some((name)=>email.includes(name));

        if(!isValidEmail){
            throw new BadRequestException('Invalid email id');
        }

        const existingUser = await this.prismaService.user.findUnique({
            where:{email}
        })

        if(existingUser){
            throw new ConflictException('User with given email exists');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password , salt);

        const user = this.prismaService.user.create({
            data:{
                email:email,
                password:hashedPassword,
                roleType:2,
                status:1
            }
        })

        return user;
    }

    async signin(dto:AuthDto){

        const {email,password}=dto;

        const companyNames = ['pumexinfotech','inhabitr'];

        const isValidEmail = companyNames.some((name)=>email.includes(name));

        if(!isValidEmail){
            throw new BadRequestException('Invalid email');
        }

        const user = await this.prismaService.user.findUnique({
            where:{email}
        })

        if(user === null){
            throw new NotFoundException('User not found with given email');
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            throw new BadRequestException("User credentials doesn't match");
        }
   
        return 'User logged in successfully';
        
    }
}