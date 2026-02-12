'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Clock, MapPin, Phone, Heart, Flower2, Calendar, ArrowLeft, Leaf } from 'lucide-react';
import Link from 'next/link';

const tratamientos = [
  { nombre: 'Masaje Relajante', descripcion: 'Masaje de cuerpo completo con aceites aromaticos', duracion: '60 min', precio: 80, categoria: 'Masajes' },
  { nombre: 'Masaje de Piedras Calientes', descripcion: 'Terapia con piedras volcanicas calientes', duracion: '90 min', precio: 120, categoria: 'Masajes' },
  { nombre: 'Facial Hidratante', descripcion: 'Limpieza profunda e hidratacion facial', duracion: '45 min', precio: 65, categoria: 'Faciales' },
  { nombre: 'Reflexologia', descripcion: 'Masaje terapeutico de pies y puntos de presion', duracion: '50 min', precio: 55, categoria: 'Terapias' },
  { nombre: 'Aromaterapia', descripcion: 'Sesion de relajacion con aceites esenciales', duracion: '60 min', precio: 70, categoria: 'Terapias' },
  { nombre: 'Exfoliacion Corporal', descripcion: 'Renovacion de la piel con sales marinas', duracion: '45 min', precio: 60, categoria: 'Corporales' },
];

const paquetes = [
  { nombre: 'Dia de Relax', incluye: ['Masaje relajante', 'Facial', 'Acceso a sauna'], precio: 180 },
  { nombre: 'Escapada Romantica', incluye: ['Masaje en pareja', 'Jacuzzi privado', 'Copa de champagne'], precio: 280 },
  { nombre: 'Renovacion Total', incluye: ['Masaje de piedras', 'Facial premium', 'Exfoliacion', 'Aromaterapia'], precio: 320 },
];

export default function SpaPage() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [reservaForm, setReservaForm] = useState({ nombre: '', email: '', telefono: '', fecha: '', tratamiento: '' });

  return (
    <div className="min-h-screen bg-rose-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-rose-900">Zen Wellness</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {['inicio', 'tratamientos', 'paquetes', 'reservas']?.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm capitalize transition-colors ${activeTab === tab ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'}`}>
                {tab}
              </button>
            ))}
          </nav>
          <Link href="/cotizador?paquete=profesional" className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity">
            Quiero uno asi
          </Link>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80" alt="Spa interior" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/50 via-pink-900/30 to-rose-900/60" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <span className="text-pink-300 font-bold text-lg flex items-center justify-center gap-2">
              <Flower2 className="w-5 h-5" />
              Bienvenidos a
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            Zen Wellness Spa
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Un oasis de tranquilidad donde cuerpo y mente encuentran el equilibrio perfecto.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center justify-center gap-4">
            <button onClick={() => setActiveTab('reservas')} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Reservar Sesion
            </button>
            <button onClick={() => setActiveTab('tratamientos')} className="px-8 py-3 bg-white/10 backdrop-blur text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors">
              Ver Tratamientos
            </button>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-6 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-pink-600" />
            <span>Lun-Dom: 9:00 - 21:00</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-pink-600" />
            <span>Centro Comercial Plaza, Piso 3</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-pink-600" />
            <span>+57 300 555 8888</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-bold">Descubre</span>
            <h2 className="text-4xl font-bold text-rose-900 mt-2">Nuestros Tratamientos</h2>
            <p className="text-gray-600 mt-4">Terapias personalizadas para tu bienestar</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tratamientos?.map((tratamiento, i) => (
              <motion.div key={tratamiento?.nombre} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-pink-200 p-6 rounded-xl hover:shadow-lg transition-all">
                <span className="text-xs text-pink-600 font-medium bg-pink-50 px-3 py-1 rounded-full">{tratamiento?.categoria}</span>
                <h3 className="text-lg font-semibold text-rose-900 mt-3">{tratamiento?.nombre}</h3>
                <p className="text-gray-600 text-sm mt-2">{tratamiento?.descripcion}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">{tratamiento?.duracion}</span>
                  <span className="text-2xl font-bold text-pink-600">${tratamiento?.precio}</span>
                </div>
                <button className="w-full mt-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors text-sm font-medium">
                  Reservar
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-pink-100 to-rose-100 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-bold flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Paquetes Especiales
            </span>
            <h2 className="text-4xl font-bold text-rose-900 mt-2">Experiencias Completas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paquetes?.map((paquete, i) => (
              <motion.div key={paquete?.nombre} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-rose-900 mb-4">{paquete?.nombre}</h3>
                <ul className="space-y-3 mb-6">
                  {paquete?.incluye?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-pink-200 pt-4 mb-4">
                  <span className="text-3xl font-bold text-pink-600">${paquete?.precio}</span>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  Reservar Paquete
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-bold flex items-center justify-center gap-2">
              <Leaf className="w-5 h-5" />
              Nuestro Enfoque
            </span>
            <h2 className="text-4xl font-bold text-rose-900 mt-2">Bienestar Holistico</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-rose-900 mb-2">Cuerpo</h3>
              <p className="text-gray-600">Tratamientos que revitalizan y renuevan tu energia fisica</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-rose-900 mb-2">Mente</h3>
              <p className="text-gray-600">Terapias que calman y equilibran tu estado mental</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flower2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-rose-900 mb-2">Espiritu</h3>
              <p className="text-gray-600">Experiencias que conectan con tu esencia interior</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-lg mx-auto bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-xl p-8 border border-pink-200">
          <div className="text-center mb-8">
            <Calendar className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-rose-900">Reserva tu Sesion</h2>
            <p className="text-gray-600 mt-2">Comienza tu viaje hacia el bienestar</p>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Nombre completo" value={reservaForm?.nombre ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, nombre: e?.target?.value ?? '' }))} className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            <input type="email" placeholder="Email" value={reservaForm?.email ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, email: e?.target?.value ?? '' }))} className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            <input type="tel" placeholder="Telefono" value={reservaForm?.telefono ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, telefono: e?.target?.value ?? '' }))} className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            <input type="date" value={reservaForm?.fecha ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, fecha: e?.target?.value ?? '' }))} className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            <select value={reservaForm?.tratamiento ?? ''} onChange={(e) => setReservaForm(p => ({ ...p, tratamiento: e?.target?.value ?? '' }))} className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent">
              <option value="">Selecciona un tratamiento</option>
              {tratamientos?.map(t => (<option key={t?.nombre} value={t?.nombre}>{t?.nombre}</option>))}
            </select>
            <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Confirmar Reserva
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-pink-900 to-rose-900 text-white text-center px-4">
        <h3 className="text-2xl font-bold mb-4">Te gusto este diseno?</h3>
        <p className="text-white/80 mb-6">Podemos crear un sitio web similar para tu spa o centro de bienestar.</p>
        <Link href="/cotizador?paquete=profesional" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-pink-900 font-medium rounded-full hover:bg-rose-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Solicitar Cotizacion
        </Link>
      </section>
    </div>
  );
}
