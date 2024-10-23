import { jsPDF } from 'jspdf';
import { AssessmentResult } from '../types';

export const generatePDF = (result: AssessmentResult) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('CerebroSync Assessment Report', 20, 20);
  
  // Date
  doc.setFontSize(12);
  doc.text(`Date: ${new Date(result.date).toLocaleDateString()}`, 20, 35);
  
  // Scores
  doc.setFontSize(16);
  doc.text('Test Results:', 20, 50);
  
  doc.setFontSize(12);
  doc.text(`Memory Score: ${result.scores.memory}%`, 30, 65);
  doc.text(`Attention Score: ${result.scores.attention}%`, 30, 75);
  doc.text(`Language Score: ${result.scores.language}%`, 30, 85);
  doc.text(`Problem Solving Score: ${result.scores.problemSolving}%`, 30, 95);
  
  // Overall Assessment
  const avgScore = Object.values(result.scores).reduce((a, b) => a + b, 0) / 4;
  doc.setFontSize(16);
  doc.text('Overall Assessment:', 20, 115);
  doc.setFontSize(12);
  doc.text(`Average Score: ${avgScore.toFixed(1)}%`, 30, 130);
  
  // Recommendations
  doc.setFontSize(16);
  doc.text('Recommendations:', 20, 150);
  doc.setFontSize(12);
  
  let recommendations = [];
  if (result.scores.memory < 70) {
    recommendations.push('Consider memory enhancement exercises');
  }
  if (result.scores.attention < 70) {
    recommendations.push('Practice mindfulness and concentration tasks');
  }
  if (result.scores.language < 70) {
    recommendations.push('Engage in vocabulary building activities');
  }
  if (result.scores.problemSolving < 70) {
    recommendations.push('Try logic puzzles and brain teasers');
  }
  
  recommendations.forEach((rec, index) => {
    doc.text(`• ${rec}`, 30, 165 + (index * 10));
  });
  
  // Footer
  doc.setFontSize(10);
  doc.text('CerebroSync - Early Detection of Cognitive Changes', 20, 280);
  
  return doc;
};