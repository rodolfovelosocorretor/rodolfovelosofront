"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsappButton() {
  const numero = "5583998463395"
  const mensagem = "Olá, tenho interesse em um imóvel"

  return (
    <a
      href={`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-4 right-4 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-green-500 hover:bg-green-600
        text-white shadow-lg
        transition
        md:hidden
      "
    >
      <MessageCircle size={28} />
    </a>
  )
}