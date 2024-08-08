import { IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator"
import { OrderDetailsDto } from "./orderdetails.dto"

export class OrderDto{
    
    @IsMongoId()
    @IsNotEmpty()
    userId:string

    @IsMongoId()
    @IsNotEmpty()
    propertyId:string

    @IsArray()
    @IsNotEmpty()
    furnitures:OrderDetailsDto[]

}