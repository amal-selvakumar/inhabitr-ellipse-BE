import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PropertyService {
  constructor(private prismaService: PrismaService) {}

  async getPropertyWithFurniture(propertyId: string) {
    const property = await this.prismaService.property.findUnique({
      where: { id: propertyId },
      include: { furnitures: true }, // This will include the related furniture items
    });

    if (!property) {
      throw new NotFoundException(`Property with id ${propertyId} not found`);
    }

    return property;
  }

  async getProperties(){

    return await this.prismaService.property.findMany({
      include:{
        furnitures:true
      }
    });

  }
}
