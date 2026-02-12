'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'Dueño de Restaurante La Estancia',
    image: 'https://cdn.abacus.ai/images/c80446a9-d796-4aed-a0e3-11f9b80ed825.png',
    quote: 'Desde que lanzamos nuestra web, las reservas aumentaron un 40% en solo 3 meses. El sistema de pedidos online funciona perfecto y nuestros clientes lo aman. La inversión se pagó sola.',
    rating: 5
  },
  {
    name: 'María Santos',
    role: 'Gerente de Hotel Boutique Vista Mar',
    image: 'https://cdn.abacus.ai/images/a9a07a1e-aa85-498d-b516-1f1c9dec2cdd.png',
    quote: 'El equipo fue increíblemente profesional. Entendieron nuestra visión desde el primer día y crearon un sitio que refleja perfectamente la elegancia de nuestro hotel. Las reservas directas se triplicaron.',
    rating: 5
  },
  {
    name: 'Dr. Roberto Kim',
    role: 'Director de Clínica Dental Sonrisa',
    image: 'https://cdn.abacus.ai/images/187cfd56-e863-44ad-b3a4-682dac54bf49.png',
    quote: 'Ahora nuestros pacientes pueden agendar citas 24/7 desde su celular. Esto redujo las llamadas telefónicas en un 60% y mejoró muchísimo la experiencia del paciente. Excelente inversión.',
    rating: 5
  },
  {
    name: 'Andrea Vega',
    role: 'Propietaria de Café Aroma',
    image: null,
    quote: 'No tenía idea de cómo empezar con una página web, pero ellos me guiaron en cada paso. El sistema de pedidos online es súper fácil de usar y mis clientes están encantados. ¡Totalmente recomendado!',
    rating: 5
  },
  {
    name: 'Luis Fernández',
    role: 'Gerente de Gimnasio FitZone',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    quote: 'La plataforma de membresías online cambió completamente nuestro negocio. Los clientes pueden inscribirse y pagar desde casa. El proceso de onboarding es impecable.',
    rating: 5
  },
  {
    name: 'Patricia Morales',
    role: 'Directora de Spa Zen Wellness',
    image: null,
    quote: 'Trabajar con este equipo fue una experiencia maravillosa. Capturaron la esencia de nuestro spa y crearon una web que transmite paz y profesionalismo. Las reservas online funcionan de maravilla.',
    rating: 5
  },
  {
    name: 'Jorge Ramírez',
    role: 'Dueño de Bar & Lounge Nocturno',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    quote: 'La web nos ayudó a promocionar nuestros eventos especiales y aumentar la asistencia. El diseño es moderno y atractivo, justo lo que necesitábamos para nuestro público objetivo.',
    rating: 5
  },
  {
    name: 'Sofía Castillo',
    role: 'Gerente de Boutique Hotel Casa Blanca',
    image: null,
    quote: 'Después de probar con otras agencias, finalmente encontré un equipo que realmente entiende la industria hotelera. El motor de reservas es intuitivo y las fotos lucen espectaculares.',
    rating: 5
  },
  {
    name: 'Miguel Torres',
    role: 'Propietario de Restaurante Fusión Asia',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    quote: 'El menú digital interactivo es una obra de arte. Nuestros clientes pueden ver fotos de cada plato y hacer pedidos con un par de clics. Las ventas de delivery se dispararon.',
    rating: 5
  },
];

export default function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Lo que Dicen Nuestros <span className="gradient-text">Clientes</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Historias reales de negocios que transformaron su presencia digital.</p>
        </motion.div>

        <div className="relative group">
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 -translate-x-6" aria-label="Scroll left">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {testimonials?.map((testimonial, index) => (
              <motion.div key={testimonial?.name} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex-shrink-0 w-[380px] bg-gray-50 rounded-2xl p-8 card-shadow hover:card-shadow-hover transition-all">
                <Quote className="w-10 h-10 text-blue-500/20 mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial?.quote}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial?.rating ?? 0)]?.map((_, i) => (<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />))}
                </div>
                <div className="flex items-center gap-4">
                  {testimonial?.image ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 relative flex-shrink-0">
                      <Image src={testimonial.image} alt={testimonial?.name || 'Client'} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold">
                        {testimonial?.name?.charAt(0) || 'C'}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial?.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial?.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 translate-x-6" aria-label="Scroll right">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}