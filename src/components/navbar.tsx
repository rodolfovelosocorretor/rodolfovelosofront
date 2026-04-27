import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle } from "lucide-react"

export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center py-6 px-4 lg:px-[200px] sm:px-6 md:px-8 ">
      
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

      {/* AÇÕES (BUSCA + WHATSAPP) */}
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