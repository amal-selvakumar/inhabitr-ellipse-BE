import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService{

    constructor(private prismaService:PrismaService){}

    async signup(dto:AuthDto){

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(dto.password,salt);

        const user = await this.prismaService.user.create({
            data:{
                email:dto.email,
                password:hashedPassword,
                roleType:1,
                status:1
            }
        })

        return user;
    }

    signin(){
        
    }
}