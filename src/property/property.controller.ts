import { Controller, Get, Param } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  getProperty() {
    return this.propertyService.getPropery();
  }
}
