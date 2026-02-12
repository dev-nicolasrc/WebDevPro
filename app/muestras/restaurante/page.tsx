'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Clock, MapPin, Phone, Star, ChefHat, Wine, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { name: 'Filete Mignon', description: 'Corte premium con salsa de vino tinto', price: 45, category: 'Carnes' },
  { name: 'Salmon a la Parrilla', description: 'Con vegetales asados y limon', price: 38, category: 'Mariscos' },
  { name: 'Risotto de Hongos', description: 'Cremoso risotto con hongos silvestres', price: 28, category: 'Pastas' },
  { name: 'Ensalada Mediterranea', description: 'Vegetales frescos con queso feta', price: 18, category: 'Entradas' },
];

export default function RestaurantePage() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [reservaForm, setReservaForm] = useState({ nombre: '', email: '', fecha: '', hora: '', personas: '2' });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header Demo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center"><UtensilsCrossed className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-serif font-bold text-white">La Maison</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {['inicio', 'menu', 'reservas', 'contacto']?.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm capitalize transition-colors ${activeTab === tab ? 'text-amber-400' : 'text-white/70 hover:text-white'}`}>{tab}</button>))}
          </nav>
          <Link href="/cotizador?paquete=profesional" className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-full hover:bg-amber-600 transition-colors">Quiero uno asi</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center">
        <Image src="https://cdn.abacus.ai/images/1e24e1d7-ed4b-4cba-b5ba-6d08bc9a551a.png" alt="Restaurant interior" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4"><span className="text-amber-400 font-serif text-lg">Bienvenidos a</span></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-serif font-bold mb-6">La Maison</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/80 mb-8 max-w-xl mx-auto">Una experiencia gastronomica unica con los mejores ingredientes.</motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center justify-center gap-4">
            <button onClick={() => setActiveTab('reservas')} className="px-8 py-3 bg-amber-500 text-white font-medium rounded-full hover:bg-amber-600 transition-colors flex items-center gap-2"><Calendar className="w-5 h-5" />Reservar Mesa</button>
            <button onClick={() => setActiveTab('menu')} className="px-8 py-3 bg-white/10 backdrop-blur text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors">Ver Menu</button>
          </motion.div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-stone-900 py-6">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-amber-400" /><span>Lun-Dom: 12:00 - 23:00</span></div>
          <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-amber-400" /><span>Calle Principal 123, Centro</span></div>
          <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-amber-400" /><span>+57 300 123 4567</span></div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-serif">Descubre</span>
            <h2 className="text-4xl font-serif font-bold text-stone-800 mt-2">Nuestro Menu</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems?.map((item, i) => (
              <motion.div key={item?.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex justify-between">
                <div><span className="text-xs text-amber-600 font-medium">{item?.category}</span><h3 className="text-lg font-semibold text-stone-800 mt-1">{item?.name}</h3><p className="text-stone-500 text-sm mt-1">{item?.description}</p></div>
                <div className="text-2xl font-bold text-amber-600">${item?.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-stone-100 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12"><span className="text-amber-600 font-serif">Galeria</span><h2 className="text-4xl font-serif font-bold text-stone-800 mt-2">Nuestros Platos</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['https://cdn.abacus.ai/images/cb2d7913-bba7-42cf-a1ba-13548dbd015d.png', 'https://cdn.abacus.ai/images/991189d0-10b1-469a-a9df-142a19b4442f.png', 'https://cdn.abacus.ai/images/1e24e1d7-ed4b-4cba-b5ba-6d08bc9a551a.png']?.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="aspect-square relative rounded-xl overflow-hidden"><Image src={img} alt="Dish" fill className="object-cover hover:scale-105 transition-transform duration-500" /></motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservations */}
      <section className="py-20 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8"><Calendar className="w-12 h-12 text-amber-500 mx-auto mb-4" /><h2 className="text-3xl font-serif font-bold text-stone-800">Reserva tu Mesa</h2></div>
          <div className="space-y-4">
            <input type="text" placeholder="Nombre" value={reservaForm?.nombre ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, nombre: e?.target?.value ?? '' }))} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            <input type="email" placeholder="Email" value={reservaForm?.email ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, email: e?.target?.value ?? '' }))} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" value={reservaForm?.fecha ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, fecha: e?.target?.value ?? '' }))} className="px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              <input type="time" value={reservaForm?.hora ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, hora: e?.target?.value ?? '' }))} className="px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            </div>
            <select value={reservaForm?.personas ?? '2'} onChange={(e) => setReservaForm(p => ({ ...p, personas: e?.target?.value ?? '2' }))} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
              {[1,2,3,4,5,6,7,8]?.map(n => (<option key={n} value={n}>{n} personas</option>))}
            </select>
            <button className="w-full py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors">Confirmar Reserva</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-900 text-white text-center px-4">
        <h3 className="text-2xl font-serif mb-4">Te gusto este diseno?</h3>
        <p className="text-white/70 mb-6">Podemos crear un sitio web similar para tu restaurante.</p>
        <Link href="/cotizador?paquete=profesional" className="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 text-white font-medium rounded-full hover:bg-amber-600 transition-colors"><ArrowLeft className="w-4 h-4" />Solicitar Cotizacion</Link>
      </section>
    </div>
  );
}