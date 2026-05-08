import Image from "next/image"
import { Button } from "@/components/ui/button"
import {MessageCircle} from 'lucide-react'
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center py-6 px-4 lg:px-[200px] 
      bg-gradient-to-b from-gray-100 to-white shadow-sm sm:px-6 md:px-8 ">

      {/* LOGO */}
      <Link href="/">
        <div className="cursor-pointer">
          <Image
            src="/logoHorizontalizada.PNG"
            alt="logo"
            width={180}
            height={60}
            className="h-auto w-auto"
          />
        </div>
      </Link>

      {/* BUSCA */}
      <div className="flex items-center gap-4 w-full max-w-md justify-end">
        

        {/* BOTÃO WHATSAPP */}
        <a
          href="https://wa.me/5583998463395?text=Olá, tenho interesse em um imóvel!"
          target="_blank"
          className="hidden md:flex"
        >
          <Button className="h-12 px-12 bg-green-600 hover:bg-green-700 text-white rounded-2xl">
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </Button>
        </a>
      </div>

    </div>
  )
}