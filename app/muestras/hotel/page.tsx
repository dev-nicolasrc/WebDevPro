'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, Star, Wifi, Car, Waves, Coffee, Calendar, Users, ArrowLeft, Bed, MapPin } from 'lucide-react';
import Link from 'next/link';

const rooms = [
  { name: 'Suite Deluxe', description: 'Vista al mar, jacuzzi privado', price: 299, image: 'https://cdn.abacus.ai/images/26944b95-a42c-40fd-9e16-ff8f28f514f3.png' },
  { name: 'Habitacion Superior', description: 'Balcon privado, minibar', price: 199, image: 'https://cdn.abacus.ai/images/00cd4398-f599-4602-9d5c-8e5105f7523a.png' },
  { name: 'Habitacion Estandar', description: 'Comoda y acogedora', price: 129, image: 'https://cdn.abacus.ai/images/296c4540-d89c-4532-a3e2-aa3ab9a6e23a.png' },
];

const amenities = [
  { name: 'WiFi Gratis', icon: Wifi },
  { name: 'Estacionamiento', icon: Car },
  { name: 'Piscina', icon: Waves },
  { name: 'Restaurante', icon: Coffee },
];

export default function HotelPage() {
  const [reservaForm, setReservaForm] = useState({ checkIn: '', checkOut: '', huespedes: '2', habitacion: '' });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Demo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center"><Building2 className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-bold text-white">Grand Azure</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {['Inicio', 'Habitaciones', 'Servicios', 'Reservas']?.map((item) => (<button key={item} className="text-sm text-white/70 hover:text-white transition-colors">{item}</button>))}
          </nav>
          <Link href="/cotizador?paquete=premium" className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors">Quiero uno asi</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center">
        <Image src="https://cdn.abacus.ai/images/26944b95-a42c-40fd-9e16-ff8f28f514f3.png" alt="Hotel room" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-1 mb-4">{[...Array(5)]?.map((_, i) => (<Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />))}</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">Grand Azure Hotel</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/80 mb-8 max-w-xl mx-auto">Lujo y confort frente al mar. Tu escape perfecto.</motion.p>
          <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="px-8 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"><Calendar className="w-5 h-5" />Reservar Ahora</motion.button>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap items-center justify-center gap-12">
          {amenities?.map((amenity) => {
            const Icon = amenity?.icon;
            return (<div key={amenity?.name} className="flex items-center gap-3 text-white"><Icon className="w-6 h-6 text-blue-400" /><span className="text-white/80">{amenity?.name}</span></div>);
          })}
        </div>
      </section>

      {/* Rooms */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12"><span className="text-blue-600 font-medium">Alojamiento</span><h2 className="text-4xl font-bold text-slate-800 mt-2">Nuestras Habitaciones</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms?.map((room, i) => (
              <motion.div key={room?.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                <div className="aspect-[4/3] relative"><Image src={room?.image || ''} alt={room?.name || ''} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800">{room?.name}</h3>
                  <p className="text-slate-500 mt-2">{room?.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div><span className="text-3xl font-bold text-blue-600">${room?.price}</span><span className="text-slate-500">/noche</span></div>
                    <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors">Reservar</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-slate-100 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8"><h2 className="text-3xl font-bold text-slate-800">Reserva tu Estadia</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div><label className="text-sm font-medium text-slate-700">Check-in</label><input type="date" value={reservaForm?.checkIn ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, checkIn: e?.target?.value ?? '' }))} className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="text-sm font-medium text-slate-700">Check-out</label><input type="date" value={reservaForm?.checkOut ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, checkOut: e?.target?.value ?? '' }))} className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="text-sm font-medium text-slate-700">Huespedes</label><select value={reservaForm?.huespedes ?? '2'} onChange={(e) => setReservaForm(p => ({ ...p, huespedes: e?.target?.value ?? '2' }))} className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500">{[1,2,3,4,5,6]?.map(n => (<option key={n} value={n}>{n} huespedes</option>))}</select></div>
            <div className="flex items-end"><button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">Buscar</button></div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12"><span className="text-blue-600 font-medium">Galeria</span><h2 className="text-4xl font-bold text-slate-800 mt-2">Descubre el Hotel</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['https://cdn.abacus.ai/images/26944b95-a42c-40fd-9e16-ff8f28f514f3.png', 'https://cdn.abacus.ai/images/00cd4398-f599-4602-9d5c-8e5105f7523a.png', 'https://cdn.abacus.ai/images/296c4540-d89c-4532-a3e2-aa3ab9a6e23a.png', 'https://cdn.abacus.ai/images/4f803a2a-7dee-487e-8f6b-f0105f8f4342.png']?.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={`${i === 0 ? 'col-span-2 row-span-2' : ''} aspect-square relative rounded-xl overflow-hidden`}><Image src={img} alt="Hotel" fill className="object-cover hover:scale-105 transition-transform duration-500" /></motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white text-center px-4">
        <h3 className="text-2xl font-bold mb-4">Te gusto este diseno?</h3>
        <p className="text-white/70 mb-6">Podemos crear un sitio web similar para tu hotel.</p>
        <Link href="/cotizador?paquete=premium" className="inline-flex items-center gap-2 px-8 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors"><ArrowLeft className="w-4 h-4" />Solicitar Cotizacion</Link>
      </section>
    </div>
  );
}