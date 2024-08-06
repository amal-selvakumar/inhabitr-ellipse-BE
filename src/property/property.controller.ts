import { Controller, Post } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post()
  getProperty() {
    return this.propertyService.getPropery();
  }
}
