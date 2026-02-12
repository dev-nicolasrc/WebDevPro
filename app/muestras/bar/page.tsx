'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Wine, Clock, MapPin, Phone, Music, Calendar, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

const cocktails = [
  { name: 'Mojito Clasico', description: 'Ron blanco, menta fresca, lima y soda', price: 12, category: 'Clasicos' },
  { name: 'Old Fashioned', description: 'Whiskey, azucar, angostura y naranja', price: 15, category: 'Clasicos' },
  { name: 'Margarita Premium', description: 'Tequila reposado, triple sec y lima', price: 14, category: 'Especiales' },
  { name: 'Cosmopolitan', description: 'Vodka, cointreau, arandano y lima', price: 13, category: 'Especiales' },
];

const eventos = [
  { dia: 'Viernes', evento: 'DJ en Vivo', hora: '22:00' },
  { dia: 'Sabado', evento: 'Noche de Jazz', hora: '21:00' },
  { dia: 'Domingo', evento: 'Karaoke Night', hora: '20:00' },
];

export default function BarPage() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [reservaForm, setReservaForm] = useState({ nombre: '', email: '', fecha: '', hora: '', personas: '2' });

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Wine className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Nocturno Lounge</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {['inicio', 'carta', 'eventos', 'reservas']?.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm capitalize transition-colors ${activeTab === tab ? 'text-purple-400' : 'text-white/70 hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </nav>
          <Link href="/cotizador?paquete=profesional" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity">
            Quiero uno asi
          </Link>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80" alt="Bar interior" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-purple-950/50 to-slate-950/90" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <span className="text-purple-400 font-bold text-lg flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Bienvenidos a
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nocturno Lounge
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Cocteles premium, musica en vivo y el mejor ambiente nocturno de la ciudad.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center justify-center gap-4">
            <button onClick={() => setActiveTab('reservas')} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Reservar Mesa
            </button>
            <button onClick={() => setActiveTab('carta')} className="px-8 py-3 bg-white/10 backdrop-blur text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors">
              Ver Carta
            </button>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-900 py-6 border-y border-purple-500/20">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span>Mie-Dom: 18:00 - 03:00</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-400" />
            <span>Zona Rosa, Calle 82 #45</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-purple-400" />
            <span>+57 300 987 6543</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-purple-400 font-bold">Descubre</span>
            <h2 className="text-4xl font-bold text-white mt-2">Nuestra Carta de Cocteles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cocktails?.map((item, i) => (
              <motion.div key={item?.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-slate-900 border border-purple-500/20 p-6 rounded-xl hover:border-purple-500/40 transition-all flex justify-between">
                <div>
                  <span className="text-xs text-purple-400 font-medium">{item?.category}</span>
                  <h3 className="text-lg font-semibold text-white mt-1">{item?.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{item?.description}</p>
                </div>
                <div className="text-2xl font-bold text-purple-400">${item?.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900/50 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-purple-400 font-bold flex items-center justify-center gap-2">
              <Music className="w-5 h-5" />
              Eventos
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">Esta Semana</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventos?.map((evento, i) => (
              <motion.div key={evento?.dia} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{evento?.dia}</h3>
                <p className="text-purple-300 text-lg mb-2">{evento?.evento}</p>
                <p className="text-slate-400">{evento?.hora}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-lg mx-auto bg-slate-900 border border-purple-500/20 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white">Reserva tu Mesa</h2>
            <p className="text-slate-400 mt-2">Asegura tu lugar en la mejor noche</p>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Nombre" value={reservaForm?.nombre ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, nombre: e?.target?.value ?? '' }))} className="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-slate-500" />
            <input type="email" placeholder="Email" value={reservaForm?.email ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, email: e?.target?.value ?? '' }))} className="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-slate-500" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" value={reservaForm?.fecha ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, fecha: e?.target?.value ?? '' }))} className="px-4 py-3 bg-slate-800 border border-purple-500/20 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              <input type="time" value={reservaForm?.hora ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, hora: e?.target?.value ?? '' }))} className="px-4 py-3 bg-slate-800 border border-purple-500/20 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
            <select value={reservaForm?.personas ?? '2'} onChange={(e) => setReservaForm(p => ({ ...p, personas: e?.target?.value ?? '2' }))} className="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              {[2,4,6,8,10]?.map(n => (<option key={n} value={n}>{n} personas</option>))}
            </select>
            <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Confirmar Reserva
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900 text-white text-center px-4">
        <h3 className="text-2xl font-bold mb-4">Te gusto este diseno?</h3>
        <p className="text-white/70 mb-6">Podemos crear un sitio web similar para tu bar o lounge.</p>
        <Link href="/cotizador?paquete=profesional" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-purple-900 font-medium rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Solicitar Cotizacion
        </Link>
      </section>
    </div>
  );
}
