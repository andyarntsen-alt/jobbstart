export type TemplateStyle = "konservativ" | "moderne" | "kreativ";
export type ExportLayout = "ren" | "profesjonell" | "eksekutiv";

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

export interface GenerateRequest {
  jobDescription: string;
  userBackground: string;
  template: TemplateStyle;
  contactInfo: ContactInfo;
}

export interface GenerateResponse {
  text: string;
  wordCount: number;
}
