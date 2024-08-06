import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [AuthModule, PrismaModule, OrderModule, PropertyModule],
})
export class AppModule {}
