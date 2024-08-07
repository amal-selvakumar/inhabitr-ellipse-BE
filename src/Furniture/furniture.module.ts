import { Module } from '@nestjs/common';
import { FurnitureService } from './furniture.service';
import { FurnitureController } from './furniture.controller';
import { PrismaService } from '../prisma/prisma.service'; // Make sure to define this service

@Module({
  controllers: [FurnitureController],
  providers: [FurnitureService, PrismaService],
})
export class FurnitureModule {}
