import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderDto } from "./dto/order.dto";

@Controller('order')
export class OrderController{

    constructor(private orderService:OrderService){}

    @Post('placeOrder')
    placeOrder(@Body() dto:OrderDto){
     return this.orderService.placeOrder(dto);
    }

}