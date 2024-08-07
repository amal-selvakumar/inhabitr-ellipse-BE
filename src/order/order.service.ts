import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ERROR_MESSAGES } from "src/messages/appmessages";
import { OrderDto } from "./dto/order.dto";
import { connect } from "http2";


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

        for (const item of furnitures){
            const furniture = await this.prismaService.furniture.findUnique({
                where:{id:item.furnitureId}
            })

            if(furniture === null){
                throw new NotFoundException(ERROR_MESSAGES.INVALID_FURNITURE_ID)
            }

            if(item.quantity > furniture.quantity){
                throw new ConflictException(ERROR_MESSAGES.INVALID_QUANTITY)
            }
        }

        const order = await this.prismaService.order.create({
            data:{
                user:{connect:{id:userId}},
                property:{connect:{id:propertyId}},
                status:0,
                orderDetails:{
                    create:furnitures.map(furniture =>({
                        furnitureId:furniture.furnitureId,
                        quantity:furniture.quantity
                    }))
                },
            },
            include:{
                orderDetails:true
            }
        })

        for(const item of furnitures){
           await this.prismaService.furniture.update({
            where:{id:item.furnitureId},
            data:{
                quantity:{
                    decrement:item.quantity
                }
            }
           })
        }
       
        return order;
        
    }

    async getOrderDetails(orderId:string){
       
        const order = await this.prismaService.order.findUnique({
            where:{id:orderId},
            include:{
                orderDetails:{
                    include:{
                        furniture:true
                    }
                }
            }
        })

        if(order === null){
            throw new NotFoundException('No order found with given id')
        }

        const orderDetails = {
            id: order.id,
            userId: order.userId,
            propertyId: order.propertyId,
            orderDate: order.orderDate,
            status: order.status,
            orderDetails: order.orderDetails.map(detail => ({
                id: detail.id,
                quantity: detail.quantity,
                furniture: {
                    id: detail.furniture.id,
                    name: detail.furniture.name,
                    description: detail.furniture.description,
                    width: detail.furniture.width,
                    height: detail.furniture.height,
                    depth: detail.furniture.depth,
                    quantity: detail.furniture.quantity,
                    status: detail.furniture.status,
                },
            })),
            
        }

        return orderDetails;
    }

}

