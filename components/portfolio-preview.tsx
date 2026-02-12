'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, UtensilsCrossed, Building2, Stethoscope } from 'lucide-react';

const portfolioItems = [
  { title: 'Restaurante Gourmet', description: 'Menu digital, reservas online y galeria de platos', image: 'https://cdn.abacus.ai/images/1e24e1d7-ed4b-4cba-b5ba-6d08bc9a551a.png', href: '/muestras/restaurante', icon: UtensilsCrossed, color: 'bg-orange-500' },
  { title: 'Hotel de Lujo', description: 'Sistema de reservas, galeria de habitaciones y servicios', image: 'https://cdn.abacus.ai/images/26944b95-a42c-40fd-9e16-ff8f28f514f3.png', href: '/muestras/hotel', icon: Building2, color: 'bg-blue-500' },
  { title: 'Clinica Medica', description: 'Citas online, directorio de especialistas y servicios', image: 'https://cdn.abacus.ai/images/b9133c1e-32f9-4164-9e40-8e651eea82d6.png', href: '/muestras/clinica', icon: Stethoscope, color: 'bg-green-500' },
];

export default function PortfolioPreview() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Mira Nuestro <span className="gradient-text">Trabajo</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explora ejemplos reales de sitios web que hemos creado para diferentes industrias.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems?.map((item, index) => {
            const Icon = item?.icon;
            return (
              <motion.div key={item?.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link href={item?.href || '#'} className="group block bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all hover:-translate-y-2">
                  <div className="aspect-video relative bg-gray-100">
                    <Image src={item?.image || ''} alt={item?.title || 'Portfolio'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute top-4 left-4 w-12 h-12 ${item?.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item?.title}</h3>
                    <p className="text-gray-600 mb-4">{item?.description}</p>
                    <span className="inline-flex items-center gap-2 text-blue-600 font-medium">
                      Ver Demo<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}