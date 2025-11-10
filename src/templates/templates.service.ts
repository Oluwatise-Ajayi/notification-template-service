import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';
import { createPaginationMeta } from '../common/utils/pagination.utils';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const template = this.templatesRepository.create(createTemplateDto);
    return await this.templatesRepository.save(template);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Template>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [templates, total] = await this.templatesRepository.findAndCount({
      skip,
      take: limit,
      where: { is_active: true },
      order: { created_at: 'DESC' },
    });

    const meta = createPaginationMeta(total, page, limit);

    return {
      success: true,
      data: templates,
      message: 'Templates retrieved successfully',
      meta,
    };
  }

  async findOne(id: string): Promise<Template> {
    const template = await this.templatesRepository.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    return template;
  }

  async findByName(name: string): Promise<Template> {
    const template = await this.templatesRepository.findOne({
      where: { name, is_active: true },
    });
    if (!template) {
      throw new NotFoundException(`Template with name ${name} not found`);
    }
    return template;
  }

  async update(
    id: string,
    updateTemplateDto: UpdateTemplateDto,
  ): Promise<Template> {
    const template = await this.findOne(id);
    Object.assign(template, updateTemplateDto);
    return await this.templatesRepository.save(template);
  }

  async remove(id: string): Promise<void> {
    const result = await this.templatesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
  }
}
