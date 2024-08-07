import { IsNotEmpty, IsString } from "class-validator"
import { FurnitureOrderDto } from "./furnitureorder.dto"

export class OrderDto{
    
    @IsString()
    @IsNotEmpty()
    userId:string

    @IsString()
    @IsNotEmpty()
    propertyId:string

    furnitures:FurnitureOrderDto[];

}