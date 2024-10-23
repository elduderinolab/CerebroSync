import React, { useState, useEffect } from 'react';
import { useTestStore } from '../../store/testStore';

const AttentionTest = () => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [targetSymbol, setTargetSymbol] = useState<string>('');
  const [responses, setResponses] = useState<boolean[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);
  const { saveAnswer, setScores } = useTestStore();

  useEffect(() => {
    const possibleSymbols = ['★', '●', '■', '▲', '♦'];
    const testSymbols = Array.from({ length: 20 }, () => 
      possibleSymbols[Math.floor(Math.random() * possibleSymbols.length)]
    );
    setSymbols(testSymbols);
    setTargetSymbol(possibleSymbols[Math.floor(Math.random() * possibleSymbols.length)]);
    setStartTime(Date.now());
  }, []);

  const handleResponse = (response: boolean) => {
    if (isComplete) return;

    const newResponses = [...responses, response];
    setResponses(newResponses);

    if (newResponses.length === symbols.length) {
      const endTime = Date.now();
      const score = calculateScore(newResponses);
      saveAnswer('attentionTest', {
        symbols,
        targetSymbol,
        responses: newResponses,
        timeMs: endTime - startTime,
        score,
      });
      setScores((prev: any) => ({ ...prev, attention: score }));
      setIsComplete(true);
    }
  };

  const calculateScore = (userResponses: boolean[]) => {
    const correctResponses = userResponses.reduce((acc, response, idx) => {
      const isCorrect = (symbols[idx] === targetSymbol) === response;
      return acc + (isCorrect ? 1 : 0);
    }, 0);
    return (correctResponses / symbols.length) * 100;
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Attention Test</h2>
      <p className="mb-4">
        Click "Yes" when you see this symbol: <span className="text-2xl">{targetSymbol}</span>
      </p>

      {!isComplete && responses.length < symbols.length && (
        <div className="text-center mb-8">
          <div className="text-6xl mb-6">{symbols[responses.length]}</div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleResponse(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Yes
            </button>
            <button
              onClick={() => handleResponse(false)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              No
            </button>
          </div>
        </div>
      )}

      {isComplete && (
        <div className="text-center">
          <p className="text-xl font-semibold">
            Score: {calculateScore(responses)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default AttentionTest;