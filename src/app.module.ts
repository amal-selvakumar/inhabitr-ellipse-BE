import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FurnitureModule } from './Furniture/furniture.module';
import { OrderModule } from './order/order.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [FurnitureModule, AuthModule, PrismaModule, PropertyModule, OrderModule],

})
export class AppModule {}
