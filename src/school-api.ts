import { Logger } from '@nestjs/common';
import axios from 'axios';
import { environment } from '../environments/environment';
import { IResponseObject, framedResponse } from '../utils/response-framer';

export class SchoolApi {
  logger: Logger;
  schoolURL = environment.schoolUrl;

  constructor() {
    this.logger = new Logger('SCHOOL_API');
  }

  private log(message: string) {
    this.logger.log(`${message}`);
  }

  private logError(message: string) {
    this.logger.error(`${message}`);
  }

  async createSchoolFunction<T>(data): Promise<IResponseObject<T>> {
    try {
      this.logger.log(`School creation initiated for: ${JSON.stringify(data)}`);

      return await axios
        .post(`${this.schoolURL}/createSchool`, data)
        .then((response) => {
          if (!response) throw `Errored while school creation.`;
          if (response.data.status === 'ERROR')
            throw `${response.data.message}`;
          return response.data;
        });
    } catch (error) {
      this.logger.error(error);
      return framedResponse('ERROR', `${error}`);
    }
  }

  async createTeacherFunction<T>(data): Promise<IResponseObject<T>> {
    try {
      this.logger.log(
        `Teacher creation initiated for: ${JSON.stringify(data)}`,
      );

      return await axios
        .post(`${this.schoolURL}/createTeacher`, data)
        .then((response) => {
          if (!response) throw `Errored while teacher creation.`;
          if (response.data.status === 'ERROR')
            throw `${response.data.message}`;
          return response.data;
        });
    } catch (error) {
      this.logger.error(error);
      return framedResponse('ERROR', `${error}`);
    }
  }

  async createClassFunction<T>(data): Promise<IResponseObject<T>> {
    try {
      this.logger.log(`Class creation initiated for: ${JSON.stringify(data)}`);

      return await axios
        .post(`${this.schoolURL}/createClass`, data)
        .then((response) => {
          if (!response) throw `Errored while class creation.`;
          if (response.data.status === 'ERROR')
            throw `${response.data.message}`;
          return response.data;
        });
    } catch (error) {
      this.logger.error(error);
      return framedResponse('ERROR', `${error}`);
    }
  }

  async createStudentsFunction<T>(data): Promise<IResponseObject<T>> {
    try {
      this.logger.log(
        `Students creation initiated for: ${JSON.stringify(data)}`,
      );

      return await axios
        .post(`${this.schoolURL}/createStudents`, data)
        .then((response) => {
          if (!response) throw `Errored while students creation.`;
          if (response.data.status === 'ERROR')
            throw `${response.data.message}`;
          return response.data;
        });
    } catch (error) {
      this.logger.error(error);
      return framedResponse('ERROR', `${error}`);
    }
  }

  async createParentsFunction<T>(data): Promise<IResponseObject<T>> {
    try {
      this.logger.log(
        `Parents creation initiated for: ${JSON.stringify(data)}`,
      );

      return await axios
        .post(`${this.schoolURL}/createParents`, data)
        .then((response) => {
          if (!response) throw `Errored while parents creation.`;
          if (response.data.status === 'ERROR')
            throw `${response.data.message}`;
          return response.data;
        });
    } catch (error) {
      this.logger.error(error);
      return framedResponse('ERROR', `${error}`);
    }
  }
}
