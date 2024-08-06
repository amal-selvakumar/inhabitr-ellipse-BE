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
            throw new NotFoundException('Invalid user id')
        }

        const property = await this.prismaService.order.findFirst({
            where:{propertyId:propertyId}
        })

        if(property === null){
            throw new NotFoundException('Invalid property id')
        }

        const order = await this.prismaService.order.create({
            data:{
                user: {connect:{id:userId}},
                property: {connect: {id:propertyId}},
                status: 1
            }
        })

        return order;
    }

}