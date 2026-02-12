'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Coffee, Clock, MapPin, Phone, Heart, ShoppingBag, ArrowLeft, Leaf } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { name: 'Cappuccino Artesanal', description: 'Espresso doble con espuma de leche cremosa', price: 5, category: 'Cafes' },
  { name: 'Latte Vainilla', description: 'Espresso con leche vaporizada y vainilla natural', price: 6, category: 'Cafes' },
  { name: 'Cold Brew', description: 'Cafe frio de extraccion lenta, suave y refrescante', price: 7, category: 'Especiales' },
  { name: 'Croissant de Almendra', description: 'Recien horneado con relleno de crema de almendra', price: 4, category: 'Reposteria' },
  { name: 'Tarta de Zanahoria', description: 'Con frosting de queso crema y nueces', price: 5, category: 'Reposteria' },
  { name: 'Sandwich Caprese', description: 'Mozzarella fresca, tomate, albahaca y pesto', price: 8, category: 'Comida' },
];

export default function CafeteriaPage() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [pedidoForm, setPedidoForm] = useState({ nombre: '', email: '', telefono: '', direccion: '' });

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-amber-900">Café Aroma</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {['inicio', 'menu', 'pedidos', 'contacto']?.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm capitalize transition-colors ${activeTab === tab ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}>
                {tab}
              </button>
            ))}
          </nav>
          <Link href="/cotizador?paquete=profesional" className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity">
            Quiero uno asi
          </Link>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80" alt="Cafe interior" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-amber-900/40 to-amber-900/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <span className="text-amber-300 font-bold text-lg flex items-center justify-center gap-2">
              <Leaf className="w-5 h-5" />
              Bienvenidos a
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            Café Aroma
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Cafe artesanal de especialidad, reposteria casera y un ambiente acogedor.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center justify-center gap-4">
            <button onClick={() => setActiveTab('pedidos')} className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Pedir Online
            </button>
            <button onClick={() => setActiveTab('menu')} className="px-8 py-3 bg-white/10 backdrop-blur text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors">
              Ver Menu
            </button>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-6 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>Lun-Vie: 7:00 - 20:00 | Sab-Dom: 8:00 - 21:00</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <span>Av. Principal 456, Centro</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-amber-600" />
            <span>+57 300 456 7890</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold">Descubre</span>
            <h2 className="text-4xl font-bold text-amber-900 mt-2">Nuestro Menu</h2>
            <p className="text-gray-600 mt-4">Cafe de especialidad y reposteria artesanal</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems?.map((item, i) => (
              <motion.div key={item?.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-amber-200 p-6 rounded-xl hover:shadow-lg transition-all">
                <span className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full">{item?.category}</span>
                <h3 className="text-lg font-semibold text-amber-900 mt-3">{item?.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{item?.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-amber-600">${item?.price}</span>
                  <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm font-medium">
                    Agregar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-100 to-orange-100 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Nuestros Valores
            </span>
            <h2 className="text-4xl font-bold text-amber-900 mt-2">Cafe Sostenible</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">100% Organico</h3>
              <p className="text-gray-600">Granos de cafe cultivados de forma sostenible</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Tostado Artesanal</h3>
              <p className="text-gray-600">Tostamos nuestros granos en pequenos lotes</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Comercio Justo</h3>
              <p className="text-gray-600">Apoyamos directamente a los productores</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
          <div className="text-center mb-8">
            <ShoppingBag className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-amber-900">Pedidos Online</h2>
            <p className="text-gray-600 mt-2">Recibe tu cafe favorito en casa</p>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Nombre completo" value={pedidoForm?.nombre ?? ''} onChange={(e) => setPedidoForm(p => ({ ...p, nombre: e?.target?.value ?? '' }))} className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            <input type="email" placeholder="Email" value={pedidoForm?.email ?? ''} onChange={(e) => setPedidoForm(p => ({ ...p, email: e?.target?.value ?? '' }))} className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            <input type="tel" placeholder="Telefono" value={pedidoForm?.telefono ?? ''} onChange={(e) => setPedidoForm(p => ({ ...p, telefono: e?.target?.value ?? '' }))} className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            <textarea placeholder="Direccion de entrega" value={pedidoForm?.direccion ?? ''} onChange={(e) => setPedidoForm(p => ({ ...p, direccion: e?.target?.value ?? '' }))} rows={3} className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none" />
            <button className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Realizar Pedido
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-amber-900 to-orange-900 text-white text-center px-4">
        <h3 className="text-2xl font-bold mb-4">Te gusto este diseno?</h3>
        <p className="text-white/80 mb-6">Podemos crear un sitio web similar para tu cafeteria.</p>
        <Link href="/cotizador?paquete=profesional" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-amber-900 font-medium rounded-full hover:bg-amber-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Solicitar Cotizacion
        </Link>
      </section>
    </div>
  );
}
