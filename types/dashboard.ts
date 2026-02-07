import type { ContactInfo } from "./application";
import type { CVData } from "./cv";

export interface SavedApplication {
  id: string;
  generatedText: string;
  jobDescription: string | null;
  userBackground: string | null;
  jobTitle: string | null;
  template: string;
  layout: string;
  contactInfo: ContactInfo;
  wordCount: number;
  createdAt: string;
}

export interface SavedCV {
  id: string;
  data: CVData;
  template: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}
