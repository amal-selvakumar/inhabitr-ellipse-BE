import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
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

    signin(){
        
    }
}