import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {MessageCircle} from 'lucide-react'

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center py-6 px-4 lg:px-[200px] 
      bg-gradient-to-b from-gray-100 to-white shadow-sm sm:px-6 md:px-8 ">

      {/* LOGO */}
      <div>
        <Image
          src="/logoHorizontalizada.PNG"
          alt="logo"
          width={180}
          height={60}
          className="h-auto w-auto"
        />
      </div>

      {/* BUSCA */}
      <div className="flex items-center gap-4 w-full max-w-md justify-end">
        <a
          href="/painel"
          className="hidden md:inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
        >
          Painel Admin
        </a>

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