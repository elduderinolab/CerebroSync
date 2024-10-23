import React, { useState } from 'react';
import { useTestStore } from '../../store/testStore';

const WORD_PAIRS = [
  { word: 'happy', synonyms: ['joyful', 'cheerful', 'pleased'] },
  { word: 'quick', synonyms: ['fast', 'rapid', 'swift'] },
  { word: 'big', synonyms: ['large', 'huge', 'enormous'] },
  { word: 'beautiful', synonyms: ['pretty', 'lovely', 'gorgeous'] },
  { word: 'smart', synonyms: ['intelligent', 'clever', 'bright'] },
];

const LanguageTest = () => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const { saveAnswer, setScores, setCurrentTest } = useTestStore();

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (currentPairIndex < WORD_PAIRS.length - 1) {
      setCurrentPairIndex(currentPairIndex + 1);
    } else {
      const score = calculateScore(newAnswers);
      saveAnswer('languageTest', {
        answers: newAnswers,
        score,
      });
      setScores((prev: any) => ({ ...prev, language: score }));
      setIsComplete(true);
      setTimeout(() => setCurrentTest('problemSolving'), 2000);
    }
  };

  const calculateScore = (answers: string[]) => {
    const correct = answers.reduce((acc, answer, idx) => {
      return acc + (WORD_PAIRS[idx].synonyms.includes(answer.toLowerCase()) ? 1 : 0);
    }, 0);
    return (correct / WORD_PAIRS.length) * 100;
  };

  if (isComplete) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Language Test Complete!</h3>
        <p className="text-lg">Score: {calculateScore(userAnswers)}%</p>
        <p className="mt-4">Starting Problem Solving test...</p>
      </div>
    );
  }

  const currentPair = WORD_PAIRS[currentPairIndex];

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Language Test</h2>
      <p className="mb-6">Select a synonym for the given word:</p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Word: {currentPair.word}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[...currentPair.synonyms, 'incorrect1', 'incorrect2']
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-4 rounded-lg transition"
              >
                {option}
              </button>
            ))}
        </div>
      </div>

      <div className="mt-4 text-gray-600">
        Question {currentPairIndex + 1} of {WORD_PAIRS.length}
      </div>
    </div>
  );
};

export default LanguageTest;