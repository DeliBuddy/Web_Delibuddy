"use client"
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { io } from 'socket.io-client';
import {RootState} from '@/app/store';
import {useRouter} from 'next/navigation';
import {setOrder,Order} from '@/app/orderSlice';
import { useDispatch } from 'react-redux';

const Checkout = () => {
  const [progress, setProgress] = useState(0);
  const [timerEnded, setTimerEnded] = useState(false);
  const router = useRouter();
  const order= useSelector((state:RootState)=>state.order.order);
  const dispatch=useDispatch();
  
  useEffect(() => {  
    const socket = io('http://localhost:3696');
  socket.emit('joinChatRoom',order._id);
  
  socket.on('orderAccepted', (updatedOrder:Order) => {
      dispatch(setOrder(updatedOrder));
      router.push(
        '/chat?user=true',
);
    });

    return()=> {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const duration = 10; // seconds
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 0.1);
    }, (duration * 1000) / 1000);

    const timeout=setTimeout(() => {
      console.log('timeout called');
      clearInterval(interval);
      setTimerEnded(true);
      orderIgnored(order);
      setTimeout(() => {
        router.push('/cart');
      }, 2000);
    }, duration * 1000);

    return () => {
      console.log('unmounting');
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const orderIgnored = async (order:Order) => {
    try {
      const response = await fetch('http://localhost:3696/partner/orderIgnored', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order,
        }),
      });
    } catch (error) {
      console.error('API call error:', error);
    }
  };

  const indicatorStyle = {
    backgroundImage: `linear-gradient(to right, white ${progress}%, #E1573A  ${progress}%)`,
    height: '10px',
    width: '100%',
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[url('/bg.png')] overflow-hidden bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center">
      <div className="flex flex-col font-inter font-bold text-[28px] justify-center">
        {!timerEnded&&<div className="flex flex-row justify-center w-auto text-[22px] md:text-[40px]">
              Finding Deli<span className="text-[#E1573A] flex flex-row">Buddies</span>
        </div>}
        {
          timerEnded && <div className="flex flex-row font-inter font-bold text-[28px] md:text-[40px] justify-center">
            Couldn't find Deli <span className="text-[#E1573A] flex flex-row">Buddies</span>
            </div>
        }
       {!timerEnded && <div className="loading-indicator bg-white rounded-xl mt-4" style={indicatorStyle} />}
      </div>
    </div>
  );
};

export default Checkout;