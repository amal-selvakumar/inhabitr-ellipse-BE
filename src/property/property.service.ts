import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PropertyService {
  constructor(private prismaService: PrismaService) {}

  async getPropery() {
    return await this.prismaService.property.findMany();
  }
}
