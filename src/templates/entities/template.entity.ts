import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  template_name: string;

  @Column()
  channel_type: string; // 'email' or 'push'

  @Column({ nullable: true, length: 500 })
  template_subject?: string;

  @Column('text')
  template_content: string;

  @Column('jsonb', { default: [] })
  template_variables: string[]; // e.g., ["user_name", "order_id"]

  @Column({ default: 'en', length: 10 })
  template_language: string;

  @Column({ default: 1 })
  template_version: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
