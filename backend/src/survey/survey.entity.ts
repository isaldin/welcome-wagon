import { BeforeInsert, Column, Entity, ManyToOne, RelationId } from 'typeorm';

import { BaseEntity } from '../entities/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'survey' })
export class SurveyEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  link: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true })
  manager: string | null;
}
