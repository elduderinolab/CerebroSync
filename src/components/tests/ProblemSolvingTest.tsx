import React, { useState } from 'react';
import { useTestStore } from '../../store/testStore';

const PUZZLES = [
  {
    question: "If a train travels at 60 mph, how long will it take to travel 180 miles?",
    options: ["2 hours", "3 hours", "4 hours", "5 hours"],
    correct: "3 hours"
  },
  {
    question: "Complete the sequence: 2, 4, 8, 16, __",
    options: ["20", "24", "32", "64"],
    correct: "32"
  },
  {
    question: "If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
    options: ["3 cats", "33 cats", "100 cats", "1 cat"],
    correct: "3 cats"
  },
  {
    question: "Which number is the odd one out: 2, 3, 4, 7, 8, 11, 12",
    options: ["2", "3", "7", "11"],
    correct: "3"
  }
];

const ProblemSolvingTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const { saveAnswer, setScores } = useTestStore();

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentIndex < PUZZLES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const score = calculateScore(newAnswers);
      saveAnswer('problemSolvingTest', {
        answers: newAnswers,
        score,
      });
      setScores((prev: any) => ({ ...prev, problemSolving: score }));
      setIsComplete(true);
    }
  };

  const calculateScore = (userAnswers: string[]) => {
    const correct = userAnswers.reduce((acc, answer, idx) => {
      return acc + (PUZZLES[idx].correct === answer ? 1 : 0);
    }, 0);
    return (correct / PUZZLES.length) * 100;
  };

  if (isComplete) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Problem Solving Test Complete!</h3>
        <p className="text-lg">Score: {calculateScore(answers)}%</p>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          View Results
        </button>
      </div>
    );
  }

  const currentPuzzle = PUZZLES[currentIndex];

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Problem Solving Test</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-6">{currentPuzzle.question}</p>
        <div className="space-y-4">
          {currentPuzzle.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 text-gray-600">
        Question {currentIndex + 1} of {PUZZLES.length}
      </div>
    </div>
  );
};

export default ProblemSolvingTest;