import Image from 'next/image'
import Chat from "@/app/chat/page";
import Hero from './hero/page';
import Cart from './cart/page';
import Checkout from './checkout/page';
import OrderDetail from './order_detail/page';
import Availibility from './availability/page';
import Seller from './seller/page';

export default function Home() {
  return (    
    <main className="overflow-hidden">
     <Hero/>
    </main>
  )
}
