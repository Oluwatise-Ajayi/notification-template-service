import { Injectable, Logger } from '@nestjs/common';
import { OnApplicationBootstrap } from '@nestjs/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from '../templates/entities/template.entity';
import { DEFAULT_TEMPLATES } from '../template/default-template';

@Injectable()
export class TemplateSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(TemplateSeederService.name);

  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  // This magic function runs *once* after the app is fully initialized
  async onApplicationBootstrap() {
    this.logger.log('Seeding default templates...');
    await this.seedTemplates();
  }

  private async seedTemplates() {
    for (const defaultTemplate of DEFAULT_TEMPLATES) {
      // 1. Check if a template with this name *already exists*
      const existingTemplate = await this.templateRepository.findOneBy({
        template_name: defaultTemplate.template_name,
      });

      // 2. If it doesn't exist, create it.
      if (!existingTemplate) {
        this.logger.log(`Creating template: ${defaultTemplate.template_name}`);

        const newTemplate = this.templateRepository.create(defaultTemplate);
        await this.templateRepository.save(newTemplate);
      } else {
        // 3. If it *does* exist, we just log it and do nothing.
        this.logger.log(
          `Template already exists: ${defaultTemplate.template_name}`,
        );
      }
    }

    this.logger.log('Template seeding complete.');
  }
}
