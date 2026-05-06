'use client'

import { useState, useMemo, useEffect } from "react"
import Navbar from "@/components/navbar"
import Filtro from "@/components/filter"
import ImoveisGrid from "@/components/imoveis"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/buttonWhatsapp"

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


const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://rodolfo-backend-1.onrender.com"

export default function Home() {

    const [imoveis, setImoveis] = useState<Imovel[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filtros, setFiltros] = useState({
        tipo: '',
        finalidade: '',
        situacao: '',
        cidade: '',
        bairro: '',
        quartos: '',
        preco: ''
    })

    // 🚀 FETCH COM PROTEÇÃO (timeout + erro)
    useEffect(() => {
        async function fetchImoveis() {
            try {
                const controller = new AbortController()
                const timeout = setTimeout(() => controller.abort(), 10000)

                const response = await fetch(`${API_URL}/api/imoveis/`, {
                    signal: controller.signal
                })

                clearTimeout(timeout)

                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor')
                }

                const data = await response.json()

                // 🔥 suporta API com ou sem "results"
                setImoveis(data.results || data)

            } catch (error) {
                console.error('Erro ao carregar imóveis:', error)
                setError('Servidor demorou ou falhou. Tente novamente.')
            } finally {
                setLoading(false)
            }
        }

        fetchImoveis()
    }, [])

    // 🔎 DEBUG
    useEffect(() => {
        if (imoveis.length > 0) {
            console.log('Imóveis carregados:', imoveis)
        }
    }, [imoveis])

    const imoveisFiltrados = useMemo(() => {
        return imoveis.filter(imovel => {

            if (filtros.tipo && imovel.tipo !== filtros.tipo) return false

            if (filtros.finalidade && imovel.finalidade !== filtros.finalidade) return false

            // 🔥 corrigido (antes comparava com status)
            if (filtros.situacao && imovel.situacao !== filtros.situacao) return false

            if (filtros.cidade) {
                const cidadeNormalizada = imovel.cidade
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '-')
                    .trim()

                if (cidadeNormalizada !== filtros.cidade) return false
            }

            if (filtros.bairro && imovel.bairro !== filtros.bairro) return false

            if (filtros.quartos) {
                if (filtros.quartos === '5+') {
                    if (imovel.quartos < 5) return false
                } else {
                    const quartosValue = parseInt(filtros.quartos)
                    if (imovel.quartos !== quartosValue) return false
                }
            }

            if (filtros.preco) {
                const preco = imovel.preco
                let precoValido = false

                switch (filtros.preco) {
                    case '0-100':
                        precoValido = preco < 100000
                        break
                    case '100-300':
                        precoValido = preco >= 100000 && preco <= 300000
                        break
                    case '300-600':
                        precoValido = preco >= 300000 && preco <= 600000
                        break
                    case '600-1000':
                        precoValido = preco >= 600000 && preco <= 1000000
                        break
                    case '1000-2000':
                        precoValido = preco >= 1000000 && preco <= 2000000
                        break
                    case '2000+':
                        precoValido = preco >= 2000000
                        break
                }

                if (!precoValido) return false
            }

            return true
        })
    }, [filtros, imoveis])

    const handleFiltroChange = (novoFiltro: Partial<typeof filtros>) => {
        setFiltros(prev => ({ ...prev, ...novoFiltro }))
    }

    return (
        <div className="lg:relative">
            <Navbar />
            <Hero />
            <Filtro onFiltroChange={handleFiltroChange} />

            <div className="mt-25 lg:px-[200px] text-[rgb(8,150,67)] font-bold py-6 px-4 sm:px-6 md:px-8" id="imoveis">
                <span className="text-[15px]">
                    Portfólio
                    <h1 className="text-[48px]">Imóveis Disponíveis</h1>
                </span>

                <p className="text-[16px] text-gray-600 font-normal mt-2">
                    {imoveisFiltrados.length} imóvel{imoveisFiltrados.length !== 1 && imoveisFiltrados.length > 0 ? 'is' : ''} encontrado{imoveisFiltrados.length !== 1 ? 's' : ''}
                </p>
            </div>

            {loading ? (
                <div className="p-10 text-center text-gray-600">
                    Carregando imóveis...
                </div>
            ) : error ? (
                <div className="p-10 text-center text-red-600">
                    {error}
                </div>
            ) : (
                <ImoveisGrid imoveis={imoveisFiltrados} />
            )}

            <WhatsappButton />
            <Footer />
        </div>
    )
}