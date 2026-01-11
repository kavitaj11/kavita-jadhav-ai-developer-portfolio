import { Project, Skill, Certification, Education } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'k11-website',
    title: 'K11 Software Solutions Platform',
    description: 'A full-stack AI-driven web platform built with Next.js and Django REST Framework. Designed to empower small businesses with intelligent automation, scalable software solutions, and secure digital transformation tools.',
    tags: ['Next.js', 'Django', 'AI-Driven', 'Full-Stack'],
    imageUrl: '',
    websiteUrl: 'https://k11softwaresolutions.com/',
    githubUrl: 'https://github.com/K11-Software-Solutions/k11softwaresolutions-platform'
  },
  {
    id: 'emotion-detection',
    title: 'AI Emotion Detection System',
    description: 'An intelligent web application leveraging computer vision and deep learning to detect and classify human emotions in real-time. Developed with a focus on end-to-end model deployment and interactive UX.',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'AI'],
    imageUrl: '',
    githubUrl: 'https://github.com/kavitaj11/AI_Based_EmotionDetection_WebApp_Development_And_Deployment'
  },
  {
    id: 'weoptimize-promptfoo',
    title: 'WeOptimize.ai Assurance',
    description: 'A dedicated AI model evaluation suite using Promptfoo. Implements systematic testing, red teaming, and regression suites for LLMs to ensure reliability, security, and output consistency.',
    tags: ['Promptfoo', 'AI Assurance', 'LLM Testing', 'Quality and AI Assurance Automation'],
    imageUrl: '',
    githubUrl: 'https://github.com/kavitaj11/weoptimize.ai_assurance_promptfoo'
  },
  {
    id: 'llm-testing-hub',
    title: 'LLM Testing Hub',
    description: 'A practical research hub for LLM assurance—evaluation harnesses, regression suites, red-teaming scenarios, and reliability scorecard for repeatable, audit-ready testing.',
    tags: ['Python', 'LLM Eval', 'Red Teaming', 'Quality and AI Assurance Automation'],
    imageUrl: '',
    githubUrl: 'https://github.com/K11-Software-Solutions/llm-testing-hub'
  },
  {
    id: 'selenium-framework',
    title: 'Enterprise Test Automation (Selenium)',
    description: 'Selenium + Java full-stack framework emphasizing modular design and repeatable execution patterns, extended with AI-assisted self-healing and evaluation hooks.',
    tags: ['Java', 'Selenium', 'AI Testing', 'CI/CD'],
    imageUrl: '',
    githubUrl: 'https://github.com/K11-Software-Solutions/k11TechLab-selenium-java-fullstack-framework'
  },
  {
    id: 'cucumber-bdd-framework',
    title: 'Enterprise Test Automation (BDD)',
    description: 'Cucumber BDD framework for scalable automation across UI + API + Mobile Apps workflows, built for CI/CD and long-term maintainability.',
    tags: ['Java', 'Cucumber', 'Appium', 'BDD'],
    imageUrl: '',
    githubUrl: 'https://github.com/K11-Software-Solutions/k11TechLab-cucumber-bdd-java-fullstack-framework'
  },
  {
    id: 'fullstack-capstone',
    title: 'Capstone Full-Stack Project',
    description: 'A comprehensive full-stack capstone application demonstrating mastery of end-to-end web architecture, featuring complex data relationships and secure authentication.',
    tags: ['Full-Stack', 'React', 'Node.js', 'SQL'],
    imageUrl: '',
    githubUrl: 'https://github.com/kavitaj11/xrwvm-fullstack_developer_capstone'
  },
  {
    id: 'travel-weather-forecast',
    title: 'Euro-Orbit Travel Weather',
    description: 'A specialized 7-day weather forecasting application designed for travel agency logistics, integrating real-time meteorological data with itinerary planning.',
    tags: ['React', 'API Integration', 'UX Design', 'Weather'],
    imageUrl: '',
    githubUrl: 'https://github.com/kavitaj11/euro-orbit-travel-agency-7-day-weather-forecast-app'
  },
  {
    id: 'rumi-press-tracker',
    title: 'Rumi Press Expense Tracker',
    description: 'A robust Django-powered financial management system for book distribution logistics, featuring expense categorization, distribution reporting, and data visualization.',
    tags: ['Django', 'Python', 'FinTech', 'Database'],
    imageUrl: '',
    githubUrl: 'https://github.com/kavitaj11/django_based_rumi_press_book_distribution_expense_tracker'
  },
  {
    id: 'react-apps-repo',
    title: 'React Development Lab',
    description: 'A deep-dive collection of React applications exploring advanced state management, component architecture patterns, and high-performance frontend hooks.',
    tags: ['React', 'Advanced JS', 'Frontend Lab', 'State'],
    imageUrl: '',
    githubUrl: 'https://github.com/kavitaj11/Developing-Front-End-Apps-With-React'
  },
  {
    id: 'apollonia-crud',
    title: 'Apollonia Dental System',
    description: 'Full-stack employee management CRUD application demonstrating end-to-end delivery, secure state management, and professional UX.',
    tags: ['React', 'Node.js', 'CRUD', 'Full-Stack'],
    imageUrl: '',
    githubUrl: 'https://github.com/kavitaj11/apollonia-dental-practice-employee-management-system-CRUD-web-app'
  },
  {
    id: 'greenspot-db',
    title: 'Greenspot Grocer DB',
    description: 'Data modeling + normalization + scalable DB design project transforming flat datasets into optimized relational structures for high-performance inventory tracking.',
    tags: ['SQL', 'DB Design', 'Relational', 'Normalization'],
    imageUrl: '',
    githubUrl: 'https://github.com/kavitaj11/greenspot-grocery-portfolio-database-project'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 92, category: 'Frontend' },
  { name: 'TypeScript', level: 92, category: 'Frontend' },
  { name: 'JavaScript', level: 95, category: 'Frontend' },
  { name: 'Node.js / Express', level: 88, category: 'Backend' },
  { name: 'Python / Java', level: 94, category: 'Backend' },
  { name: 'Django / REST Framework', level: 92, category: 'Backend' },
  { name: 'Microservices', level: 82, category: 'Backend' },
  { name: 'Generative AI / LLMs', level: 95, category: 'AI' },
  { name: 'GitHub Copilot', level: 96, category: 'AI' },
  { name: 'RAG & AI Agents', level: 88, category: 'AI' },
  { name: 'Prompt Engineering', level: 95, category: 'AI' },
  { name: 'Selenium / Playwright', level: 98, category: 'Quality and AI Assurance Automation' },
  { name: 'Cucumber / BDD', level: 96, category: 'Quality and AI Assurance Automation' },
  { name: 'REST Assured', level: 94, category: 'Quality and AI Assurance Automation' },
  { name: 'Appium', level: 90, category: 'Quality and AI Assurance Automation' },
  { name: 'TestNG / JUnit', level: 95, category: 'Quality and AI Assurance Automation' },
  { name: 'Promptfoo / DeepEval', level: 92, category: 'Quality and AI Assurance Automation' },
  { name: 'LangTest', level: 90, category: 'Quality and AI Assurance Automation' },
  { name: 'UFT Developer', level: 85, category: 'Quality and AI Assurance Automation' },
  { name: 'CI/CD & Kubernetes', level: 85, category: 'Quality and AI Assurance Automation' }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'ai-llm-testing',
    name: 'AI & LLM Testing',
    issuer: 'Engenious University',
    date: 'Aug 2025',
  },
  {
    id: 'ai-dev-cert',
    name: 'AI Developer Professional Certificate',
    issuer: 'Coursera',
    date: 'March 2025',
  },
  {
    id: 'ibm-fullstack',
    name: 'IBM Full Stack Software Developer Professional Certificate',
    issuer: 'IBM (Coursera)',
    date: 'Nov 2025',
  },
  {
    id: 'google-python',
    name: 'Google IT Automation with Python',
    issuer: 'Google (Coursera)',
    date: 'Feb 2021',
  },
  {
    id: 'scjp',
    name: 'SCJP: Sun Certified Java Programmer (Java 2 Platform 1.4)',
    issuer: 'Sun Microsystems',
    date: 'June 2005',
  }
];

export const EDUCATION: Education[] = [
  {
    id: 'be-entc',
    degree: 'Bachelor of Engineering in Electronics and Telecommunication',
    institution: 'University of Mumbai, India',
    period: 'Year 2004',
    details: 'Graduated with a focus on electronic circuits, telecommunication systems, and engineering fundamentals.'
  }
];