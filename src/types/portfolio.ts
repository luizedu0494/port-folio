export interface Contacts {
  linkedin: string;
  github: string;
  email: string;
  whatsapp: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level?: string; icon?: string }[];
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  skills?: string[];
  credentialUrl?: string;
}

export interface DeveloperProfile {
  name: string;
  headline: string;
  targetRole: string;
  location: string;
  mainStack: string[];
  contacts: Contacts;
  aboutMe: {
    summary: string;
    paragraphs: string[];
    highlights: string[];
  };
  skillCategories: SkillCategory[];
  certifications: Certification[];
}

export interface Project {
  id: string;
  name: string;
  repo: string;
  language: string;
  featured?: boolean;
  demoUrl?: string;
  description: string;
  stack: string[];
  highlights?: string[];
}
