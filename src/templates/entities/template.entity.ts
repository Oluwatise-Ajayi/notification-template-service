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
  name: string;

  @Column()
  channel: string; // 'email' or 'push'

  @Column({ nullable: true, length: 500 })
  subject?: string;

  @Column('text')
  content: string;

  @Column('jsonb', { default: [] })
  variables: string[]; // e.g., ["user_name", "order_id"]

  @Column({ default: 'en', length: 10 })
  language: string;

  @Column({ default: 1 })
  version: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
