"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import NavbarSecundary from "@/components/navbarSecundary"
import {
  MapPin,
  BedDouble,
  Bath,
  Car,
  Maximize2,
  MapPinCheckInside,
  Calendar,
  Map,
  HandCoins,
} from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Footer from "@/components/footer"

interface Imovel {
  id: number
  titulo: string
  preco: number
  cidade: string
  bairro: string
  quartos: number
  banheiros: number
  vagas: number
  metragem: number
  imovel: string
  tipo: string
  imagem: string
  situacao?: string
  previsao?: string
  descricao?: string
  imagens?: string[]
}

// 🔥 variável de ambiente + fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://rodolfo-backend-1.onrender.com"

export default function ImovelPage() {
  const params = useParams()
  const id = params?.id as string

  const [imovel, setImovel] = useState<Imovel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imagemAtual, setImagemAtual] = useState('')

  // 🔥 evita render quebrado
  if (!id) {
    return (
      <div className="p-10 text-center">
        <h1>ID do imóvel não encontrado.</h1>
      </div>
    )
  }

  // 🚀 FETCH COM PROTEÇÃO
  useEffect(() => {
    async function fetchImovel() {
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 10000)

        const response = await fetch(`${API_URL}/api/imoveis/${id}/`, {
          signal: controller.signal
        })

        clearTimeout(timeout)

        if (!response.ok) {
          throw new Error('Imóvel não encontrado')
        }

        const data = await response.json()
        setImovel(data)

      } catch (err) {
        console.error(err)
        setError('Servidor demorou ou imóvel não encontrado.')
      } finally {
        setLoading(false)
      }
    }

    fetchImovel()
  }, [id])

  // 🔥 define imagem principal com segurança
  useEffect(() => {
    if (!imovel) return

    const imagens =
      imovel.imagens && imovel.imagens.length > 0
        ? imovel.imagens
        : imovel.imagem
        ? [imovel.imagem]
        : []

    setImagemAtual(imagens[0] || '')
  }, [imovel])

  if (loading) {
    return (
      <div className="p-10 text-center">
        <h1>Carregando imóvel...</h1>
      </div>
    )
  }

  if (error || !imovel) {
    return (
      <div className="p-10 text-center">
        <h1>{error || 'Imóvel não encontrado'}</h1>
      </div>
    )
  }

  const imagens =
    imovel.imagens && imovel.imagens.length > 0
      ? imovel.imagens
      : imovel.imagem
      ? [imovel.imagem]
      : []

  return (
    <div>
      <NavbarSecundary />

      <div className="text-center pt-9 max-w-[1100px] mx-auto mt-6 px-4">
        <h1 className="text-4xl">{imovel.titulo}</h1>
      </div>

      <div className="max-w-[1100px] mx-auto mt-6 px-4">
        <div className="max-w-6xl mx-auto">

          {/* 🔥 imagem principal */}
          <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
            {imagemAtual ? (
              <Image
                src={imagemAtual}
                alt="Imagem principal"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                Imagem indisponível
              </div>
            )}
          </div>

          {/* 🔥 miniaturas */}
          {imagens.length > 0 && (
            <div className="mt-4">
              <Carousel opts={{ align: "start" }} className="w-full px-6">
                <CarouselContent>
                  {imagens.map((img, index) => (
                    <CarouselItem key={index} className="basis-[100px] pl-2">
                      <div
                        onClick={() => setImagemAtual(img)}
                        className="relative w-full h-[80px] rounded-lg overflow-hidden cursor-pointer border"
                      >
                        <Image
                          src={img}
                          alt={`Imagem ${index + 1}`}
                          width={100}
                          height={80}
                          unoptimized
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {imagens.length > 4 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            </div>
          )}
        </div>

        {/* 🔥 informações */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-3xl font-bold text-primary">
              R$ {imovel.preco.toLocaleString('pt-BR')}
            </h2>

            <p className="flex items-center gap-2 text-gray-600 mt-2">
              <MapPin className="w-4 h-4" />
              {imovel.bairro} - {imovel.cidade}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                <BedDouble />
                <span>{imovel.quartos} quartos</span>
              </div>

              <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                <Bath />
                <span>{imovel.banheiros} banheiros</span>
              </div>

              <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                <Car />
                <span>{imovel.vagas} vagas</span>
              </div>

              <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                <Maximize2 />
                <span>{imovel.metragem} m²</span>
              </div>

              <div className="flex flex-col items-center text-center bg-gray-50 p-3 rounded-lg">
                {imovel.situacao === "construcao" ? (
                  <>
                    <Calendar />
                    <span>Em construção</span>
                  </>
                ) : (
                  <>
                    <MapPinCheckInside />
                    <span>{imovel.situacao || "Pronto"}</span>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                <MapPin />
                <span>{imovel.bairro}</span>
              </div>

              <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                <Map />
                <span>
                  {imovel.cidade === "Mediaçoes"
                    ? "Mediações de João Pessoa"
                    : imovel.cidade}
                </span>
              </div>

              <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                <HandCoins />
                <span>{imovel.tipo}</span>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-3">Descrição</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {imovel.descricao ||
                'Este imóvel possui excelente localização, acabamento moderno e ótimo custo-benefício.'}
            </p>
          </div>

        </div>

        {/* 🔥 botão whatsapp seguro */}
        <a
          href={`https://wa.me/5583999883708?text=${encodeURIComponent(`Tenho interesse no imóvel: ${imovel.titulo}`)}`}
          target="_blank"
          className="block mt-6 w-1/2 text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition mx-auto"
        >
          Falar no WhatsApp
        </a>
      </div>

      <Footer />
    </div>
  )
}