export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  websiteUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Frontend' | 'Backend' | 'AI' | 'Quality and AI Assurance Automation';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details?: string;
}