import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '../types';

const genAI = new GoogleGenerativeAI('AIzaSyAXuSG7FeGpi5JRljoEEjyxBK5b1JYxeKQ');

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();
      
      setMessages([...messages, userMessage, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error:', error);
    }

    setIsLoading(false);
    setInput('');
  };

  return (
    <div className="relative">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition"
        >
          <MessageCircle />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
          <div className="p-4 bg-purple-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">CerebroSync Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <X />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-purple-100 ml-auto'
                    : 'bg-gray-100'
                } max-w-[80%]`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex space-x-2 justify-center">
                <div className="animate-bounce">⋯</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-purple-600"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;