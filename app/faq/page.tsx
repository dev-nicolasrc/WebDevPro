'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  { q: 'Cuanto tiempo toma crear un sitio web?', a: 'El tiempo varia segun el paquete: Landing Page (7 dias), Sitio Completo (14 dias), Premium (21 dias), E-commerce (30 dias). Estos tiempos pueden variar segun la complejidad del proyecto.' },
  { q: 'Que incluye cada paquete?', a: 'Cada paquete incluye diseno personalizado, desarrollo responsive, optimizacion SEO basica, y soporte post-lanzamiento. Los paquetes superiores incluyen mas paginas, funcionalidades avanzadas como sistemas de reservas, blogs y tiendas online.' },
  { q: 'Puedo hacer cambios despues de que el sitio este listo?', a: 'Si! Ofrecemos soporte continuo y paquetes de mantenimiento. Los cambios menores estan incluidos en el periodo de garantia (30 dias), y para cambios mayores podemos cotizar aparte.' },
  { q: 'Necesito proporcionar el contenido (textos e imagenes)?', a: 'Idealmente si. Sin embargo, podemos ayudarte a crear contenido por un costo adicional. Tambien podemos usar imagenes de stock profesionales si no tienes fotos propias.' },
  { q: 'El sitio sera optimizado para moviles?', a: 'Absolutamente! Todos nuestros sitios son 100% responsive, lo que significa que se ven y funcionan perfectamente en moviles, tablets y computadoras de escritorio.' },
  { q: 'Incluyen hosting y dominio?', a: 'El primer ano de hosting esta incluido en todos los paquetes. El dominio puede estar incluido o puedes usar uno que ya tengas. Despues del primer ano, hay una tarifa de mantenimiento anual.' },
  { q: 'Como funciona el proceso de pago?', a: 'Trabajamos con un modelo de 50% al iniciar el proyecto y 50% al entregar. Para proyectos grandes, podemos dividir los pagos en mas cuotas. Aceptamos transferencias bancarias y pagos electronicos.' },
  { q: 'Que pasa si no me gusta el diseno?', a: 'Incluimos hasta 3 rondas de revisiones en cada proyecto. Trabajamos contigo para asegurarnos de que el resultado final sea exactamente lo que necesitas. Tu satisfaccion es nuestra prioridad.' },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4"><HelpCircle className="w-4 h-4" /><span className="text-sm font-medium">Centro de Ayuda</span></div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Preguntas <span className="gradient-text">Frecuentes</span></h1>
            <p className="text-lg text-gray-600">Encuentra respuestas a las dudas mas comunes.</p>
          </motion.div>
          <div className="space-y-4">
            {faqs?.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left">
                  <span className="font-semibold text-gray-900 pr-4">{faq?.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="px-6 pb-5 text-gray-600 border-t pt-4">{faq?.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 text-center text-white">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Aun tienes dudas?</h3>
            <p className="text-white/80 mb-6">Nuestro equipo esta listo para ayudarte con cualquier pregunta.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contacto" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-full hover:shadow-lg transition-all">Contactar</Link>
              <button onClick={() => { const event = new CustomEvent('openChatbot'); window?.dispatchEvent?.(event); }} className="px-6 py-3 bg-white/10 text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all">Chatear Ahora</button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}