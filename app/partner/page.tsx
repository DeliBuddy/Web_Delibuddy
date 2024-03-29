'use client';
import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {setOrder,Order} from '@/app/orderSlice';
import {useRouter} from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const Partner=() => {
  const [orders, setOrders] = useState<Order[]>([]);
  const socket = io('http://localhost:3696'); // Replace with your WebSocket server URL
  const dispatch= useDispatch();
  const router=useRouter();
  const user=useSelector((state:RootState) => state.user.user);
  
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`http://localhost:3696/partner/getOrders?`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Error fetching orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrders();
  }, []);
  
  useEffect(() => {
    socket.emit('joinPartnerRoom');

    socket.on('newOrder', (newOrder: Order) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]); 
    });

    //remove the order from the list when it has been accepted by another partner

    socket.on('orderAccepted', (acceptedOrder: Order) => {
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== acceptedOrder._id));
    });

    socket.on('orderIgnored', (ignoredOrder: Order) => {
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== ignoredOrder._id));
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAccept = async (order:Order) => {
    try {
      const response = await fetch('http://localhost:3696/partner/acceptOrder', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order,
          partner:user
        }),
      });

      if (response.ok) {
        const updatedOrder:Order=await response.json();

        dispatch(setOrder(updatedOrder));
        
        router.push(
          '/chat?user=false',
  );
        console.log('API call successful');
      } else {
        console.error('API call failed:', response.statusText);
      }
    } catch (error) {
      console.error('API call error:', error);
    }
  };

 

  return (
    <div className="flex flex-col mt-20 justify-center items-center  bg-red w-full">
        <div> Partner: {user.name} </div>
        <ul className='w-full '>
          {orders.map((order) => (
            
           <div className='w-2/5 h-2/5 mx-auto bg-[#333333] mt-10 rounded-md p-3'>
             <li key={order._id}>
              <div >
              {order.user._id}
              </div>
              <div>
                Items:
              </div>
              {order.items.map((item) => (
                <div key={item}>
                  {item}
                </div>
              ))}
              
                <div className="rounded-card bg-red mt-2 flex flex-row justify-around">
                  <button className="rounded-button text-[#E1573A]" onClick={() => handleAccept(order)}>Accept</button>
                </div>
            </li>
           </div>
          ))}
        </ul>
      </div>
  );
};

export default Partner;
