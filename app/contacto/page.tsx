'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactoPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', tipoNegocio: '', mensaje: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    if (!formData?.nombre || !formData?.email || !formData?.mensaje) {
      toast?.error?.('Por favor completa los campos requeridos');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, fuente: 'contacto' }),
      });
      if (response?.ok) {
        setIsSubmitted(true);
        toast?.success?.('Mensaje enviado exitosamente!');
      } else {
        throw new Error('Error');
      }
    } catch (error) {
      toast?.error?.('Error al enviar mensaje');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-24 px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center bg-white rounded-2xl p-12 shadow-xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle className="w-10 h-10 text-green-500" /></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mensaje Enviado!</h2>
            <p className="text-gray-600">Gracias por contactarnos. Te responderemos pronto.</p>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 pb-24 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Hablemos de tu <span className="gradient-text">Proyecto</span></h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Estamos listos para ayudarte a crear la presencia web que tu negocio necesita.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="text-sm font-medium text-gray-700">Nombre *</label><input type="text" value={formData?.nombre ?? ''} onChange={(e) => setFormData(p => ({ ...p, nombre: e?.target?.value ?? '' }))} className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tu nombre" /></div>
                  <div><label className="text-sm font-medium text-gray-700">Email *</label><input type="email" value={formData?.email ?? ''} onChange={(e) => setFormData(p => ({ ...p, email: e?.target?.value ?? '' }))} className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="tu@email.com" /></div>
                  <div><label className="text-sm font-medium text-gray-700">Telefono</label><input type="tel" value={formData?.telefono ?? ''} onChange={(e) => setFormData(p => ({ ...p, telefono: e?.target?.value ?? '' }))} className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+57 300 000 0000" /></div>
                  <div><label className="text-sm font-medium text-gray-700">Tipo de Negocio</label><select value={formData?.tipoNegocio ?? ''} onChange={(e) => setFormData(p => ({ ...p, tipoNegocio: e?.target?.value ?? '' }))} className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option value="">Selecciona...</option><option value="restaurante">Restaurante</option><option value="hotel">Hotel</option><option value="clinica">Clinica</option><option value="otro">Otro</option></select></div>
                </div>
                <div className="mt-6"><label className="text-sm font-medium text-gray-700">Mensaje *</label><textarea value={formData?.mensaje ?? ''} onChange={(e) => setFormData(p => ({ ...p, mensaje: e?.target?.value ?? '' }))} rows={5} className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Cuentanos sobre tu proyecto..." /></div>
                <button type="submit" disabled={isSubmitting} className="mt-6 w-full py-4 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">{isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />Enviando...</> : <><Send className="w-5 h-5" />Enviar Mensaje</>}</button>
              </motion.form>
            </div>
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4"><Mail className="w-6 h-6 text-blue-600" /></div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">dev.nicolasrodriguez@gmail.com</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4"><Phone className="w-6 h-6 text-green-600" /></div>
                <h3 className="font-semibold text-gray-900 mb-2">Telefono</h3>
                <p className="text-gray-600">+57 300 123 4567</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4"><MapPin className="w-6 h-6 text-purple-600" /></div>
                <h3 className="font-semibold text-gray-900 mb-2">Ubicacion</h3>
                <p className="text-gray-600">Bogota, Colombia</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}