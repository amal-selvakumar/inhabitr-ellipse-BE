import { Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProperty() {
    return this.propertyService.getPropery();
  }
}
