export interface User {
  _id?: string;
  email: string;
  password: string;
  admin_pass: string;
  skills: string[];
  projects: string[]; // ObjectId as string
  experiences: string[]; // ObjectId as string
  certifications: CertificationOrAchievements[];
}

export interface Project {
  _id?: string;
  project_name: string;
  small_description: string;
  description: string;
  skills: string[];
  project_repository: string;
  project_live_link: string;
  project_video: string;
}

export interface Experience {
  _id?: string;
  company_name: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
  technologies: string[];
  created_by: string;
  projects: string[]; // ObjectId as string
  company_logo: string;
  certificate_url: string;
  images: string[];
}

export interface CertificationOrAchievements {
  _id?: string;
  title: string;
  description: string;
  projects: string[]; // ObjectId as string
  skills: string[];
  certificate_url: string;
  images: string[];
  issuer: string;
  issue_date: string;
  expiry_date: string;
  created_by: string;
}
