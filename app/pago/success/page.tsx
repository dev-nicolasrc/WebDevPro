'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'success' | 'failure' | 'pending'>('success');

  useEffect(() => {
    const paymentStatus = searchParams.get('collection_status');
    if (paymentStatus === 'approved') {
      setStatus('success');
    } else if (paymentStatus === 'rejected') {
      setStatus('failure');
    } else {
      setStatus('pending');
    }
  }, [searchParams]);

  const statusConfig = {
    success: {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      title: '¡Pago Exitoso!',
      message: 'Tu pago ha sido procesado correctamente. Nos pondremos en contacto contigo pronto para iniciar tu proyecto.',
    },
    failure: {
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      title: 'Pago Rechazado',
      message: 'Hubo un problema al procesar tu pago. Por favor, intenta nuevamente o contacta con soporte.',
    },
    pending: {
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      title: 'Pago Pendiente',
      message: 'Tu pago está siendo procesado. Te notificaremos cuando se complete.',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center bg-white rounded-2xl p-12 shadow-xl"
        >
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${config.bgColor} flex items-center justify-center`}>
            <Icon className={`w-10 h-10 ${config.color}`} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{config.title}</h2>
          <p className="text-gray-600 mb-8">{config.message}</p>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full py-3 gradient-bg text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Inicio
            </Link>
            {status === 'failure' && (
              <Link
                href="/cotizador"
                className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                Intentar Nuevamente
              </Link>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
