import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./dto/order.dto";

@Injectable()
export class OrderService{

    constructor(private prismaService:PrismaService){}

    async placeOrder(dto:OrderDto){

        const {userId,propertyId} = dto

        const user = await this.prismaService.order.findFirst({
            where: {userId:userId}
        })

        if(user === null){
            throw new NotFoundException(invalidIdMessage)
        }



    }

}