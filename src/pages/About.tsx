import React from 'react';
import { Brain, Shield, Users, Activity } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About CerebroSync</h1>
        <p className="text-xl text-gray-600">
          Pioneering early detection of chemotherapy-induced cognitive impairment through advanced assessment technology.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Brain className="h-12 w-12 text-purple-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To provide accessible and accurate cognitive assessment tools for early detection and monitoring of chemotherapy-related cognitive changes.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Shield className="h-12 w-12 text-purple-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Privacy First</h2>
          <p className="text-gray-600">
            Your data security is our priority. All assessments and personal information are encrypted and protected.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Development Team</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Tilak G.</h3>
            <p className="text-gray-600">Lead Developer</p>
            <p className="text-sm text-gray-500">23f21a3157@gatesit.ac.in</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Revanth S.</h3>
            <p className="text-gray-600">UI/UX Designer</p>
            <p className="text-sm text-gray-500">22f21a05a9@gatesit.ac.in</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;