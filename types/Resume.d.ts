type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export interface Personalia {
  avatar?: string;
  city: string;
  dateOfBirth: firestore.Timestamp;
  email: string;
  firstName: string;
  lastName: string;
}
export interface Education {
  id?: string;
  certificate?: boolean;
  institute?: string;
  name?: string;
  startDate?: Date;
  endDate?: Date;
}
export interface Experience {
  id?: string;
  role: string;
  company: string;
  description: string;
  stackAndTechniques: Skill[];
  startDate: Date;
  endDate: Date;
}
export interface Project {
  id?: string;
  role: string;
  company: string;
  description: string;
  stackAndTechniques: Skill[];
  startDate: Date;
  endDate: Date;
}
export interface Publication {
  id?: string;
  link: string;
  title?: string;
  description: string;
}
export interface SideProject {
  id?: string;
  link?: string;
  title?: string;
  description: string;
}
export interface Skill {
  name: string;
}

export default interface Resume {
  id: string;
  isImport?: Boolean;
  personalia: Personalia;
  education: Education[];
  introduction: string;
  skills: Skill[];
  sideProjects: SideProject[];
  publications: Publication[];
  experience: Experience[];
  projects: Project[];
}

export type PartialResume = RecursivePartial<Resume>;

export interface ParsedQs {
  [key: string]: string | string[] | ParsedQs | ParsedQs[];
}
