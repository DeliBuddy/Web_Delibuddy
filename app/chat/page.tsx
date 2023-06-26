'use client'
import React, { useState, useEffect, useRef } from 'react';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: true, text: 'Hello!', color: '#E1573A' },
    { id: 2, sender: false, text: 'Hi there!', color: 'white' },
  ]);

//   const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: true,
      text: message,
      color: '#E1573A',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

//   useEffect(() => {
//     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

  return (
    <div className="bg-black text-white h-screen flex flex-col">
      <div className="flex-grow flex flex-col p-8 overflow-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2 ${
                msg.sender ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  msg.sender
                    ? 'bg-[#E1573A] rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px]'
                    : 'bg-white text-black rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      <div className="p-4">
        <input
          type="text"
          className="w-full p-2 rounded-full border-2 border-gray-300 focus:outline-none bg-white text-black"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
      </div>
    </div>
  );
};

export default ChatScreen;
