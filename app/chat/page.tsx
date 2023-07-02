'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: true, text: 'Hello!', color: '#E1573A' },
    { id: 2, sender: false, text: 'Hi there!', color: 'white' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: true,
      text: message,
      color: '#E1573A',
    };

    setMessages([...messages,newMessage,]);
    setMessage('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="overflow-hidden h-screen  bg-[url('/bg.png')] bg-cover bg-no-repeat bg-center py-4 w-100">
    
    <div className="md:hidden block font-inter font-bold flex flex-col items-center justify-center mt-4 text-[20px]">
            <Image src="/logo.png" width={200} height={200} alt="Logo"></Image>
        </div>
      
    <div className='hidden  font-inter md:flex flex-row justify-center text-[#E1573A] font-bold text-[20px] mt-6'> Chat with your DeliBuddy</div>
    <div className="mx-auto flex flex-col  md:w-[40vw] md:bg-black md:h-[80vh] my-6 rounded-xl md:px-2 md:py-2">
      <div className="flex-grow flex flex-col p-8  w-full overflow-y-auto  scrollbar-hide h-[70vh]"  ref={messagesEndRef}>
        <div className="flex flex-col space-y-4" >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2 ${
                msg.sender ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  !msg.sender
                    ? 'bg-[#E1573A] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px]'
                    : 'bg-white text-black rounded-tl-[20px] rounded-br-[20px] rounded-bl-[20px]'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
  <input
    type="text"
    className="w-full p-2 border-b-2 border-white focus:outline-none bg-transparent text-white"
    placeholder="Type a message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyPress={(e) => {
      if (e.key === 'Enter') handleSendMessage();
    }}
  />
  <button
    className="ml-4 px-6 py-2 rounded-md bg-[#E1573A] text-white focus:outline-none"
    onClick={handleSendMessage}
  >
    SEND
  </button>
</div>
    </div>
    </div>
  );
};

export default ChatScreen;
