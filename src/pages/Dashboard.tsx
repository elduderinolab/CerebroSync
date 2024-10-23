import React from 'react';
import { BarChart3, Brain, Clock, Target } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
          Download Report
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold">85%</span>
          </div>
          <h3 className="text-gray-600">Memory Score</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold">92%</span>
          </div>
          <h3 className="text-gray-600">Attention Score</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold">78%</span>
          </div>
          <h3 className="text-gray-600">Language Score</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold">88%</span>
          </div>
          <h3 className="text-gray-600">Processing Speed</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Recent Assessments</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
              <div>
                <p className="font-semibold">Comprehensive Assessment</p>
                <p className="text-sm text-gray-600">Completed on {new Date().toLocaleDateString()}</p>
              </div>
              <button className="text-purple-600 hover:text-purple-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;