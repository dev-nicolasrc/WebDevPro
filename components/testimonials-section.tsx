'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Carlos Mendoza', role: 'Dueno de Restaurante', image: 'https://cdn.abacus.ai/images/c80446a9-d796-4aed-a0e3-11f9b80ed825.png', quote: 'Nuestra web incremento las reservas en un 40%. El equipo entendio perfectamente lo que necesitabamos.', rating: 5 },
  { name: 'Maria Santos', role: 'Gerente de Hotel', image: 'https://cdn.abacus.ai/images/a9a07a1e-aa85-498d-b516-1f1c9dec2cdd.png', quote: 'Profesionales y puntuales. El sitio web refleja perfectamente la elegancia de nuestro hotel.', rating: 5 },
  { name: 'Dr. Roberto Kim', role: 'Director de Clinica', image: 'https://cdn.abacus.ai/images/187cfd56-e863-44ad-b3a4-682dac54bf49.png', quote: 'Excelente inversion. Ahora nuestros pacientes pueden agendar citas online facilmente.', rating: 5 },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Lo que Dicen Nuestros <span className="gradient-text">Clientes</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Historias reales de negocios que transformaron su presencia digital.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <motion.div key={testimonial?.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-gray-50 rounded-2xl p-8 card-shadow hover:card-shadow-hover transition-all">
              <Quote className="w-10 h-10 text-blue-500/20 mb-4" />
              <p className="text-gray-700 mb-6 italic">"{testimonial?.quote}"</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial?.rating ?? 0)]?.map((_, i) => (<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />))}
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 relative">
                  <Image src={testimonial?.image || ''} alt={testimonial?.name || 'Client'} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial?.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial?.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}