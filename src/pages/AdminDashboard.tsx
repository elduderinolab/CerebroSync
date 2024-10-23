import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const assessmentsSnapshot = await getDocs(collection(db, 'assessments'));
        
        setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setAssessments(assessmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: assessments.map(a => new Date(a.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Score',
        data: assessments.map(a => 
          Object.values(a.scores).reduce((sum, score) => sum + score, 0) / 4
        ),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-purple-600">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Assessments</h3>
          <p className="text-3xl font-bold text-purple-600">{assessments.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-purple-600">
            {(assessments.reduce((acc, curr) => {
              const avg = Object.values(curr.scores).reduce((sum, score) => sum + score, 0) / 4;
              return acc + avg;
            }, 0) / assessments.length || 0).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Score Trends</h3>
        <Line data={chartData} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Assessments</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Memory</th>
                <th className="text-left p-4">Attention</th>
                <th className="text-left p-4">Language</th>
                <th className="text-left p-4">Problem Solving</th>
              </tr>
            </thead>
            <tbody>
              {assessments.slice(0, 10).map((assessment) => (
                <tr key={assessment.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{assessment.userId}</td>
                  <td className="p-4">{new Date(assessment.date).toLocaleDateString()}</td>
                  <td className="p-4">{assessment.scores.memory}%</td>
                  <td className="p-4">{assessment.scores.attention}%</td>
                  <td className="p-4">{assessment.scores.language}%</td>
                  <td className="p-4">{assessment.scores.problemSolving}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;