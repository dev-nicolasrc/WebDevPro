'use client';

import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Check, CreditCard, Shield, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { PAQUETES } from '@/lib/types';
import { convertPrice, formatPrice, detectUserCountry, getCurrencyFromCountry, type Currency } from '@/lib/currency';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paqueteNombre = searchParams.get('paquete');
  
  const [currency, setCurrency] = useState<Currency>('COP');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
  });

  const paquete = PAQUETES.find(p => p.nombre.toLowerCase() === paqueteNombre?.toLowerCase());

  useEffect(() => {
    if (!paquete) {
      router.push('/');
      return;
    }

    const stored = localStorage.getItem('currency');
    if (stored) {
      setCurrency(stored as Currency);
    } else {
      detectUserCountry().then((country) => {
        const detectedCurrency = getCurrencyFromCountry(country);
        setCurrency(detectedCurrency);
        localStorage.setItem('currency', detectedCurrency);
      });
    }
  }, [paquete, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/pagos/create-package-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          paquete: paquete?.nombre,
          precio: convertPrice(paquete?.precioUSD ?? 0, currency),
          moneda: currency,
        }),
      });

      const data = await response.json();

      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        toast.error('Error al crear la preferencia de pago');
      }
    } catch (error) {
      toast.error('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  if (!paquete) {
    return null;
  }

  const precioLocal = convertPrice(paquete.precioUSD, currency);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-2 text-green-600 mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Pago 100% Seguro</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Completa tu Compra</h1>
            <p className="text-gray-600 mb-8">Ingresa tus datos para proceder con el pago seguro a través de Mercado Pago</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="juan@ejemplo.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="+57 300 123 4567"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Empresa (opcional)
                </label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  placeholder="Mi Empresa S.A.S"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Pago Seguro con Mercado Pago</p>
                    <p className="text-blue-700">Tus datos están protegidos. Serás redirigido a Mercado Pago para completar el pago de forma segura.</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Proceder al Pago
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Al continuar, aceptas nuestros términos y condiciones
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen de Compra</h2>
              
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{paquete.nombre}</h3>
                    <p className="text-sm text-gray-600 mt-1">{paquete.descripcion}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900 text-sm">Incluye:</h4>
                {paquete.caracteristicas.slice(0, 6).map((caracteristica, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{caracteristica}</span>
                  </div>
                ))}
                {paquete.caracteristicas.length > 6 && (
                  <p className="text-sm text-blue-600 font-medium">
                    +{paquete.caracteristicas.length - 6} características más
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(precioLocal, currency)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Impuestos</span>
                  <span>Incluidos</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold gradient-text">
                      {formatPrice(precioLocal, currency)}
                    </div>
                    <div className="text-sm text-gray-500">{currency}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <Shield className="w-5 h-5" />
                  <Lock className="w-5 h-5" />
                  <CreditCard className="w-5 h-5" />
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Pago procesado de forma segura por Mercado Pago
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
