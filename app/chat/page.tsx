'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import {useSelector} from 'react-redux';
import { io } from 'socket.io-client';
import {RootState} from '@/app/store';
import { useSearchParams } from 'next/navigation';
// extract the below user variable from the router object
// router.push(
//   '/chat',
//    { user: true },
// );
// });

interface Message {
  id: number,
  user: string,
  text: string|undefined,
}


const ChatScreen = () => {

  const searchParams = useSearchParams()
  
  //typecast to boolean
  const entityType = searchParams.get('user')== 'true'? 'user':'partner';
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesRef = useRef<HTMLInputElement | null>(null);
  const order= useSelector((state:RootState)=>state.order.order);
  
 
  //both users and partners will join the chat room
  

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    const message = messagesRef.current?.value;
    if (message?.trim() === '') return;

    const newMessage:Message = {
      id: messages.length + 1,
      user: entityType,
      text: message,
    };

    

    try{
      const response = await fetch(`http://localhost:3696/chat/addMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         messageType:entityType==='user'?'userMessage':'partnerMessage',
          message:newMessage,
          roomId:order._id,
        }),
      });
      setMessages([...messages,newMessage,]);
      messagesRef.current!.value = '';
    }
    catch(e){
      console.log(e);
    }
   
  };


  useEffect(() => {  
    const socket = io('http://localhost:3696');
    socket.emit('joinChatRoom',order._id,entityType);

  if(entityType==='user'){
    socket.on('partnerMessage', (message) => {
      console.log("parner message received ",message);
      setMessages([...messages,message]);
    }
    );
  }
  else{
    socket.on('userMessage', (message) => {
      console.log("user message received ",message);
      setMessages([...messages,message]);
    }
    );

    socket.on('orderPrepared',()=>{
      alert("Order is prepared");
    });
  }

    return()=> {
      socket.disconnect();
    };
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="overflow-hidden h-screen  bg-[url('/bg.png')] bg-cover bg-no-repeat bg-center py-4 w-100">
    
    <div className="md:hidden font-inter font-bold flex flex-col items-center justify-center mt-4 text-[20px]">
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
                msg.user===entityType ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  msg.user===entityType
                    ?'bg-white text-black rounded-tl-[20px] rounded-br-[20px] rounded-bl-[20px]'
                    : 'bg-[#E1573A] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px]'
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
    ref={messagesRef}
    // send message with enter key press
    onKeyPress={(e) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    }
  }

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
