export interface Resume {
  personalia: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    city: string;
  };
  education: {
    id?: string;
    certificate?: boolean;
    institute?: string;
    name?: string;
    startDate?: string;
    endDate?: string;
  }[];
  introduction: string;
  avatar: string;
  skills: { name: string }[];
  sideProjects: { id: string; link: string; description: string }[];
  publications: [{ id: string; link: string; description: string }];
  experience: [
    {
      id: string;
      role: string;
      company: string;
      stackAndTechniques: [{ name: string }];
      startDate: string;
      endDate: string;
    }
  ];
  projects: [
    {
      id: string;
      role: string;
      company: string;
      stackAndTechniques: [{ name: string }];
      startDate: string;
      endDate: string;
    }
  ];
}

export type Opts = {
  centered?: boolean;
  getImage?: any;
  getSize?: (img: string, tagValue: string, tagName: string) => number[];
};

export interface ParsedQs {
  [key: string]: string | string[] | ParsedQs | ParsedQs[];
}
