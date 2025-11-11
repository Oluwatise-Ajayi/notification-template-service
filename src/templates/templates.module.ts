import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { TemplateSeederService } from '../template/template-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './entities/template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  controllers: [TemplatesController],
  providers: [TemplatesService, TemplateSeederService],
})
export class TemplatesModule {}
