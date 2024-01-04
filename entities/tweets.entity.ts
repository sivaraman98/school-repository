import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tweets')
export class TweetsEntity extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'tweets', nullable: true })
  tweets: string;
}

export const entitiesToInject = [TweetsEntity];
