import { create } from 'zustand';

interface TestState {
  currentTest: string;
  currentQuestion: number;
  answers: Record<string, any>;
  scores: {
    memory: number;
    attention: number;
    language: number;
    problemSolving: number;
  };
  setCurrentTest: (test: string) => void;
  setCurrentQuestion: (question: number) => void;
  saveAnswer: (questionId: string, answer: any) => void;
  setScores: (scores: any) => void;
  resetTest: () => void;
}

export const useTestStore = create<TestState>((set) => ({
  currentTest: '',
  currentQuestion: 0,
  answers: {},
  scores: {
    memory: 0,
    attention: 0,
    language: 0,
    problemSolving: 0,
  },
  setCurrentTest: (test) => set({ currentTest: test }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  saveAnswer: (questionId, answer) => 
    set((state) => ({ 
      answers: { ...state.answers, [questionId]: answer }
    })),
  setScores: (scores) => set({ scores }),
  resetTest: () => set({
    currentTest: '',
    currentQuestion: 0,
    answers: {},
    scores: {
      memory: 0,
      attention: 0,
      language: 0,
      problemSolving: 0,
    },
  }),
}));