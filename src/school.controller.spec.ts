import { SchoolApi } from './school-api';
const schoolApis = new SchoolApi();

describe(`School test cases`, () => {
  jest.setTimeout(5000000);

  it(`Test the createSchool function`, async () => {
    const response = await schoolApis.createSchoolFunction({
      name: 'Andrews matriculation school.',
    });
    expect(response.status).toStrictEqual('SUCCESS');
    return response;
  });

  it(`Test the createClass function`, async () => {
    const response = await schoolApis.createClassFunction({
      name: '11-A',
      school: 'Andrews matriculation school.',
      teachers: [],
    });
    expect(response.status).toStrictEqual('SUCCESS');
    return response;
  });

  it(`Test the createTeacher function`, async () => {
    const response = await schoolApis.createTeacherFunction({
      name: 'Sheela',
      classes: 'LKG A',
    });
    expect(response.status).toStrictEqual('SUCCESS');
    return response;
  });

  it(`Test the createStudents function`, async () => {
    const response = await schoolApis.createStudentsFunction({
      name: 'Sivaraman S',
      classes: ['Music', 'LKG A'],
      parents: [],
    });
    expect(response.status).toStrictEqual('SUCCESS');
    return response;
  });

  it(`Test the createParents function`, async () => {
    const response = await schoolApis.createParentsFunction({
      name: 'Sivaraman S',
      classes: ['Music', 'LKG A'],
      parents: ['', ''],
    });
    expect(response.status).toStrictEqual('SUCCESS');
    return response;
  });
});
