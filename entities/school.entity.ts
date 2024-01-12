import { Injectable } from '@nestjs/common';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('school')
export class SchoolEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'classes', type: 'simple-array', nullable: true })
  classes: string[];

  @Column({ name: 'teachers', type: 'simple-array', nullable: true })
  teachers: string[];

  @Column({ name: 'parents', type: 'simple-array', nullable: true })
  parents: string[];

  @Column({ name: 'students', type: 'simple-array', nullable: true })
  students: string[];
}

@Entity('class')
export class ClassEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'school' })
  school: string;

  @Column({ name: 'teachers', type: 'simple-array', nullable: true })
  teachers: string[];
}

@Entity('teachers')
export class TeachersEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'classes', type: 'simple-array', nullable: true })
  classes: string[];
}

@Entity('parents')
export class ParentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'students', type: 'simple-array', nullable: true })
  students: string[];
}

@Entity('students')
export class StudentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'classes', type: 'simple-array', nullable: true })
  classes: string[];

  @Column({ name: 'parents', type: 'simple-array', nullable: true })
  parents: string[];
}

export const entitiesToInject = [
  SchoolEntity,
  ClassEntity,
  TeachersEntity,
  ParentsEntity,
  StudentsEntity,
];
