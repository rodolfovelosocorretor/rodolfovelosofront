"use client"

import { useState } from "react"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface FiltroProps {
  onFiltroChange: (filtros: Record<string, string>) => void
}

export default function Filtro({ onFiltroChange }: FiltroProps) {
  const [filtros, setFiltros] = useState({
    tipo: '',
    finalidade: '',
    situacao: '',
    cidade: '',
    bairro: '',
    quartos: '',
    preco: ''
  })

  const handleFiltroChange = (key: string, value: string) => {
    let novosFiltros = { ...filtros, [key]: value }

    // Se mudar cidade, limpa bairro
    if (key === 'cidade' && value !== filtros.cidade) {
      novosFiltros = { ...novosFiltros, bairro: '' }
    }

    setFiltros(novosFiltros)
    onFiltroChange(novosFiltros)
  }

  const limparFiltros = () => {
    const filtrosVazios = {
      tipo: '',
      finalidade: '',
      situacao: '',
      cidade: '',
      bairro: '',
      quartos: '',
      preco: ''
    }

    setFiltros(filtrosVazios)
    onFiltroChange(filtrosVazios)
  }

  return (
    <div className="relative md:absolute left-1/2 -translate-x-1/2 translate-y-0 md:-translate-y-[33%] lg:-translate-y-1/2 w-full max-w-[900px] h-auto items-center rounded-2xl bg-white/30 backdrop-blur-md p-7 shadow-md flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-6 ">

      {/* Tipo */}
      <Select value={filtros.tipo} onValueChange={(value) => handleFiltroChange('tipo', value)}>
        <SelectTrigger className="w-full border border-black text-black data-[placeholder]:text-black [&>span]:text-black">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent className="text-black">
          <SelectItem value="casa">Casa</SelectItem>
          <SelectItem value="apartamento">Apartamento</SelectItem>
          <SelectItem value="cobertura">Cobertura</SelectItem>
          <SelectItem value="flat">Flat</SelectItem>
          <SelectItem value="comercial">Comercial</SelectItem>
          <SelectItem value="condominio fechado">Condomínio fechado</SelectItem>
          <SelectItem value="terreno">Terreno</SelectItem>
        </SelectContent>
      </Select>

      {/* Finalidade */}
      <Select value={filtros.finalidade} onValueChange={(value) => handleFiltroChange('finalidade', value)}>
        <SelectTrigger className="w-full border border-black text-black data-[placeholder]:text-black">
          <SelectValue placeholder="Finalidade" />
        </SelectTrigger>
        <SelectContent className="text-black border border-black">
          <SelectItem value="venda">Venda</SelectItem>
          <SelectItem value="aluguel">Aluguel</SelectItem>
          <SelectItem value="locacao">Locação</SelectItem>
          <SelectItem value="arrendar">Arrendar</SelectItem>
        </SelectContent>
      </Select>

      {/* Situação */}
      <Select value={filtros.situacao} onValueChange={(value) => handleFiltroChange('situacao', value)}>
        <SelectTrigger className="w-full border border-black text-black data-[placeholder]:text-black">
          <SelectValue placeholder="Situação" />
        </SelectTrigger>
        <SelectContent className="text-black border border-black">
          <SelectItem value="pronto">Pronto</SelectItem>
          <SelectItem value="construcao">Em Construção</SelectItem>
          <SelectItem value="lancamento">Lançamento</SelectItem>
          <SelectItem value="na_planta">Na Planta</SelectItem>
        </SelectContent>
      </Select>

      {/* Cidade */}
      <Select value={filtros.cidade} onValueChange={(value) => handleFiltroChange('cidade', value)}>
        <SelectTrigger className="w-full border border-black text-black data-[placeholder]:text-black">
          <SelectValue placeholder="Cidade" />
        </SelectTrigger>
        <SelectContent className="text-black border border-black">
          <SelectItem value="joao-pessoa">João Pessoa</SelectItem>
          <SelectItem value="cabedelo">cabedelo</SelectItem>
          <SelectItem value="conde">conde</SelectItem>
        </SelectContent>
      </Select>

      {/* Quartos */}
      <Select value={filtros.quartos} onValueChange={(value) => handleFiltroChange('quartos', value)}>
        <SelectTrigger className="w-full border border-black text-black data-[placeholder]:text-black">
          <SelectValue placeholder="Quartos" />
        </SelectTrigger>
        <SelectContent className="text-black border border-black">
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="5+">5+</SelectItem>
        </SelectContent>
      </Select>

      {/* Preço */}
      <Select value={filtros.preco} onValueChange={(value) => handleFiltroChange('preco', value)}>
        <SelectTrigger className="w-full border border-black text-black data-[placeholder]:text-black">
          <SelectValue placeholder="Preço" />
        </SelectTrigger>
        <SelectContent className="text-black border border-black">
          <SelectItem value="0-100">Menos de 100k</SelectItem>
          <SelectItem value="100-300">100k - 300k</SelectItem>
          <SelectItem value="300-600">300k - 600k</SelectItem>
          <SelectItem value="600-1000">600k - 1M</SelectItem>
          <SelectItem value="1000-2000">1M - 2M</SelectItem>
          <SelectItem value="2000+">Mais de 2M</SelectItem>
        </SelectContent>
      </Select>

      {/* Botão limpar */}
      <button
  onClick={limparFiltros}
  className="w-full border border-black text-black rounded-md h-10 px-2 text-sm bg-white/30 hover:bg-white/40 transition lg:col-start-3 lg:col-span-2"
>
  Limpar filtros
</button>

    </div>
  )
}