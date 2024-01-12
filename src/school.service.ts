import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ClassEntity,
  ParentsEntity,
  SchoolEntity,
  StudentsEntity,
  TeachersEntity,
} from '../entities/school.entity';
import { framedResponse } from '../utils/response-framer';
import {
  IClass,
  IParents,
  ISchool,
  IStudents,
  ITeacher,
} from 'interfaces/school.interfaces';
import { create } from 'domain';

@Injectable()
export class SchoolService {
  private logger: Logger;
  constructor(
    @InjectRepository(SchoolEntity)
    private schoolRepo: Repository<SchoolEntity>,
    @InjectRepository(ClassEntity) private classRepo: Repository<ClassEntity>,
    @InjectRepository(TeachersEntity)
    private teachersRepo: Repository<TeachersEntity>,
    @InjectRepository(ParentsEntity)
    private parentsRepo: Repository<ParentsEntity>,
    @InjectRepository(StudentsEntity)
    private studentsRepo: Repository<StudentsEntity>,
  ) {
    this.logger = new Logger('SCHOOL_SERVICE');
  }
  private log(message: string) {
    this.logger.log(`${message}`);
  }

  private logError(message: string) {
    this.logger.error(`${message}`);
  }

  //Business logics
  async createSchool(schoolDetails: ISchool) {
    try {
      this.logger.log(
        `Request received for creating school with data: ${JSON.stringify(
          schoolDetails,
        )}`,
      );

      const createdSchool = await this.schoolRepo.create({
        name: schoolDetails.name,
      });
      createdSchool.save();
      console.log('createdSchool', createdSchool);

      this.logger.log(
        `School successfully created with data: ${JSON.stringify(
          schoolDetails,
        )}`,
      );

      return framedResponse(
        'SUCCESS',
        `School successfully created.`,
        createdSchool,
      );
    } catch (error) {
      this.logger.error(
        `Errored while creating school with message: ${error.message}`,
      );
      return framedResponse(
        'ERROR',
        `Errored while creating school with message: ${error.message}`,
      );
    }
  }

  async createClass(classDetails: IClass) {
    try {
      this.logger.log(
        `Request received for creating class with data: ${classDetails}`,
      );

      const createdClass = await this.classRepo
        .create({
          name: classDetails.name,
          school: classDetails.school,
        })
        .save();

      // const updateSchool = await this.schoolRepo.update({ where: { id: createdClass.id }},{

      // })
      console.log('createdClass', createdClass);

      return framedResponse(
        'SUCCESS',
        `Class successfully created.`,
        createdClass,
      );
    } catch (error) {
      this.logger.error(
        `Errored while creating class with message: ${error.message}`,
      );
      return framedResponse(
        `ERROR`,
        `Errored while creating class with message: ${error.message}`,
      );
    }
  }

  async createTeacher(teacherDetails: ITeacher) {
    try {
      this.logger.log(
        `Request received for creating teacher with data: ${teacherDetails}`,
      );

      const validatedDetails = await this.teachersRepo.findOne({
        where: { name: teacherDetails.name },
      });

      if (validatedDetails) throw `Teacher details present already.`;

      const createdTeacher = await this.teachersRepo.create({
        name: teacherDetails.name,
        classes: teacherDetails.classes,
      });
      createdTeacher.save();

      this.logger.log(
        `Request received for creating teacher with data: ${teacherDetails}`,
      );
    } catch (error) {
      this.logger.error(
        `Errored while creating teacher with message: ${error}`,
      );
      return framedResponse(
        `ERROR`,
        `Errored while creating teacher with message: ${error}`,
      );
    }
  }

  async createParents(parentDetails: IParents) {
    try {
      this.logger.log(
        `Request received for creating teacher with data: ${parentDetails}`,
      );

      const createdParents = await this.parentsRepo
        .create({
          name: parentDetails.name,
          students: parentDetails.students,
        })
        .save();

      this.logger.log(
        `Request received for creating teacher with data: ${parentDetails}`,
      );
    } catch (error) {
      this.logger.error(`Errored while creating parent with message: ${error}`);
      return framedResponse(
        `ERROR`,
        `Errored while creating parent with message: ${error}`,
      );
    }
  }

  async createStudent(studentDetails: IStudents) {
    try {
      this.logger.log(
        `Request received for creating student with data: ${studentDetails}`,
      );

      const createdParent = await this.studentsRepo
        .create({
          name: studentDetails.name,
          classes: studentDetails.classes,
          parents: studentDetails.parents,
        })
        .save();
    } catch (error) {
      this.logger.error(
        `Errored while creating student with message: ${error}`,
      );
      return framedResponse(
        `ERROR`,
        `Errored while creating student with message: ${error}`,
      );
    }
  }
}
