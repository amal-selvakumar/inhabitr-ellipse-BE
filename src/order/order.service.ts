import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./dto/order.dto";
import { ERROR_MESSAGES } from "src/messages/appmessages";


@Injectable()
export class OrderService{

    constructor(private prismaService:PrismaService){}

    async placeOrder(dto:OrderDto){

        const {userId,propertyId,furnitures} = dto

        const user = await this.prismaService.user.findFirst({
            where: {id:userId}
        })

        if(user === null){
            throw new NotFoundException(ERROR_MESSAGES.INVALID_USER_ID)
        }

        const property = await this.prismaService.property.findFirst({
            where:{id:propertyId}
        })

        if(property === null){
            throw new NotFoundException(ERROR_MESSAGES.INVALID_PROPERTY_ID)
        }

        const order = await this.prismaService.order.create({
            data:{
                user: {connect:{id:userId}},
                property: {connect: {id:propertyId}},
                status: 1,
                orderDetails:{
                    create:furnitures.map((item)=>({
                        furnitureId:item.furnitureId,
                        quantity:item.quantity
                    }))
                }
            },
            include:{
                orderDetails:true
            }
        })

        return order;
    }

}