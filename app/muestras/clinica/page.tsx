'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Stethoscope, Heart, Brain, Eye, Bone, Calendar, Phone, MapPin, Clock, ArrowLeft, User, Mail } from 'lucide-react';
import Link from 'next/link';

const especialidades = [
  { name: 'Cardiologia', icon: Heart, desc: 'Cuidado del corazon' },
  { name: 'Neurologia', icon: Brain, desc: 'Sistema nervioso' },
  { name: 'Oftalmologia', icon: Eye, desc: 'Salud visual' },
  { name: 'Traumatologia', icon: Bone, desc: 'Sistema oseo' },
];

const doctores = [
  { name: 'Dra. Maria Garcia', especialidad: 'Cardiologia', image: 'https://cdn.abacus.ai/images/a9a07a1e-aa85-498d-b516-1f1c9dec2cdd.png' },
  { name: 'Dr. Carlos Rodriguez', especialidad: 'Neurologia', image: 'https://cdn.abacus.ai/images/7a62ff01-05b6-40fa-903e-10d4e3f60a50.png' },
  { name: 'Dr. Roberto Kim', especialidad: 'Oftalmologia', image: 'https://cdn.abacus.ai/images/187cfd56-e863-44ad-b3a4-682dac54bf49.png' },
];

export default function ClinicaPage() {
  const [citaForm, setCitaForm] = useState({ nombre: '', email: '', telefono: '', fecha: '', especialidad: '', mensaje: '' });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Demo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center"><Stethoscope className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-bold text-gray-900">MediCare <span className="text-emerald-500">Plus</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {['Inicio', 'Servicios', 'Doctores', 'Citas']?.map((item) => (<button key={item} className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">{item}</button>))}
          </nav>
          <Link href="/cotizador?paquete=premium" className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-full hover:bg-emerald-600 transition-colors">Quiero uno asi</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-emerald-600 font-medium">Bienvenidos a MediCare Plus</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Tu Salud es Nuestra <span className="text-emerald-500">Prioridad</span></h1>
              <p className="text-lg text-gray-600 mb-8">Atencion medica de calidad con los mejores especialistas y tecnologia de vanguardia.</p>
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-full hover:bg-emerald-600 transition-colors flex items-center gap-2"><Calendar className="w-5 h-5" />Agendar Cita</button>
                <a href="tel:+573001234567" className="px-6 py-3 bg-white text-emerald-600 font-medium rounded-full border border-emerald-200 hover:bg-emerald-50 transition-colors flex items-center gap-2"><Phone className="w-5 h-5" />Llamar Ahora</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl"><Image src="https://cdn.abacus.ai/images/b9133c1e-32f9-4164-9e40-8e651eea82d6.png" alt="Clinic" fill className="object-cover" priority /></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-emerald-600 py-6">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-white">
          <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>Lun-Sab: 7:00 - 19:00</span></div>
          <div className="flex items-center gap-2"><MapPin className="w-5 h-5" /><span>Av. Salud 456, Centro Medico</span></div>
          <div className="flex items-center gap-2"><Phone className="w-5 h-5" /><span>+57 300 123 4567</span></div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12"><span className="text-emerald-600 font-medium">Nuestros Servicios</span><h2 className="text-4xl font-bold text-gray-900 mt-2">Especialidades Medicas</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {especialidades?.map((esp, i) => {
              const Icon = esp?.icon;
              return (
                <motion.div key={esp?.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-center group cursor-pointer">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors"><Icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" /></div>
                  <h3 className="text-lg font-semibold text-gray-900">{esp?.name}</h3>
                  <p className="text-sm text-gray-500 mt-2">{esp?.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-20 bg-gray-100 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12"><span className="text-emerald-600 font-medium">Equipo Medico</span><h2 className="text-4xl font-bold text-gray-900 mt-2">Nuestros Especialistas</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctores?.map((doc, i) => (
              <motion.div key={doc?.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="aspect-[3/4] relative"><Image src={doc?.image || ''} alt={doc?.name || ''} fill className="object-cover" /></div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{doc?.name}</h3>
                  <p className="text-emerald-600 font-medium mt-1">{doc?.especialidad}</p>
                  <button className="mt-4 px-6 py-2 bg-emerald-100 text-emerald-700 font-medium rounded-full hover:bg-emerald-200 transition-colors text-sm">Ver Perfil</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8"><Calendar className="w-12 h-12 text-emerald-500 mx-auto mb-4" /><h2 className="text-3xl font-bold text-gray-900">Agenda tu Cita</h2><p className="text-gray-500 mt-2">Completa el formulario y te contactaremos</p></div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Nombre completo" value={citaForm?.nombre ?? ''} onChange={(e) => setCitaForm(p => ({ ...p, nombre: e?.target?.value ?? '' }))} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" /></div>
              <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="email" placeholder="Email" value={citaForm?.email ?? ''} onChange={(e) => setCitaForm(p => ({ ...p, email: e?.target?.value ?? '' }))} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="tel" placeholder="Telefono" value={citaForm?.telefono ?? ''} onChange={(e) => setCitaForm(p => ({ ...p, telefono: e?.target?.value ?? '' }))} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" /></div>
              <input type="date" value={citaForm?.fecha ?? ''} onChange={(e) => setCitaForm(p => ({ ...p, fecha: e?.target?.value ?? '' }))} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <select value={citaForm?.especialidad ?? ''} onChange={(e) => setCitaForm(p => ({ ...p, especialidad: e?.target?.value ?? '' }))} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option value="">Selecciona especialidad</option>
              {especialidades?.map(e => (<option key={e?.name} value={e?.name}>{e?.name}</option>))}
            </select>
            <textarea placeholder="Describe tu consulta..." value={citaForm?.mensaje ?? ''} onChange={(e) => setCitaForm(p => ({ ...p, mensaje: e?.target?.value ?? '' }))} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            <button className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors">Solicitar Cita</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600 text-white text-center px-4">
        <h3 className="text-2xl font-bold mb-4">Te gusto este diseno?</h3>
        <p className="text-white/80 mb-6">Podemos crear un sitio web similar para tu clinica o consultorio.</p>
        <Link href="/cotizador?paquete=premium" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-emerald-600 font-medium rounded-full hover:bg-gray-100 transition-colors"><ArrowLeft className="w-4 h-4" />Solicitar Cotizacion</Link>
      </section>
    </div>
  );
}