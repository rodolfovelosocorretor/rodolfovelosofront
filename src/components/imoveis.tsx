"use client"

import Image from "next/image"
import { MapPin, BedDouble, Bath, Car, Maximize2 } from 'lucide-react'
import Link from "next/link"

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
  finalidade: string
  status: string
  imagem: string
  situacao?: string
  previsao?: string
  descricao?: string
  imagens?: string[]
}

interface ImoveisGridProps {
  imoveis: Imovel[]
}

export default function ImoveisGrid({ imoveis }: ImoveisGridProps) {
  return (
    <div className="px-4 md:px-8 py-10 lg:px-[200px]">

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-rows-fr">

        {imoveis.map((imovel) => (
          <Link key={imovel.id} href={`/imovel/${imovel.id}`} className="h-full">

            <div className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition cursor-pointer h-full flex flex-col">

              {/* Imagem */}
              <div className="relative h-48 w-full">
                <Image
                  src={imovel.imagem || '/imovel1.jpg'}
                  alt={imovel.titulo}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-4 flex flex-col gap-2 flex-1">

                {/* Localização */}
                <p className="flex items-center gap-2 text-[12px] text-gray-600">
                  <MapPin className="w-3 h-3" />
                  {imovel.bairro?.toUpperCase()} - {imovel.cidade?.toUpperCase()}
                </p>

                {/* Título (fixo em 2 linhas) */}
                <h2 className="text-lg font-semibold line-clamp-2 min-h-[3rem]">
                  {imovel.titulo}
                </h2>

                {/* Infos */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                  <p className="flex items-center gap-1">
                    <BedDouble className="w-4 h-4" strokeWidth={1} />
                    {imovel.quartos}
                  </p>
                  <p className="flex items-center gap-1">
                    <Bath className="w-4 h-4" strokeWidth={1} />
                    {imovel.banheiros}
                  </p>
                  <p className="flex items-center gap-1">
                    <Car className="w-4 h-4" strokeWidth={1} />
                    {imovel.vagas}
                  </p>
                  <p className="flex items-center gap-1">
                    <Maximize2 className="w-4 h-4" strokeWidth={1} />
                    {imovel.metragem} m²
                  </p>
                </div>

                <hr className="my-4 border-gray-200" />

                {/* Preço sempre embaixo */}
                <div className="mt-auto">
                  <p className="text-xs text-gray-500">
                    {imovel.finalidade.toUpperCase()}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    R$ {imovel.preco.toLocaleString()}
                  </p>
                </div>

              </div>
            </div>

          </Link>
        ))}

      </div>

    </div>
  )
}