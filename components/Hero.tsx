import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-[url('/bg.png')]">
      <div className="flex flex-col md:flex-row justify-between items-center px-20 py-8 ">
        <div>
          <Image src="/logo.png" width={200} height={40} alt="Logo" />
        </div>
        <div className="flex items-center gap-10 mt-8 md:mt-0">
        <div className="font-inter font-extrabold mr-4 text-[12px] md:text-[16px]">Contact Us</div>
        <div className=" block md:hidden text-[#E1573A] font-inter font-extrabold mr-4 text-[12px] md:text-[16px]">Log In</div>
          <button className="hidden md:block bg-[#E1573A] font-inter font-extrabold rounded-lg px-4 py-2">
            Log In
          </button>
        </div>
      </div>

      <div className="mid px-[80px]  mt-[80px]  ">
        <Image src="/help.png" width={180} height={35} alt="Help" />
        <Image className="mt-[5px]" src="/logo.png" width={180} height={35} alt="Logo" />
        <div className="font-inter font-bold md:mr-20 md:w-1/4 text-[18px] mt-[30px]">
          Get Medicines, Food, Groceries and much more, delivered to you by your DeliBuddies!
        </div>

        <button className="w-full md:w-auto bg-[#E1573A] font-inter font-extrabold rounded-lg px-10 py-4 mt-[30px]">
          Join DeliBuddy
        </button>
      </div>

      <div className="bottom flex flex-col rounded-t-lg w-90vw md:mx-[40px] px-8 md:px-24 py-14 mt-[100px]">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Image src="/whatsapp.png" width={35} height={35} alt="Whatsapp" />
              <div className="text-[12px] md:text-[16px] font-inter font-bold w-4/5 text-center md:text-left ">
                9958904763
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <Image src="/email.png" width={35} height={35} alt="Whatsapp" />
              <div className="font-inter font-bold text-[12px] w-4/5 md:text-auto text-center md:text-left md:text-[16px]">
                delibuddy.co.in@gmail.com
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <Image src="/location.png" width={35} height={35} alt="Whatsapp" />
              <div className="text-center md:text-left font-inter font-bold w-4/5 md:w-2/5 text-[12px] md:text-[16px] ">
                Shiv Nadar University
                Tehsil Dadri, Greater Noida
                Uttar Pradesh, 201314.
              </div>
            </div>
          </div>

          <div className="md:mt-0 mt-10 flex flex-row gap-6">
            <Image src="/instagram.png" width={45} height={45} alt="Whatsapp" />
            <Image src="/linkedin.png" width={45} height={45} alt="Whatsapp" />
          </div>
        </div>

        <div className="mx-auto font-inter font-bold text-center text-[11px] md:text-[15px] mt-[60px]">
          Copyright Delibuddy.in   All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Hero;
