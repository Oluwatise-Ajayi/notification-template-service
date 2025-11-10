import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTemplateDto: CreateTemplateDto) {
    const template = await this.templatesService.create(createTemplateDto);
    return {
      success: true,
      data: template,
      message: 'Template created successfully',
    };
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.templatesService.findAll(paginationDto);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    const template = await this.templatesService.findByName(name);
    return {
      success: true,
      data: template,
      message: 'Template retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const template = await this.templatesService.findOne(id);
    return {
      success: true,
      data: template,
      message: 'Template retrieved successfully',
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    const template = await this.templatesService.update(id, updateTemplateDto);
    return {
      success: true,
      data: template,
      message: 'Template updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.templatesService.remove(id);
    return {
      success: true,
      message: 'Template deleted successfully',
    };
  }
}
