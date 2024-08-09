import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
} from '@nestjs/common';
import { FurnitureService } from './furniture.service';
import { CreateFurnitureDto, UpdateFurnitureDto } from './dto/furniture.dto';

@Controller('furniture')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  create(@Body() createFurnitureDto: CreateFurnitureDto) {
    return this.furnitureService.create(createFurnitureDto);
  }

  @Get()
  findAll() {
    return this.furnitureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnitureDto: UpdateFurnitureDto,
  ) {
    return this.furnitureService.update(id, updateFurnitureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureService.remove(id);
  }
}
