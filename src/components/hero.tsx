"use client"

import Image from "next/image"

export default function Hero() {
  const scrollToImoveis = () => {
    const section = document.getElementById("imoveis")

    if (section) {
      const offset = 100
      const top = section.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({
        top,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative w-full h-[90vh] flex items-center overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
            src="/fundoHero.png"
            alt="Fundo"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105 blur-sm"
            />
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* CONTEÚDO */}
      <div className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="max-w-xl text-left text-white">
          
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Encontre o imóvel perfeito para viver seus melhores momentos
          </h1>

          <p className="mt-4 text-gray-200">
            Casas, apartamentos e investimentos com as melhores oportunidades de João Pessoa.
          </p>

          {/* BOTÃO */}
          <button
            onClick={scrollToImoveis}
            className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            Ver imóveis
          </button>

        </div>
      </div>

    </section>
  )
}