'use client';
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

interface Order {
  _id: string;
  user_id: string;
  seller_id: string;
  items: string[];
  total_price: number | null;
  status: string;
}

interface OrderListProps {
  seller: string;
}

const OrderList: React.FC<OrderListProps> = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const socket = socketIOClient('http://localhost:3696'); // Replace with your WebSocket server URL

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`http://localhost:3696/order/getOrders?seller=Mahesh`);
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
    socket.emit('joinSellerRoom', "Mahesh");

    socket.on('orderCreated', (newOrder: Order) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]);
      console.log("new order created");
      console.log(orders); // Note that this may not display the updated orders immediately
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      <h2>Orders </h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.user_id} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
