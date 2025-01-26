"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Send, Bot, User } from 'lucide-react';
import '@dialectlabs/blinks/index.css';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
interface Message {
  text: string;
  isBot: boolean;
  displayedText: string;
}

const ChatBot = () => {
    const { data: session, status} = useSession()
    const router = useRouter()
    const [darkMode, setDarkMode] = useState(false);
    const [input, setInput] = useState('');
  
    
    const [messages, setMessages] = useState<Message[]>([{
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true,
      displayedText: ''
    }]);
  
   
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);
    
    useEffect(() => {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.displayedText.length < lastMessage.text.length) {
        const timer = setTimeout(() => {
          setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            const lastMsg = newMessages[newMessages.length - 1];
            lastMsg.displayedText = lastMsg.text.slice(0, lastMsg.displayedText.length + 1);
            return newMessages;
          });
        }, 20);
        return () => clearTimeout(timer);
      }
    }, [messages]);
  
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push('/login');
      }
      if(status === "loading"){
        
      }
    }, [status, router]);
    
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
  
      const userMessage: Message = {
        text: input,
        isBot: false,
        displayedText: input
      };
  
      const botResponse: Message = {
        text: "I'm a frontend demo, but I can simulate responses! Here's a reply to your message.",
        isBot: true,
        displayedText: ''
      };
  
      setMessages(prev => [...prev, userMessage, botResponse]);
      setInput('');
    };
  return (
     <div className={`min-h-screen transition-colors duration-200 
        ${darkMode ? 'dark:bg-black' : 'bg-gray-50'}`}>



<div className="flex justify-between items-center mb-8 w-full p-4">
            <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
              <Bot className="w-8 h-8" />
              AI Ecommerece Assistant
            </h1>

            <div className=' flex items-center gap-2'>
            <Button onClick={() => signOut()}>LogOut</Button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
            >
              {darkMode ? 
                <Sun className="w-6 h-6 text-yellow-400" /> : 
                <Moon className="w-6 h-6 text-gray-600" />
              }
            </button>
            </div>
           
            
          </div>
        
        <div className="max-w-4xl mx-auto p-4">
          {/*Nav Bar */}
         
    
          <div className="bg-white dark:bg-black rounded-lg shadow-lg h-[600px] flex flex-col ">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    message.isBot ? '' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${message.isBot ? 
                      ' text-white' : 
                      ' '
                    }`}
                  >
                    {message.isBot ? <Bot size={30} /> : <User size={30} />}
                  </div>
                  <div
                    className={`rounded-lg p-4 max-w-[80%] ${
                      message.isBot
                        ? 'bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {message.displayedText}
                    {message.isBot && message.displayedText !== message.text && (
                      <span className="inline-block w-1 h-4 ml-1 bg-blue-500 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/*Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg  border dark:border-b-gray-900  
                    p-4 focus:outline-white focus:ring-2 focus:ring-blue-500 
                    dark:bg-black dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-white text-black rounded-lg px-4 py-2 
                     transition-colors flex items-center gap-2 dark:bg-black dark:text-white"
                >
                  <Send size={20} />
               
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default ChatBot