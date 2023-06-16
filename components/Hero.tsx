import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-[url('/bg.png')]">
    <div className="flex justify-between items-center px-20 py-8 ">
      <div>
        <Image src="/logo.png" width={200} height={40} alt="Logo" />
      </div>
      <div className="flex items-center gap-10">
        <div className="font-inter font-extrabold mr-4">Contact Us</div>
        <button className="bg-[#E1573A] font-inter font-extrabold rounded-lg px-4 py-2">
          Log In
        </button>
      </div>
    </div>

    <div className="mid ml-20 mt-[100px]">
        <Image src="/help.png" width={180} height={35} alt="Help"/>
        <Image className="mt-[5px]" src="/logo.png" width={180} height={35} alt="Logo"/>
        <div className="font-inter font-bold w-1/4 text-[18px] mt-[30px]">
        Get Medicines, Food, Groceries and much more, delivered to you by your DeliBuddies!
        </div>

        <button className="bg-[#E1573A] font-inter font-extrabold rounded-lg px-10 py-4 mt-[30px]">
          Join DeliBuddy
        </button>
    </div>
    <div className="flex flex-col  rounded-t-lg w-90vw mx-[40px] px-24 py-14 mt-[100px]">
    <div className=" flex flex-row justify-between items-center ">
    <div className="flex flex-col  gap-8" >
        <div className="flex flex-row items-center gap-4">
        <Image src="/whatsapp.png" width={35} height={35} alt="Whatsapp"/>
        <div className="font-inter font-bold text-[16px]">
            9958904763
        </div>
        </div>

        <div className="flex flex-row items-center gap-4">
        <Image src="/email.png" width={35} height={35} alt="Whatsapp"/>
        <div className="font-inter font-bold text-[16px]">
            delibuddy.co.in@gmail.com
        </div>
        </div>

        <div className="flex flex-row items-center gap-4">
        <Image src="/location.png" width={35} height={35} alt="Whatsapp"/>
        <div className="font-inter font-bold w-2/5 text-[16px]">
        Shiv Nadar University
Tehsil Dadri, Greater Noida
Uttar Pradesh, 201314.
        </div>
        </div>
    </div>

    <div className="flex flex-row gap-6">
        <Image src="/instagram.png" width={45} height={45} alt="Whatsapp"/>
        <Image src="/linkedin.png" width={45} height={45} alt="Whatsapp"/>
    </div>

    </div>
    <div className="mx-auto font-inter font-bold text-[15px] mt-[60px]">
    Copyright Delibuddy.in   All Rights Reserved
    </div>
    </div>
    </div>
  );
};

export default Hero;