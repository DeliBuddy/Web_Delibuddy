"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { useDispatch } from 'react-redux';
import { setUser,User } from '@/app/userSlice';


const LoginDelibuddy = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const formData = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    try {
      const response = await fetch('http://localhost:3696/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Login successful');
        const { user } = await response.json();
          const userData:User={
            _id:user._id,
            name:user.name,
            email:user.email,
          }
          dispatch(setUser(userData));
          router.push('/partner'); 
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error sending login data', error);
    }
  };
  

  return (
    <div className="flex flex-col overflow-hidden h-screen items-center bg-[url('/bg.png')] bg-cover bg-no-repeat bg-center py-4">
    <div className='md:block hidden  ml-10  w-full'>
    <Link href='/hero'>
         <Image src="/homebutton.png" width={100} height={100} alt="Home" className='rounded-xl' />
    </Link>
     </div>
   <div className=" flex flex-col p-8 rounded-xl shadow-xl bg-white bg-opacity-5 md:px-24 w-4/5 md:w-auto mt-[50px]">
      
        <p className=" font-bold mb-4 text-center text-[#E1573A] font-inter  text-[20px] md:text-[25px]">Welcome Back!</p>
        <p className="mb-8 md:mb-4 text-center w-100 md:w-80 font-inter text-[12px] md:text-[15px]">We missed you! Please enter your details</p>
        <form className="flex flex-col space-y-6 mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <label htmlFor="name" className="text-sm mb-1 ml-[8px]">
              Email
            </label>
            <input
              id="email"
              type="text"
              ref={emailRef}
              placeholder="Please enter your email"
              className="px-4 py-2 bg-transparent rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[12px] md:text-[16px]"
            />
          </div>
         
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
              className="px-4 py-2 bg-transparent rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[12px] md:text-[16px]"
            />
          </div>
          <div className="flex flex-row justify-between text-[12px]">
           <div className='flex gap-2'>
           <input type='checkbox' id='remember' name='remember' value='remember'/>
                <label> Remember Me</label>
           </div>
            
            <p>Forgot Password?</p>
          </div>
          <button
            className="bg-[#E1573A] text-white px-6 py-4 rounded-xl shadow  "
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p className="text-center  text-white font-inter mt-4  font-bold text-[12px] md:text-[16px]">
          Don't have an account? <span className="text-[#4356FF]"> 
          
         <Link href='/registration'>Sign up</Link> </span>
        </p>

      
      </div>
    </div>
  );
};

export default LoginDelibuddy;
