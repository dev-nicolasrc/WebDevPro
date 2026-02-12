'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, UtensilsCrossed, Building2, Stethoscope, Wine, Coffee, Dumbbell, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const portfolioItems = [
  { title: 'Restaurante Gourmet', description: 'Menu digital, reservas online y galeria de platos', image: 'https://cdn.abacus.ai/images/1e24e1d7-ed4b-4cba-b5ba-6d08bc9a551a.png', href: '/muestras/restaurante', icon: UtensilsCrossed, color: 'bg-orange-500' },
  { title: 'Hotel de Lujo', description: 'Sistema de reservas, galeria de habitaciones y servicios', image: 'https://cdn.abacus.ai/images/26944b95-a42c-40fd-9e16-ff8f28f514f3.png', href: '/muestras/hotel', icon: Building2, color: 'bg-blue-500' },
  { title: 'Clinica Medica', description: 'Citas online, directorio de especialistas y servicios', image: 'https://cdn.abacus.ai/images/b9133c1e-32f9-4164-9e40-8e651eea82d6.png', href: '/muestras/clinica', icon: Stethoscope, color: 'bg-green-500' },
  { title: 'Bar & Lounge', description: 'Carta de cocteles, eventos especiales y reservas de mesas', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', href: '/muestras/bar', icon: Wine, color: 'bg-purple-500' },
  { title: 'Cafeteria Artesanal', description: 'Menu de especialidades, pedidos online y programa de lealtad', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80', href: '/muestras/cafeteria', icon: Coffee, color: 'bg-amber-600' },
  { title: 'Gimnasio & Fitness', description: 'Clases grupales, entrenadores personales y membresias', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', href: '/muestras/gimnasio', icon: Dumbbell, color: 'bg-red-500' },
  { title: 'Spa & Wellness', description: 'Tratamientos, terapias holisticas y reservas de sesiones', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', href: '/muestras/spa', icon: Sparkles, color: 'bg-pink-500' },
];

export default function PortfolioPreview() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Mira Nuestro <span className="gradient-text">Trabajo</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explora ejemplos reales de sitios web que hemos creado para diferentes industrias.</p>
        </motion.div>

        <div className="relative group">
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 -translate-x-6" aria-label="Scroll left">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {portfolioItems?.map((item, index) => {
              const Icon = item?.icon;
              return (
                <motion.div key={item?.title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex-shrink-0 w-[350px]">
                  <Link href={item?.href || '#'} className="group/card block bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all hover:-translate-y-2 h-full">
                    <div className="aspect-video relative bg-gray-100">
                      <Image src={item?.image || ''} alt={item?.title || 'Portfolio'} fill className="object-cover group-hover/card:scale-105 transition-transform duration-500" />
                      <div className={`absolute top-4 left-4 w-12 h-12 ${item?.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        {Icon && <Icon className="w-6 h-6 text-white" />}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover/card:text-blue-600 transition-colors">{item?.title}</h3>
                      <p className="text-gray-600 mb-4">{item?.description}</p>
                      <span className="inline-flex items-center gap-2 text-blue-600 font-medium">
                        Ver Demo<ArrowRight className="w-4 h-4 group-hover/card:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 translate-x-6" aria-label="Scroll right">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}