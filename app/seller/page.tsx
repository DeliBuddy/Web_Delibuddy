'use client';
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { RootState } from '@/app/store';
import {io} from 'socket.io-client';
import {Seller} from '@/app/sellerSlice';
import {Order} from '@/app/orderSlice';
// interface Order {
//   _id: string;
//   user_id: string;
//   seller_id: string;
//   items: string[];
//   total_price: number | null;
//   status: string;
// }

// interface OrderListProps {
//   seller: string;
// }




const SellerScreen=() => {
  const [orders, setOrders] = useState<Order[]>([]);
  const socket = io('http://localhost:3696'); // Replace with your WebSocket server URL
  const seller = useSelector((state:RootState) => state.seller.seller);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`http://localhost:3696/order/getOrders?seller=${seller._id}`);
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

  // Set up real-time event listener
  useEffect(() => {
    socket.emit('joinSellerRoom', seller._id);

    socket.on('orderCreated', (newOrder: Order) => {
      console.log(newOrder);
      setOrders((prevOrders) => [...prevOrders, newOrder]); 
    });


    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAccept = async (orderId: string) => {
    const enteredAmount = prompt("Enter the amount:"); 
    if (enteredAmount !== null) {
      const amount = parseFloat(enteredAmount);
      if (!isNaN(amount)) {
        try {
          
          const response = await fetch(`http://localhost:3696/order/acceptOrder`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId,
              amount,
              sellerId: seller._id,
            }),
          });

          if (response.ok) {
            console.log('API call successful');
          } else {
            console.error('API call failed:', response.statusText);
          }
        } catch (error) {
          console.error('API call error:', error);
        }
      } else {
        console.error('Invalid amount entered');
      }
    }
  };

  const handleDeny = async (orderId: string) => {
   // ask for reason through prompt
    
   const reason= prompt("Enter the reason");



    try {
          
      const response = await fetch(`http://localhost:3696/order/rejectOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          sellerId: seller._id,
          reason
        }),
      });

      if (response.ok) {
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
      <div>
        Seller : {seller.name}
      </div>
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
              {order.status === 'pending' && (
                <div className="rounded-card bg-red mt-2 flex flex-row justify-around">
                  <button className="rounded-button text-[#E1573A]" onClick={() => handleAccept(order._id)}>Accept</button>
                  <button className="rounded-button" onClick={() => handleDeny(order._id)}>Deny</button>
                </div>
              )}
            </li>
           </div>
          ))}
        </ul>
      </div>
  );
};

export default SellerScreen;
