export interface CVPersonal {
  name: string;
  email: string;
  phone: string;
  address?: string;
  linkedin?: string;
  photo?: string;
}

export interface CVExperience {
  id: string;
  title: string;
  company: string;
  from: string;
  to: string;
  description: string;
  bullets: string[];
}

export interface CVEducation {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface CVSkills {
  technical: string[];
  languages: { name: string; level: string }[];
  certifications: string[];
}

export type CVTemplate =
  | "nordisk"
  | "oslo"
  | "eksekutiv"
  | "kreativ"
  | "kompakt"
  | "tidslinje"
  | "fjord"
  | "stavanger"
  | "diplomatisk"
  | "bergen";

export interface CVData {
  personal: CVPersonal;
  summary: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: CVSkills;
  template: CVTemplate;
}
