'use client'
import React,{useState} from 'react'
import Image from 'next/image'
import {useSelector} from 'react-redux';
import {RootState} from '@/app/store';
import { useRouter } from 'next/navigation';


  


const OrderDetail = () => {
  const [orderItems, setOrderItems] = useState<string[]>(['']);
  const router = useRouter();
  
  //user and seller should be Typescript compatible
  const user= useSelector((state:RootState)=>state.user.user);
  const seller= useSelector((state:RootState)=>state.seller.seller);

  const addOrderItem = () => {
    setOrderItems([...orderItems, '']);
  };

  const handleOrderItemChange = (index: number, value: string) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = value;
    setOrderItems(updatedItems);
  };

  const handleCheckout = async (event:any) => {
    event.preventDefault();
    console.log("Order:");
   
    const order={
      user:user,
      seller:seller,
      items:orderItems,
      status:"pending"
    }

    console.log(order);

    try{
      const response = await fetch('http://localhost:3696/order/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        console.log('Order successful');
        router.push('/availibility');
      } else {
        console.log('Order failed');
      }
    }catch(error){
      console.error('Error sending order data', error);
    }

    
  };
  
  return (
    <div className="bg-[url('/bg.png')] md:h-screen overflow-hidden bg-cover bg-no-repeat bg-center items-center ">
         <div className='md:block hidden  ml-10  w-full mt-10'>
            <Image src="/homebutton.png" width={100} height={100} alt="Home" className='rounded-xl' />
        </div>
        <div className="md:hidden  font-inter font-bold flex flex-col items-center justify-center mt-4 text-[20px]">
            <Image src="/logo.png" width={200} height={200} alt="Logo"></Image>
            <div className='mt-10'>Menu</div>
        </div>
        <form className="flex flex-col space-y-6 mt-2  items-center justify-center w-auto" >
        {orderItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-1/2">
            <input
              type="text"
              placeholder={`Item ${index + 1}`}
              value={item}
              onChange={(e) => handleOrderItemChange(index, e.target.value)}
              className="px-4 py-2 bg-transparent rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[12px] md:text-[16px]  w-full"
            />
          </div>
        ))}
       <div className='w-1/2 gap-3 flex flex-row justify-end'>
       <button
          type="button"
          className="bg-[#E1573A] font-inter font-extrabold rounded-lg px-16 md:px-10 py-2"
          onClick={addOrderItem}
        >
          Add
        </button>
        <button className=" md:w-auto bg-[#E1573A] font-inter font-extrabold rounded-lg px-16 md:px-10 py-2" onClick={handleCheckout}>
          Checkout
        </button>
       </div>
          </form>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 justify-center flex-wrap mt-10">
        
      
        
      
      
          
         
     
      <div className='font-inter font-bold  w-full flex justify-center mt-4 md:mt-16
      '>
        Need help?&nbsp;<span className='font-inter font-bold text-[#E1573A]'> Contact us</span>
    </div>
      </div>
    </div>
  )
}

{/* {boxes.map((box) => (
          <Box key={box.id} title={box.title} />
        ))} */}
export default OrderDetail