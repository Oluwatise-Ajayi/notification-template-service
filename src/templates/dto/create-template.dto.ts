import {
  IsString,
  IsArray,
  IsOptional,
  IsBoolean,
  IsIn,
  IsInt,
  Min,
} from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  template_name: string;

  @IsString()
  @IsIn(['email', 'push'])
  channel_type: string;

  @IsOptional()
  @IsString()
  template_subject?: string;

  @IsString()
  template_content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  template_variables?: string[];

  @IsOptional()
  @IsString()
  template_language?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  template_version?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
