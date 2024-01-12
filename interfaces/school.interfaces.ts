export interface ISchool {
  id?: string;
  name: string;
  classes?: string[];
  teachers?: string[];
  parents?: string[];
}

export interface IClass {
  id?: string;
  name: string;
  school: string;
  teachers: string[];
}

export interface ITeacher {
  id?: string;
  name: string;
  classes: string[];
}

export interface IParents {
  id?: string;
  name: string;
  students: string[];
}

export interface IStudents {
  id?: string;
  name: string;
  classes: string[];
  parents: string[];
}
