'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Star, CreditCard } from 'lucide-react';
import { PAQUETES } from '@/lib/types';
import { useState, useEffect } from 'react';
import { convertPrice, formatPrice, detectUserCountry, getCurrencyFromCountry, type Currency } from '@/lib/currency';
import { useRouter } from 'next/navigation';

const serviceImages = [
  'https://cdn.abacus.ai/images/45c02528-7738-436a-a505-d49d91ff3885.png',
  'https://cdn.abacus.ai/images/0ea6b4f5-36dc-4dab-9060-e7a8160d90b5.png',
  'https://cdn.abacus.ai/images/eaa22972-8ad2-43f7-8889-721d26db3555.png',
  'https://cdn.abacus.ai/images/5c3f805e-9c83-44a7-81e3-1f3256d0804a.png',
];

export default function ServicesSection() {
  const [currency, setCurrency] = useState<Currency>('COP');
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('currency');
    if (stored) {
      setCurrency(stored as Currency);
    } else {
      detectUserCountry().then((country) => {
        const detectedCurrency = getCurrencyFromCountry(country);
        setCurrency(detectedCurrency);
        localStorage.setItem('currency', detectedCurrency);
      });
    }
  }, []);

  const handlePayNow = (paquete: any) => {
    router.push(`/checkout?paquete=${paquete.nombre.toLowerCase()}`);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Paquetes Disenados para <span className="gradient-text">Tu Exito</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Soluciones web profesionales adaptadas a cada tipo de negocio y presupuesto.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PAQUETES?.map((paquete, index) => {
            const precioLocal = convertPrice(paquete?.precioUSD ?? 0, currency);
            return (
              <motion.div
                key={paquete?.nombre}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all hover:-translate-y-2 ${paquete?.popular ? 'ring-2 ring-blue-500' : ''}`}
              >
                {paquete?.popular && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 z-10">
                    <Star className="w-3 h-3 fill-white" />Popular
                  </div>
                )}
                <div className="aspect-video relative bg-gray-100">
                  <Image src={serviceImages[index] || ''} alt={paquete?.nombre || 'Service'} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{paquete?.nombre}</h3>
                  <p className="text-sm text-gray-500 mb-4">{paquete?.descripcion}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text">{formatPrice(precioLocal, currency)}</span>
                    <span className="text-gray-500 ml-1 text-sm">{currency}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {paquete?.caracteristicas?.slice?.(0, 4)?.map?.((caracteristica, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{caracteristica}</span>
                      </li>
                    ))}
                    {(paquete?.caracteristicas?.length ?? 0) > 4 && (
                      <li className="text-sm text-blue-600">+{(paquete?.caracteristicas?.length ?? 0) - 4} mas...</li>
                    )}
                  </ul>
                  <div className="space-y-2">
                    <button
                      onClick={() => handlePayNow(paquete)}
                      className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${paquete?.popular ? 'gradient-bg text-white hover:shadow-lg' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                      <CreditCard className="w-4 h-4" />
                      Pagar Ahora
                    </button>
                    <Link href={`/cotizador?paquete=${paquete?.nombre?.toLowerCase?.() ?? ''}`} className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Personalizar<ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
          <Link href="/servicios" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Ver todos los detalles de paquetes<ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}