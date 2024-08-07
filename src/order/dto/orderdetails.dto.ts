import { isNotEmpty, IsNotEmpty, IsNumber } from "class-validator"

export class OrderDetailsDto{

    @IsNotEmpty()
    furnitureId:string

    @IsNumber()
    @IsNotEmpty()
    quantity:number
}