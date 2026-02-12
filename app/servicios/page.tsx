import Header from '@/components/header';
import Footer from '@/components/footer';
import { Check, Star, ArrowRight, Clock, Headphones, Shield } from 'lucide-react';
import Link from 'next/link';
import { PAQUETES } from '@/lib/types';
import Image from 'next/image';

const serviceImages = [
  'https://cdn.abacus.ai/images/45c02528-7738-436a-a505-d49d91ff3885.png',
  'https://cdn.abacus.ai/images/0ea6b4f5-36dc-4dab-9060-e7a8160d90b5.png',
  'https://cdn.abacus.ai/images/eaa22972-8ad2-43f7-8889-721d26db3555.png',
  'https://cdn.abacus.ai/images/5c3f805e-9c83-44a7-81e3-1f3256d0804a.png',
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nuestros <span className="gradient-text">Paquetes</span></h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Soluciones web profesionales para cada necesidad y presupuesto.</p>
        </div>
      </section>
      <section className="pb-24 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PAQUETES?.map((paquete, index) => (
              <div key={paquete?.nombre} className={`relative bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all ${paquete?.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {paquete?.popular && <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 z-10"><Star className="w-3 h-3 fill-white" />Popular</div>}
                <div className="aspect-video relative bg-gray-100"><Image src={serviceImages[index] || ''} alt={paquete?.nombre || ''} fill className="object-cover" /></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{paquete?.nombre}</h3>
                  <p className="text-sm text-gray-500 mb-4">{paquete?.descripcion}</p>
                  <div className="mb-6"><span className="text-4xl font-bold gradient-text">${paquete?.precioUSD?.toLocaleString?.()}</span><span className="text-gray-500 ml-1">USD</span></div>
                  <ul className="space-y-2 mb-6">
                    {paquete?.caracteristicas?.map?.((c, i) => (<li key={i} className="flex items-start gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /><span>{c}</span></li>))}
                  </ul>
                  <Link href={`/cotizador?paquete=${paquete?.nombre?.toLowerCase?.()}`} className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${paquete?.popular ? 'gradient-bg text-white hover:shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Seleccionar<ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl card-shadow text-center"><Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" /><h3 className="text-lg font-semibold text-gray-900 mb-2">Entrega Rapida</h3><p className="text-gray-600 text-sm">Cumplimos con los tiempos de entrega establecidos.</p></div>
            <div className="bg-white p-6 rounded-2xl card-shadow text-center"><Headphones className="w-12 h-12 text-green-500 mx-auto mb-4" /><h3 className="text-lg font-semibold text-gray-900 mb-2">Soporte Continuo</h3><p className="text-gray-600 text-sm">Estamos contigo durante y despues del proyecto.</p></div>
            <div className="bg-white p-6 rounded-2xl card-shadow text-center"><Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" /><h3 className="text-lg font-semibold text-gray-900 mb-2">Garantia de Calidad</h3><p className="text-gray-600 text-sm">Sitios web modernos y optimizados.</p></div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}