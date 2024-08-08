import { IsMongoId, isNotEmpty, IsNotEmpty, IsNumber } from "class-validator"

export class OrderDetailsDto{

    @IsNotEmpty()
    @IsMongoId()
    furnitureId:string

    @IsNumber()
    @IsNotEmpty()
    quantity:number
}