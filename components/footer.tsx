import Link from 'next/link';
import { Globe, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">WebDev Pro</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Creamos sitios web profesionales que impulsan tu negocio. Especializados en restaurantes, hoteles y clinicas.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span>dev.nicolasrodriguez@gmail.com</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Servicios</h3>
            <ul className="space-y-3">
              <li><Link href="/servicios" className="text-gray-400 hover:text-white transition-colors">Paquetes</Link></li>
              <li><Link href="/cotizador" className="text-gray-400 hover:text-white transition-colors">Cotizador</Link></li>
              <li><Link href="/muestras/restaurante" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li><Link href="/nosotros" className="text-gray-400 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {currentYear} WebDev Pro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}