import { Controller, Get, Param } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get(':id')
  async getPropertyWithFurniture(@Param('id') id: string) {
    return this.propertyService.getPropertyWithFurniture(id);
  }
}
