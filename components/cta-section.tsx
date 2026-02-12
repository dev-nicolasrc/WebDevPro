'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Calculator } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
      </div>
      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Listo para Transformar tu Negocio?</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">Obten una cotizacion personalizada en minutos o habla con nuestro asistente virtual para resolver tus dudas.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cotizador" className="group px-8 py-4 rounded-full bg-white text-blue-600 font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Usar Cotizador
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button onClick={() => { const event = new CustomEvent('openChatbot'); window.dispatchEvent(event); }} className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Hablar con Asistente
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}