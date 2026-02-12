'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dumbbell, Clock, MapPin, Phone, Zap, Users, Trophy, ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';

const planes = [
  { nombre: 'Basico', precio: 49, descripcion: 'Acceso al gimnasio', beneficios: ['Acceso ilimitado', 'Vestuarios y duchas', 'Area de cardio'] },
  { nombre: 'Premium', precio: 79, descripcion: 'Todo incluido', beneficios: ['Todo del plan Basico', 'Clases grupales', 'Entrenador personal (2 sesiones/mes)', 'Nutricionista'], destacado: true },
  { nombre: 'Elite', precio: 129, descripcion: 'Experiencia completa', beneficios: ['Todo del plan Premium', 'Entrenador personal ilimitado', 'Spa y sauna', 'Suplementos incluidos'] },
];

const clases = [
  { nombre: 'Spinning', horario: 'Lun-Mie-Vie 7:00 AM', instructor: 'Carlos M.' },
  { nombre: 'Yoga', horario: 'Mar-Jue 6:00 PM', instructor: 'Ana L.' },
  { nombre: 'CrossFit', horario: 'Lun-Mie-Vie 6:00 PM', instructor: 'Miguel R.' },
  { nombre: 'Zumba', horario: 'Mar-Jue-Sab 5:00 PM', instructor: 'Sofia V.' },
];

export default function GimnasioPage() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-red-500/20">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FitZone</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {['inicio', 'planes', 'clases', 'contacto']?.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm capitalize transition-colors ${activeTab === tab ? 'text-red-400' : 'text-white/70 hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </nav>
          <Link href="/cotizador?paquete=profesional" className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity">
            Quiero uno asi
          </Link>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80" alt="Gym interior" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <span className="text-red-400 font-bold text-lg flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Transforma tu Cuerpo
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            FitZone Gym
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Equipamiento de ultima generacion, entrenadores certificados y resultados garantizados.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center justify-center gap-4">
            <button onClick={() => setActiveTab('planes')} className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Ver Planes
            </button>
            <button onClick={() => setActiveTab('clases')} className="px-8 py-3 bg-white/10 backdrop-blur text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors">
              Clases Grupales
            </button>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-800 py-6 border-y border-red-500/20">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-400" />
            <span>Lun-Vie: 5:00 - 23:00 | Sab-Dom: 7:00 - 20:00</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-400" />
            <span>Av. Fitness 789, Zona Norte</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-red-400" />
            <span>+57 300 111 2222</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-red-400 font-bold">Elige tu</span>
            <h2 className="text-4xl font-bold text-white mt-2">Plan de Membresia</h2>
            <p className="text-slate-400 mt-4">Encuentra el plan perfecto para tus objetivos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planes?.map((plan, i) => (
              <motion.div key={plan?.nombre} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`bg-slate-800 border ${plan?.destacado ? 'border-red-500 ring-2 ring-red-500/20' : 'border-red-500/20'} p-8 rounded-xl hover:border-red-500/40 transition-all relative`}>
                {plan?.destacado && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-full">
                    MAS POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan?.nombre}</h3>
                <p className="text-slate-400 mb-4">{plan?.descripcion}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-red-400">${plan?.precio}</span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan?.beneficios?.map((beneficio, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <Zap className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{beneficio}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 ${plan?.destacado ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-slate-700'} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity`}>
                  Inscribirse Ahora
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-800/50 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-red-400 font-bold flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Clases Grupales
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">Horarios de Clases</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clases?.map((clase, i) => (
              <motion.div key={clase?.nombre} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-slate-800 border border-red-500/20 p-6 rounded-xl hover:border-red-500/40 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">{clase?.nombre}</h3>
                <p className="text-slate-400 text-sm mb-3">{clase?.horario}</p>
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{clase?.instructor}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">5000+</h3>
              <p className="text-slate-400">Miembros Activos</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
              <p className="text-slate-400">Entrenadores Certificados</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">100+</h3>
              <p className="text-slate-400">Clases Semanales</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-lg mx-auto bg-slate-800 border border-red-500/20 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Calendar className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white">Agenda tu Clase Gratis</h2>
            <p className="text-slate-400 mt-2">Prueba nuestras instalaciones sin compromiso</p>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Nombre completo" value={contactForm?.nombre ?? ''} onChange={(e) => setContactForm(p => ({ ...p, nombre: e?.target?.value ?? '' }))} className="w-full px-4 py-3 bg-slate-700 border border-red-500/20 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder:text-slate-500" />
            <input type="email" placeholder="Email" value={contactForm?.email ?? ''} onChange={(e) => setContactForm(p => ({ ...p, email: e?.target?.value ?? '' }))} className="w-full px-4 py-3 bg-slate-700 border border-red-500/20 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder:text-slate-500" />
            <input type="tel" placeholder="Telefono" value={contactForm?.telefono ?? ''} onChange={(e) => setContactForm(p => ({ ...p, telefono: e?.target?.value ?? '' }))} className="w-full px-4 py-3 bg-slate-700 border border-red-500/20 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder:text-slate-500" />
            <textarea placeholder="Cuentanos sobre tus objetivos" value={contactForm?.mensaje ?? ''} onChange={(e) => setContactForm(p => ({ ...p, mensaje: e?.target?.value ?? '' }))} rows={3} className="w-full px-4 py-3 bg-slate-700 border border-red-500/20 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none placeholder:text-slate-500" />
            <button className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Agendar Clase Gratis
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-red-900 to-orange-900 text-white text-center px-4">
        <h3 className="text-2xl font-bold mb-4">Te gusto este diseno?</h3>
        <p className="text-white/80 mb-6">Podemos crear un sitio web similar para tu gimnasio.</p>
        <Link href="/cotizador?paquete=profesional" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-red-900 font-medium rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Solicitar Cotizacion
        </Link>
      </section>
    </div>
  );
}
