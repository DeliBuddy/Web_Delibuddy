import React from 'react';
import Image from 'next/image';
const Shop = () => {
  const shops = [
    { name: 'Shop 1', image: '/shop.png' },
    { name: 'Shop 2', image: '/shop.png' },
    { name: 'Shop 3', image: '/shop.png' },
    { name: 'Shop 4', image: '/shop.png' },
    { name: 'Shop 5', image: '/shop.png' },
    { name: 'Shop 6', image: '/shop.png' },
    { name: 'Shop 7', image: '/shop.png' },
    { name: 'Shop 8', image: '/shop.png' },
  ];

  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-no-repeat bg-center py-4">
        <div className='md:block hidden  ml-10'>
            <Image src="/home.png" width={100} height={100} alt="Home" className='rounded-xl' />
        </div>
        <div className="md:hidden block font-inter font-bold flex flex-col items-center justify-center mt-4 text-[20px]">
            <Image src="/logo.png" width={200} height={200} alt="Logo"></Image>
            <div className='mt-10'>Home</div>
        </div>
    <div className="flex flex-wrap gap-8 md:gap-16 justify-center mt-10 px-10 w-full mx-auto ">
      {shops.map((shop, index) => (
          <div className="flex flex-row md:flex-col w-4/5 md:w-auto justify-start gap-4 items-center  bg-gradient-to-bl from-[#000000] from-50% to-[#656565] to-100% py-4 px-4 rounded-xl " key={index}>
          <img src={shop.image}  alt="Shop" className='rounded-xl h-[50px] w-[50px] md:h-[200px] md:w-[200px]' />
        <div className='flex flex-col items-start md:items-center justify-start'>

          <div className="text-center font-inter text-white font-bold ">{shop.name}</div>
          <div className='text-[12px] text-[#E1573A] font-bold mt-1'>OPEN</div>
        </div>
        </div>
      ))}
      <div className='font-inter font-bold  w-full flex justify-center'>
        Need help?&nbsp;<span className='font-inter font-bold text-[#E1573A]'> Contact us</span>
    </div>
    </div>
    
      </div>
  );
};

export default Shop;
