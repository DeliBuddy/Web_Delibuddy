'use client';
import React, { useEffect,useState } from 'react';
import Image from 'next/image';
import {useSelector} from 'react-redux';
import {RootState} from '@/app/store';

import { useDispatch } from 'react-redux';
import { setSeller } from '@/app/sellerSlice';
import { useRouter } from 'next/navigation';

interface Seller {
  _id: string,
  name: string;
  email: string;
};



const Shop = () => {
  // const user=useSelector((state:RootState)=>state.user.user);
  // console.log(user);

  const dispatch = useDispatch();
  const router = useRouter();
  // const shops = [
  //   { name: 'Shop 1', image: '/shop.png' ,key:'Shop 1'},
  //   { name: 'Shop 2', image: '/shop.png' ,key:'Shop 2'},
  //   { name: 'Shop 3', image: '/shop.png' ,key:'Shop 3'},
  //   { name: 'Shop 4', image: '/shop.png' ,key:'Shop 4'},
  //   { name: 'Shop 5', image: '/shop.png' ,key:'Shop 5'},
  //   { name: 'Shop 6', image: '/shop.png' ,key:'Shop 6'},
  //   { name: 'Shop 7', image: '/shop.png' ,key:'Shop 7'},
  //   { name: 'Shop 8', image: '/shop.png' ,key:'Shop 8'},
  // ];
  //create setState for shops list
  const [shops, setShops] = useState<Seller[]>([]);

  useEffect(() => {
    async function fetchShops() {
      try {
        //add access token to the header
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3696/seller/getSellers`
          , {
            method: 'GET',
            headers: {
              token: token!,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setShops(data);
        } else {
          console.error('Error fetching orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchShops();
  }, []);

  const handleShopClick = (seller: Seller) => () => {
    //extract only the _id,email,name from the seller object

    const { _id, email, name } = seller;
    const sellerData = {
      _id:_id.toString(),
      email,
      name,
    }
    dispatch(setSeller(sellerData));
    router.push('/order_detail');

  };



  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-no-repeat bg-center py-4 h-[100vh]">
        <div className='md:block hidden  ml-10'>
            <Image src="/homebutton.png" width={100} height={100} alt="Home" className='rounded-xl' />
        </div>
        <div className="md:hidden  font-inter font-bold flex flex-col items-center justify-center mt-4 text-[20px]">
            <Image src="/logo.png" width={200} height={200} alt="Logo"></Image>
            <div className='mt-10'>Home</div>
        </div>
    <div className="flex flex-wrap gap-8 md:gap-16 justify-center mt-10 px-10 w-full mx-auto ">
      {shops.map((shop, index) => (
          <div className="flex flex-row md:flex-col w-4/5 md:w-auto justify-start gap-4 items-center  bg-gradient-to-bl from-[#000000] from-50% to-[#656565] to-100% py-4 px-4 rounded-xl " key={index} onClick={handleShopClick(shop)}>
          <img src='/shop.png'  alt="Shop" className='rounded-xl h-[50px] w-[50px] md:h-[200px] md:w-[200px]' />
        <div className='flex flex-col items-start md:items-center justify-start'>
u
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
