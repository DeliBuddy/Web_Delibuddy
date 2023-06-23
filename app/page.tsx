import Image from 'next/image'
import {Hero,Menu,Cart,Checkout} from '@/app/pages'



export default function Home() {
  return (
    <main className="overflow-hidden">
     <Checkout/>
    </main>
  )
}
