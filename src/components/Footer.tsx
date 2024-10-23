import React from 'react';
import { Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CerebroSync</h3>
            <p className="text-gray-400">
              Early detection of cognitive impairment through advanced assessment technology.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Developers</h4>
            <div className="space-y-2 text-gray-400">
              <p>Tilak G. (23f21a3157@gatesit.ac.in)</p>
              <p>Revanth S. (22f21a05a9@gatesit.ac.in)</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="flex space-x-4">
              <a href="mailto:contact@cerebrosync.com" className="text-gray-400 hover:text-white">
                <Mail className="h-6 w-6" />
              </a>
              <a href="https://github.com/cerebrosync" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} CerebroSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;