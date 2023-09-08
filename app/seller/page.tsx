'use client';
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { RootState } from '@/app/store';
import {io} from 'socket.io-client';
import {Order, setOrder} from '@/app/orderSlice';
import {useDispatch} from 'react-redux';




const SellerScreen=() => {
  const [orders, setOrders] = useState<Order[]>([]);
  const socket = io('http://localhost:3696'); // Replace with your WebSocket server URL
  const seller = useSelector((state:RootState) => state.seller.seller);
  const dispatch= useDispatch();
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

    //when order is created for the first time
    socket.on('orderCreated', (newOrder: Order) => {
      console.log(newOrder);
      setOrders((prevOrders) => [...prevOrders, newOrder]); 
    });

    //when order is accepted by a delivery partner
    socket.on('orderForwarded', (newOrder: Order) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]); 
    });

    //when order is received by user
    socket.on('orderDelivered', (orderId) => {
      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
    });

    return () => {
      socket.disconnect();
    };
  }, [orders]);

  const handleAccept = async (order:Order) => {
    // ask the amount for each item of the order
    const total_amount:any=[];
    for(let i=0;i<order.items.length;i++){
      const enteredAmount = prompt(`Enter the amount for ${order.items[i]}:`);
      if (enteredAmount !== null) {
        const amount = parseFloat(enteredAmount);
        if (!isNaN(amount)) {
          total_amount.push({ item:order.items[i],amount});
        }
      }
    }
    
        try {
          
          const response = await fetch(`http://localhost:3696/order/acceptOrder`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId:order._id,
              total_amount,
              sellerId: seller._id,
            }),
          });

          if (response.ok) {
            const updatedOrders = orders.filter((item) => item._id !== order._id);
            setOrders(updatedOrders);
            console.log('API call successful');
          } else {
            console.error('API call failed:', response.statusText);
          }
        } catch (error) {
          console.error('API call error:', error);
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
        const updatedOrders = orders.filter((order) => order._id !== orderId);
        setOrders(updatedOrders);
        console.log('API call successful');
      } else {
        console.error('API call failed:', response.statusText);
      }
    } catch (error) {
      console.error('API call error:', error);
    }


  };

  const orderPrepared = async (order: Order) => {
    try {
      const response = await fetch(`http://localhost:3696/seller/prepareOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order
        }),
      });
      
      if (response.ok) {
        const updatedOrder=await response.json();
        
        setOrders((prevOrders)=>{
          return prevOrders.map((order)=>{
            if(order._id===updatedOrder._id){
              return updatedOrder;
            }
            return order;
          })
        })

      } else {
        console.error('API call failed:', response.statusText);
      }
    } catch (error) {
      console.error('API call error:', error);
    }
  };

  const handOver = async (order: Order) => {
    try{
      //partner will enter the otp before picking up,seller will enter it
      const otp=prompt("Enter the otp");
      
      if(otp===order.partnerOtp){
          const response = await fetch(`http://localhost:3696/seller/handOverOrder`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              order
            }),
          });

          if(response.ok){
            const updatedOrder=await response.json();
        
            setOrders((prevOrders)=>{
              return prevOrders.map((order)=>{
                if(order._id===updatedOrder._id){
                  return updatedOrder;
                }
                return order;
              })
            })
          }

        return;
      }
      else{
        alert("Wrong OTP");
      }
    }
    catch{
      console.log("error");
    }
  }


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
                  <button className="rounded-button text-[#E1573A]" onClick={() => handleAccept(order)}>Accept</button>
                  <button className="rounded-button" onClick={() => handleDeny(order._id)}>Deny</button>
                </div>
              )}
               {order.status === 'forwarded' && (
                <div className="rounded-card bg-red mt-2 flex flex-row justify-around">
                  <button className="rounded-button text-[#E1573A]" onClick={()=>orderPrepared(order)}>Order prepared</button>
                </div>
              )}
               {order.status === 'prepared' && (
                <div className="rounded-card bg-red mt-2 flex flex-row justify-around">
                <button className="rounded-button text-[#E1573A]" onClick={()=>handOver(order)}>Hand over</button>
              </div>
              )}
               {order.status === 'handover' && (
                <div className="rounded-card bg-red mt-2 flex flex-row justify-around">
                Waiting to be delivered...
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
