import React from 'react';

const LoginScreen = () => {
  return (
    <div className="flex flex-col bg-black justify-center items-center">
        <button
          className="w-full text-white text-inter font-bold text-left  ml-8 mt-[30px]"
        >
        &lt;   Home 
        </button>
      <div className=" flex flex-col p-8 gap-2 rounded-xl shadow-lg bg-white bg-opacity-5 md:px-24 w-4/5 md:w-auto mt-[50px]">
      
        <p className=" font-bold mb-4 text-center text-[#E1573A] font-inter  text-[20px] md:text-[25px]">Welcome Back!</p>
        <p className="mb-8 md:mb-4 text-center w-100 md:w-80 font-inter text-[12px] md:text-[15px]">We missed you! Please enter your details</p>
        <form className="flex flex-col space-y-6 mt-2">
          <div className="flex flex-col ">
            <label htmlFor="name" className="text-sm mb-1 ml-[8px]">
              Email
            </label>
            <input
              id="email"
              type="text"
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
          Don't have an account? <span className="text-[#4356FF]"> Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
