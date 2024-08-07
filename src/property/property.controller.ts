import { Controller, Post, Req, Session } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post()
  getProperty(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    return this.propertyService.getPropery();
  }
}
