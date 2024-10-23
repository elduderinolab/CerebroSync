import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTestStore } from '../store/testStore';
import MemoryTest from '../components/tests/MemoryTest';
import AttentionTest from '../components/tests/AttentionTest';
import LanguageTest from '../components/tests/LanguageTest';
import ProblemSolvingTest from '../components/tests/ProblemSolvingTest';

const Assessment = () => {
  const [testStarted, setTestStarted] = useState(false);
  const { currentTest, setCurrentTest, scores, resetTest } = useTestStore();

  const startTest = (type: 'quick' | 'comprehensive') => {
    resetTest();
    setTestStarted(true);
    setCurrentTest('memory');
  };

  const renderTest = () => {
    switch (currentTest) {
      case 'memory':
        return <MemoryTest />;
      case 'attention':
        return <AttentionTest />;
      case 'language':
        return <LanguageTest />;
      case 'problemSolving':
        return <ProblemSolvingTest />;
      default:
        return null;
    }
  };

  if (testStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          {renderTest()}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Cognitive Assessment</h1>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Before You Begin</h2>
        <ul className="space-y-4 text-gray-600">
          <li className="flex items-start">
            <ArrowRight className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0" />
            <span>Find a quiet place where you won't be disturbed</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0" />
            <span>Ensure you have at least 20 minutes available</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0" />
            <span>Use a device with a reliable internet connection</span>
          </li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Assessment</h3>
          <p className="text-gray-600 mb-4">A 10-minute screening of core cognitive functions.</p>
          <button 
            onClick={() => startTest('quick')}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Start Quick Test
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Comprehensive Assessment</h3>
          <p className="text-gray-600 mb-4">A detailed 20-minute evaluation of all cognitive domains.</p>
          <button 
            onClick={() => startTest('comprehensive')}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Start Full Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;