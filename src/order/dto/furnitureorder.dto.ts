import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class FurnitureOrderDto{
   
    @IsString()
    @IsNotEmpty()
    furnitureId:string

    @IsNumber()
    @IsNotEmpty()
    quantity:number
}