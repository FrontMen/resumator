type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

export interface Personalia {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    city: string;
}
export interface Education {
  id?: string;
  certificate?: boolean;
  institute?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
}
export interface Experience {
  id: string;
  role: string;
  company: string;
  description: string;
  stackAndTechniques: Skill[];
  startDate: string;
  endDate: string;
}
export interface Project {
  id: string;
  role: string;
  company: string;
  description: string,
  stackAndTechniques: Skill[];
  startDate: string;
  endDate: string;
}
export interface Publication { 
  id: string; 
  link: string; 
  title?: string;
  description: string 
}
export interface SideProject { 
  id: string;
  link?: string;
  title?: string;
  description: string 
}
export interface Skill {
  name: string
}

export interface Resume {
  isImport?: Boolean,
  personalia: Personalia
  education: Education[];
  introduction: string;
  avatar: string;
  skills: Skill[];
  sideProjects: SideProject[];
  publications: Publication[];
  experience: Experience[];
  projects: Project[];
}

export type PartialResume = RecursivePartial<Resume>

export type Opts = {
  centered?: boolean;
  getImage?: any;
  getSize?: (img: string, tagValue: string, tagName: string) => number[];
};

export interface ParsedQs {
  [key: string]: string | string[] | ParsedQs | ParsedQs[];
}