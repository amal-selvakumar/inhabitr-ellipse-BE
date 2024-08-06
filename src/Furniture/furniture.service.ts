import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Make sure you have PrismaService defined
import { CreateFurnitureDto, UpdateFurnitureDto } from './dto/furniture.dto';

@Injectable()
export class FurnitureService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFurnitureDto: CreateFurnitureDto) {
    return this.prisma.furniture.create({
      data: createFurnitureDto,
    });
  }

  async findAll() {
    return this.prisma.furniture.findMany();
  }

  async findOne(id: string) {
    const furniture = await this.prisma.furniture.findUnique({
      where: { id },
    });
    if (!furniture) {
      throw new NotFoundException(`Furniture item with id ${id} not found`);
    }
    return furniture;
  }

  async update(id: string, updateFurnitureDto: UpdateFurnitureDto) {
    const furniture = await this.prisma.furniture.update({
      where: { id },
      data: updateFurnitureDto,
    });
    if (!furniture) {
      throw new NotFoundException(`Furniture item with id ${id} not found`);
    }
    return furniture;
  }

  async remove(id: string) {
    const furniture = await this.prisma.furniture.delete({
      where: { id },
    });
    if (!furniture) {
      throw new NotFoundException(`Furniture item with id ${id} not found`);
    }
    return furniture;
  }
}
