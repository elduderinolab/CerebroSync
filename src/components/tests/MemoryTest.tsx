import React, { useState, useEffect } from 'react';
import { useTestStore } from '../../store/testStore';

const DISPLAY_TIME = 5000;
const SEQUENCE_LENGTH = 5;

const MemoryTest = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [showSequence, setShowSequence] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const { saveAnswer, setScores } = useTestStore();

  useEffect(() => {
    const numbers = Array.from({ length: SEQUENCE_LENGTH }, 
      () => Math.floor(Math.random() * 9) + 1);
    setSequence(numbers);

    const timer = setTimeout(() => {
      setShowSequence(false);
    }, DISPLAY_TIME);

    return () => clearTimeout(timer);
  }, []);

  const handleNumberClick = (number: number) => {
    if (showSequence || isComplete) return;

    const newSequence = [...userSequence, number];
    setUserSequence(newSequence);

    if (newSequence.length === sequence.length) {
      const score = calculateScore(newSequence);
      saveAnswer('memorySequence', {
        original: sequence,
        user: newSequence,
        score,
      });
      setScores((prev: any) => ({ ...prev, memory: score }));
      setIsComplete(true);
    }
  };

  const calculateScore = (userSeq: number[]) => {
    const correct = userSeq.reduce((acc, num, idx) => 
      acc + (num === sequence[idx] ? 1 : 0), 0);
    return (correct / sequence.length) * 100;
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Memory Test</h2>
      <p className="mb-4">
        {showSequence 
          ? "Remember this sequence:" 
          : "Recreate the sequence you saw:"}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className={`p-6 text-2xl font-bold rounded-lg 
              ${showSequence && sequence.includes(number)
                ? 'bg-purple-600 text-white'
                : 'bg-white hover:bg-purple-100'}`}
            disabled={showSequence || isComplete}
          >
            {number}
          </button>
        ))}
      </div>

      {isComplete && (
        <div className="text-center">
          <p className="text-xl font-semibold">
            Score: {calculateScore(userSequence)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default MemoryTest;