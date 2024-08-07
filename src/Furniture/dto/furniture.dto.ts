import { IsInt, IsOptional, IsString, IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';

export class CreateFurnitureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  depth?: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  status: number;

  @IsOptional()
  @IsMongoId() // Validates MongoDB ObjectId format
  propertyId?: string; // Optional if you want to associate furniture with a property
}

export class UpdateFurnitureDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  depth?: number;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsInt()
  status?: number;

  @IsOptional()
  @IsMongoId() // Validates MongoDB ObjectId format
  propertyId?: string; // Optional if you want to update the associated property
}
