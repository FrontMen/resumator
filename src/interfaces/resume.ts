import { firestore } from "firebase";

export interface Skill {
  name: string;
}

export interface Period {
  endDate: firestore.Timestamp;
  startDate: firestore.Timestamp;
}

export interface Education extends Period {
  institute: string;
  name: string;
}

export interface Experience extends Period {
  company: string;
  description: string;
  role: string;
  stackAndTechniques: Skill[];
}

export interface Personalia {
  avatar?: string;
  city: string;
  dateOfBirth: firestore.Timestamp;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Publication {
  title: string;
  description: string;
}

export interface SideProject {
  title: string;
  link: string;
  description: string;
}

export interface Resume {
  education?: Education[];
  experience?: Experience[];
  id: string;
  introduction?: string;
  isImport?: boolean;
  personalia: Personalia;
  projects?: Experience[];
  publications?: Publication[];
  sideProjects?: SideProject[];
  skills?: Skill[];
  tableData: {
    id: string;
  };
}
