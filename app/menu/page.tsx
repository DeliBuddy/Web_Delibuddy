import React from 'react'
import Image from 'next/image'

type BoxProps = {
    title: string; // Specify the datatype of 'title' as string
};

const Box: React.FC<BoxProps> = ({ title }) => {
    return (
      <div className="flex items-center justify-between  w-3/4 py-4 md:w-1/3 rounded md:py-4 px-4 bg-gradient-to-bl from-[#000000] from-50% to-[#656565] to-100% opacity-50">
        <h2 className="font-inter text-[18px] font-bold text-white">{title}</h2>
        <input type="checkbox" className="h-4 w-4" />
       
      </div>
    );
  };

  const boxes = [
    { id: 1, title: 'Paneer Kathi Roll' },
    { id: 2, title: 'Paneer Kathi Roll' },
    { id: 3, title: 'Paneer Kathi Roll' },
    { id: 4, title: 'Paneer Kathi Roll' },
    { id: 5, title: 'Paneer Kathi Roll' },
    { id: 6, title: 'Paneer Kathi Roll' },
    // Add more boxes as needed
  ];


const Menu = () => {
  return (
    <div className="bg-[url('/bg.png')] md:h-screen overflow-hidden bg-cover bg-no-repeat bg-center items-center ">
         <div className='md:block hidden  ml-10  w-full mt-10'>
            <Image src="/homebutton.png" width={100} height={100} alt="Home" className='rounded-xl' />
        </div>
        <div className="md:hidden block font-inter font-bold flex flex-col items-center justify-center mt-4 text-[20px]">
            <Image src="/logo.png" width={200} height={200} alt="Logo"></Image>
            <div className='mt-10'>Menu</div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 justify-center flex-wrap mt-10">
        {boxes.map((box) => (
          <Box key={box.id} title={box.title} />
        ))}
       <div className="none md:invisible w-1/3 ">
      </div>  
      <div className='w-full md:w-1/3 self-end flex flex-col md:flex-row justify-end items-center gap-4 md:gap-20 font-inter font-bold'>
          <div>2 items in cart</div>
          <button className=" md:w-auto bg-[#E1573A] font-inter font-extrabold rounded-lg px-16 md:px-10 py-2">
          Checkout
        </button>
      </div>
      <div className='font-inter font-bold  w-full flex justify-center mt-4 md:mt-16
      '>
        Need help?&nbsp;<span className='font-inter font-bold text-[#E1573A]'> Contact us</span>
    </div>
      </div>
    </div>
  )
}

export default Menu