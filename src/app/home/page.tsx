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

const API_URL = "https://rodolfo-backend-1.onrender.com"

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

    useEffect(() => {
        async function fetchImoveis() {
            try {
                const response = await fetch(`${API_URL}/api/imoveis/`)
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor')
                }
                const data = await response.json()
                setImoveis(data)
            } catch (error) {
                console.error('Erro ao carregar imóveis:', error)
                setError('Erro ao carregar imóveis. Verifique se o backend está rodando.')
            } finally {
                setLoading(false)
            }
        }

        fetchImoveis()
    }, [])

    // Debug - ver os imóveis carregados
    useEffect(() => {
        if (imoveis.length > 0) {
            console.log('Imóveis carregados:', imoveis.map(i => ({
                titulo: i.titulo,
                cidade: i.cidade,
                quartos: i.quartos,
                preco: i.preco,
                finalidade: i.finalidade,
                status: i.status,
                tipo: i.tipo
            })))
        }
    }, [imoveis])

    const imoveisFiltrados = useMemo(() => {
        return imoveis.filter(imovel => {
            // Filtro de tipo
            if (filtros.tipo && imovel.tipo !== filtros.tipo) {
                return false
            }

            // Filtro de finalidade
            if (filtros.finalidade && imovel.finalidade !== filtros.finalidade) {
                return false
            }

            // Filtro de situação/status
            if (filtros.situacao && imovel.status !== filtros.situacao) {
                return false
            }

            // Filtro de cidade - normalizar ambos os lados
            if (filtros.cidade) {
                const cidadeNormalizada = imovel.cidade
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '-')
                    .trim()
                
                if (cidadeNormalizada !== filtros.cidade) {
                    return false
                }
            }

            // Filtro de bairro
            if (filtros.bairro && imovel.bairro !== filtros.bairro) {
                return false
            }

            // Filtro de quartos
            if (filtros.quartos) {
                if (filtros.quartos === '5+') {
                    if (imovel.quartos < 5) {
                        return false
                    }
                } else {
                    const quartosValue = parseInt(filtros.quartos)
                    if (imovel.quartos !== quartosValue) {
                        return false
                    }
                }
            }

            // Filtro de preço
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

                if (!precoValido) {
                    return false
                }
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
            <div className="mt-25 lg:px-[200px] text-[rgb(8,150,67)] font-bold py-6 px-4  sm:px-6 md:px-8 " id="imoveis">
                <span className="text-[15px]">Portifólio<h1 className="text-[48px] ">Imóveis Disponiveis</h1></span>
                <p className="text-[16px] text-gray-600 font-normal mt-2">
                    {imoveisFiltrados.length} imóvel{imoveisFiltrados.length !== 1 ? 'is' : ''} encontrado{imoveisFiltrados.length !== 1 ? 's' : ''}
                </p>
            </div>
            {loading ? (
                <div className="p-10 text-center text-gray-600">Carregando imóveis...</div>
            ) : error ? (
                <div className="p-10 text-center text-red-600">{error}</div>
            ) : (
                <ImoveisGrid imoveis={imoveisFiltrados} />
            )}
            <WhatsappButton/>
            <Footer />
        </div>
    )
}