export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  date: string;
  scores: {
    memory: number;
    attention: number;
    language: number;
    problemSolving: number;
  };
}