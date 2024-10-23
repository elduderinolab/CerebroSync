import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Activity, BarChart3, Shield } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-800">
          Early Detection of Cognitive Changes
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          CerebroSync uses advanced assessment technology to detect early signs of chemotherapy-induced cognitive impairment.
        </p>
        <button 
          onClick={() => navigate('/assessment')}
          className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg hover:bg-purple-700 transition"
        >
          Start Assessment
        </button>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Brain className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Comprehensive Testing</h3>
          <p className="text-gray-600">Multiple cognitive domains assessed through adaptive testing.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Activity className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Real-time Analysis</h3>
          <p className="text-gray-600">Instant results and personalized recommendations.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Shield className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
          <p className="text-gray-600">Your data is encrypted and protected.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;