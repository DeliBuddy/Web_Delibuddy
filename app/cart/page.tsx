import React from 'react'
import Image from 'next/image'

const items = [
    {
      name: 'Paneer Kathi Roll',
      quantity: 5,
      price: 99,
    },
    {
      name: 'Chicken Biryani',
      quantity: 3,
      price: 150,
    },
    {
      name: 'Vegetable Pulao',
      quantity: 2,
      price: 80,
    },
  ];
  

const Card = () => {
  return (
    <div className="flex flex-col fixed inset-0 overflow-y-auto bg-[url('/bg.png')] md:h-screen overflow-hidden bg-cover bg-no-repeat bg-center items-center ">
         <div className='md:block hidden  ml-10  w-full mt-4'>
            <Image src="/backbutton.png" width={100} height={100} alt="Home" className='rounded-xl' />
        </div>
        <div className="md:hidden block font-inter font-bold flex flex-col items-center justify-center mt-4 text-[20px]">
            <Image src="/logo.png" width={200} height={200} alt="Logo"></Image>
        </div>
        <div className='flex flex-col mx-auto mt-10 w-3/4 md:w-1/3'>
            <div className='font-inter text-[#E1573A] font-bold text-[20px] text-center md:text-left'>
                Your Order
            </div>

            <div className="flex flex-row w-full font-bold text-[16px] md:text-[18px] text-[#737373] mt-10 mb-4">
            <p  className='' style={{width:'70%'}}>
                Items
            </p>
            <div className='flex flex-row' style={{width:'30%'}}>
            <p className='text-center' style={{width:'50%'}}>
                Qty.
            </p>
            <p className='text-center' style={{width:'55%'}}>
                Price
            </p>
            </div>
           
            </div>
            <div className='flex flex-col gap-4'>
  {items.map((item, index) => (
    <div className="flex flex-row w-full font-bold text-[16px] md:text-[18px] text-white" key={index}>
      <p style={{ width: '70%' }}>
        {item.name}
      </p>
      <div className='flex flex-row' style={{ width: '30%' }}>
        <p className='text-center' style={{ width: '50%' }}>
          {item.quantity}
        </p>
        <p className='text-center' style={{ width: '55%' }}>
          {item.price}
        </p>
      </div>
    </div>
  ))}
</div>

            <div className="border-t border-[#575757] my-8"></div>
            <div className="flex flex-row w-full font-bold text-[16px] md:text-[18px] text-[#737373] ">
            <p  className='' style={{width:'70%'}}>
                Total
            </p>
            <div className='flex flex-row' style={{width:'30%'}}>
            <p className='text-center' style={{width:'50%'}}>
                3
            </p>
            <p className='text-center' style={{width:'55%'}}>
                340
            </p>
            </div>
           
            </div>

            <div className="flex flex-row w-full font-bold text-[14px] md:text-[16px] text-[#737373] ">
            <p  className='' style={{width:'70%'}}>
                Delivery and Convenience Fee
            </p>
            <div className='flex flex-row' style={{width:'30%'}}>
            <p className='text-center' style={{width:'50%'}}>
                
            </p>
            <p className='text-center' style={{width:'55%'}}>
                340
            </p>
            </div>
           
            </div>

            <div className="border-t-2 border-[#FFFFFF] my-8"></div>

            <div className="flex flex-row w-full font-bold text-[20px] text-[#FFFFFF] ">
            <p  className='' style={{width:'70%'}}>
                Grand Total
            </p>
            <div className='flex flex-row' style={{width:'30%'}}>
            <p className='text-center' style={{width:'50%'}}>
                
            </p>
            <p className='text-center' style={{width:'55%'}}>
                340
            </p>
            </div>
           
            </div>

            
        <button className=" w-full bg-[#E1573A] font-inter font-extrabold rounded-lg px-16 md:px-10 py-3 mt-10 text-[18px] mb-4">
         Proceed to Pay
        </button>
        </div>
    </div>
  )
}

export default Card