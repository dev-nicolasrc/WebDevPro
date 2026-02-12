'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Star, Sparkles, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://cdn.abacus.ai/images/8481c963-8690-4bb1-953e-1d19c9494f03.png"
          alt="Tech background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-teal-700/80" />
      </div>
      <div className="relative z-20 max-w-[1200px] mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-white/90 text-sm">Diseno web profesional que genera resultados</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Tu Negocio Merece<br />
          <span className="bg-gradient-to-r from-teal-400 to-cyan-300 text-transparent bg-clip-text">Una Web Profesional</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
        >
          Creamos sitios web impactantes para restaurantes, hoteles y clinicas que convierten visitantes en clientes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link href="/cotizador" className="group px-8 py-4 rounded-full bg-white text-blue-600 font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
            Calcula Tu Precio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/muestras/restaurante" className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-all">
            Ver Portfolio
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 text-white/70"
        >
          <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-teal-400" /><span>+50 Proyectos Entregados</span></div>
          <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /><span>4.9/5 Satisfaccion</span></div>
          <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-orange-400" /><span>Entrega Rapida</span></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[{ name: 'Basico', price: '$499' }, { name: 'Profesional', price: '$1,299' }, { name: 'Premium', price: '$2,499' }, { name: 'E-commerce', price: '$3,499' }]?.map((plan) => (
            <div key={plan?.name} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-white/70 text-sm">{plan?.name}</p>
              <p className="text-2xl font-bold text-white">{plan?.price}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F9FA" />
        </svg>
      </div>
    </section>
  );
}