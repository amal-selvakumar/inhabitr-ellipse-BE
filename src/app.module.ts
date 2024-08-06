import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [AuthModule, PrismaModule, PropertyModule],
})
export class AppModule {}
