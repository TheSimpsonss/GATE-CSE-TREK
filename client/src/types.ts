export interface Chapter {
  id: string;
  name: string;
  isCompleted: boolean;
  revision1: boolean;
  revision2: boolean;
  pyqSolved: boolean;
}

export interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
}

export enum TestType {
  TOPIC = 'Topic Wise',
  SUBJECT = 'Subject Wise',
  FULL_LENGTH = 'Full Length'
}

export interface TestRecord {
  id: string;
  name: string;
  subjectId: string; // 'ALL' for Full Length
  type: TestType;
  marksObtained: number;
  totalMarks: number;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
