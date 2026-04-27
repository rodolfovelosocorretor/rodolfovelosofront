import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-900 text-gray-300 mt-16">
      
      <div className="max-w-[1100px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* COLUNA 1 - LOGO + SLOGAN */}
        <div>
          <Image
            src="/logoHorizontalizada.PNG"
            alt="Logo"
            width={180}
            height={100}
            className="mb-4"
          />
          <p className="text-sm text-gray-400 leading-relaxed">
            Conectando você ao imóvel ideal com segurança, transparência e excelência.
          </p>
        </div>

        {/* COLUNA 2 - CONTATO */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Contato
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>(83) 99846-3395</span>
            </div>


            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>João Pessoa - PB</span>
            </div>

          </div>
        </div>

        {/* COLUNA 3 - CREDIBILIDADE */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Informações
          </h3>

          <p className="text-sm">
            CRECI: <span className="font-semibold">17395</span>
          </p>

          <p className="text-sm mt-3 text-gray-400">
            Atendimento especializado em compra, venda e investimento imobiliário.
          </p>
        </div>

      </div>

      {/* LINHA FINAL */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-white">
        © {new Date().getFullYear()} Todos os direitos reservados.
      </div>

    </footer>
  )
}