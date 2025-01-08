"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Send, Bot, User } from 'lucide-react';
import '@dialectlabs/blinks/index.css';
import { Action, Blink, useAction } from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";

interface Message {
  text: string;
  isBot: boolean;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isBot: true }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const actionApiUrl = 'http://localhost:3000/api/actions/transferSol';
  const { adapter } = useActionSolanaWalletAdapter('https://api.devnet.solana.com');
  const { action, isLoading } = useAction({ url: actionApiUrl });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isBot: false };

    setMessages((prev) => [...prev, userMessage]);

    const botResponse: Message = {
      text: "I'm a frontend demo, but I can simulate responses! Here's a reply to your message.",
      isBot: true
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
    }, 1000); // Simulate bot typing delay

    setInput('');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark:bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <Bot className="w-8 h-8" />
            AI E-commerce Assistant
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
        </div>

        {/* Chat Window */}
        <div className="bg-white dark:bg-black rounded-lg shadow-lg h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  {message.isBot ? <Bot size={30} /> : <User size={30} />}
                </div>
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    message.isBot
                      ? 'bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {message.text}
                  {message.isBot && !isLoading && <Blink action={action} adapter={adapter} />}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-800">
            <div className="flex gap-2">
              <label htmlFor="message-input" className="sr-only">Message</label>
              <input
                id="message-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border dark:border-b-gray-900  
                  p-4 focus:outline-white focus:ring-2 focus:ring-blue-500 
                  dark:bg-black dark:text-white"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors flex items-center gap-2 dark:bg-black dark:text-white"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
