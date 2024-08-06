import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FurnitureModule } from './Furniture/furniture.module';

@Module({
  imports: [FurnitureModule, AuthModule, PrismaModule],
})
export class AppModule {}
