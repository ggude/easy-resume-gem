
export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  summary: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  website?: string;
  linkedin?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    website: "",
    linkedin: ""
  },
  workExperience: [],
  education: [],
  skills: [],
  summary: ""
};
