import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Chat from './components/Chat';
import { Brain } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <div className="fixed bottom-4 right-4">
          <Chat />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;