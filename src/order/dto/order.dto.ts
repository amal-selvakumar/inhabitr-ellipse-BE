import { IsArray, IsNotEmpty, IsString } from "class-validator"
import { OrderDetailsDto } from "./orderdetails.dto"

export class OrderDto{
    
    @IsString()
    @IsNotEmpty()
    userId:string

    @IsString()
    @IsNotEmpty()
    propertyId:string

    @IsArray()
    @IsNotEmpty()
    furnitures:OrderDetailsDto[]

}