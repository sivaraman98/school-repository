import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { Logger } from '@nestjs/common';
import { framedResponse } from 'utils/response-framer';
import {
  IClass,
  IParents,
  ISchool,
  IStudents,
  ITeacher,
} from 'interfaces/school.interfaces';

@Controller()
export class SchoolController {
  logger: Logger;
  constructor(private readonly schoolService: SchoolService) {
    this.logger = new Logger('SCHOOL_CONTROLLER');
  }
  private log(message: string) {
    this.logger.log(`${message}`);
  }
  private logError(message: string) {
    this.logger.error(`${message}`);
  }

  @Post('/createSchool')
  async createSchool(@Body() body: ISchool) {
    try {
      this.logger.log(
        `Request received for creating a school with data: ${JSON.stringify(
          body,
        )}`,
      );
      const schoolDetails = body;
      console.log('schoolDetails', schoolDetails);

      return await this.schoolService.createSchool(schoolDetails);
    } catch (error) {
      return framedResponse('ERROR', error.message);
    }
  }

  @Post('createClass')
  async createClass(@Body() body: IClass) {
    try {
      this.logger.log(
        `Request received for creating a class with data: ${body}`,
      );

      return await this.schoolService.createClass(body);
    } catch (error) {
      return framedResponse('ERROR', error.message);
    }
  }

  @Post('createTeacher')
  async createTeacher(@Body() body: ITeacher) {
    try {
      this.logger.log(
        `Request received for creating a teacher with data: ${body}`,
      );

      return await this.schoolService.createTeacher(body);
    } catch (error) {
      return framedResponse('ERROR', error.message);
    }
  }

  @Post('createParents')
  async createParents(@Body() body: IParents) {
    try {
      this.logger.log(
        `Request received for creating parents with data: ${body}`,
      );

      return await this.schoolService.createParents(body);
    } catch (error) {
      return framedResponse('ERROR', error.message);
    }
  }

  @Post('createStudents')
  async createStudent(@Body() body: IStudents) {
    try {
      this.logger.log(
        `Request received for creating students with data: ${body}`,
      );

      return await this.schoolService.createStudent(body);
    } catch (error) {
      return framedResponse('ERROR', error.message);
    }
  }
}
