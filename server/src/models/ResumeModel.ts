import { Resume } from "../types";

export default class ResumeModel {
  firstName: string;
  introduction: string;
  skills: { skillName: string }[];
  education: { educationName: string; institute: string }[];
  avatar: string;
  publications?: { id: string; link: string; description: string }[];
  experience?: {
    id: string;
    role: string;
    company: string;
    stackAndTechniques: [{ name: string }];
    startDate: string;
    endDate: string;
  }[];
  projects: {
    id: string;
    role: string;
    company: string;
    stackAndTechniques: [{ name: string }];
    startDate: string;
    endDate: string;
  }[];
  constructor(data: firebase.firestore.DocumentData | Resume) {
    this.firstName = data.personalia.firstName;
    this.introduction = data.introduction;
    this.avatar = data.avatar;
    this.publications = data.publications.map(
      (publication: { link: string; description: string }) => {
        return {
          publicationLink: publication.link,
          publicationDescription: publication.description,
        };
      }
    );
    this.skills = data.skills.map((skill: { name: string }) => {
      return { skillName: skill.name };
    });
    this.education = data.education.map((education: any) => {
      return {
        educationName: education.name,
        institute: education.institute,
      };
    });
    this.experience = data.experience.map((experience: any) => {
      return {
        experienceRole: experience.role,
        experienceCompany: experience.company,
      };
    });
    this.projects = data.projects.map((projects: any) => {
      return {
        projectRole: projects.role,
        projectCompany: projects.company,
      };
    });
  }
}
