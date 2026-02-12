'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Calculator, Check, ArrowRight, Loader2, CheckCircle, UtensilsCrossed, Building2, Stethoscope, Building } from 'lucide-react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { convertPrice, formatPrice, detectUserCountry, getCurrencyFromCountry, type Currency } from '@/lib/currency';

const tiposNegocio = [
  { id: 'restaurante', name: 'Restaurante', icon: UtensilsCrossed },
  { id: 'hotel', name: 'Hotel', icon: Building2 },
  { id: 'clinica', name: 'Clinica', icon: Stethoscope },
  { id: 'otro', name: 'Otro', icon: Building },
];

const tiposSitio = [
  { id: 'landing', name: 'Landing Page', precioUSD: 200, paginas: 1 },
  { id: 'completo', name: 'Sitio Completo', precioUSD: 450, paginas: 5 },
  { id: 'premium', name: 'Premium', precioUSD: 800, paginas: 10 },
  { id: 'ecommerce', name: 'E-commerce', precioUSD: 1200, paginas: 15 },
];

const caracteristicasOpcionales = [
  { id: 'formularioContacto', name: 'Formulario de Contacto', precioUSD: 0 },
  { id: 'galeriaImagenes', name: 'Galeria de Imagenes', precioUSD: 40 },
  { id: 'sistemaReservas', name: 'Sistema de Reservas', precioUSD: 120 },
  { id: 'blog', name: 'Blog Integrado', precioUSD: 80 },
  { id: 'redesSociales', name: 'Integracion Redes Sociales', precioUSD: 20 },
  { id: 'disenoPersonalizado', name: 'Diseno 100% Personalizado', precioUSD: 150 },
  { id: 'seoAvanzado', name: 'SEO Avanzado', precioUSD: 100 },
];

export default function CotizadorPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [tipoNegocio, setTipoNegocio] = useState('');
  const [tipoSitio, setTipoSitio] = useState('');
  const [numeroPaginas, setNumeroPaginas] = useState(5);
  const [caracteristicas, setCaracteristicas] = useState<Record<string, boolean>>({ formularioContacto: true });
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', descripcion: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currency, setCurrency] = useState<Currency>('COP');
  const [cotizacionId, setCotizacionId] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const paquete = searchParams?.get('paquete');
    if (paquete) {
      const mapping: Record<string, string> = { basico: 'landing', básico: 'landing', profesional: 'completo', premium: 'premium', 'e-commerce': 'ecommerce' };
      setTipoSitio(mapping[paquete] || '');
      if (mapping[paquete]) setStep(2);
    }
  }, [searchParams]);

  const calcularPrecioUSD = () => {
    const sitioSeleccionado = tiposSitio?.find(s => s?.id === tipoSitio);
    let precioUSD = sitioSeleccionado?.precioUSD ?? 0;
    const paginasBase = sitioSeleccionado?.paginas ?? 1;
    if (numeroPaginas > paginasBase) {
      precioUSD += (numeroPaginas - paginasBase) * 20;
    }
    Object.entries(caracteristicas ?? {})?.forEach(([key, value]) => {
      if (value) {
        const carac = caracteristicasOpcionales?.find(c => c?.id === key);
        precioUSD += carac?.precioUSD ?? 0;
      }
    });
    return precioUSD;
  };

  const calcularPrecioLocal = () => {
    return convertPrice(calcularPrecioUSD(), currency);
  };

  const handleSubmit = async () => {
    if (!formData?.nombre || !formData?.email) {
      toast?.error?.('Por favor completa nombre y email');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tipoNegocio,
          tipoSitio,
          caracteristicas: { numeroPaginas, ...caracteristicas },
          precioEstimado: calcularPrecioUSD(),
          moneda: currency,
          precioLocal: calcularPrecioLocal()
        }),
      });
      if (response?.ok) {
        const data = await response.json();
        setCotizacionId(data.cotizacionId);
        localStorage.setItem('cotizacionId', data.cotizacionId);
        setIsSubmitted(true);
        toast?.success?.('Cotizacion enviada exitosamente!');
      } else {
        throw new Error('Error');
      }
    } catch (error) {
      toast?.error?.('Error al enviar cotizacion');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayNow = async () => {
    setIsSubmitting(true);
    try {
      const paymentCotizacionId = cotizacionId || localStorage.getItem('cotizacionId');

      const response = await fetch('/api/pagos/create-quotation-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cotizacionId: paymentCotizacionId,
          moneda: currency,
        }),
      });

      const data = await response.json();

      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        toast?.error?.('Error al crear la preferencia de pago');
      }
    } catch (error) {
      toast?.error?.('Error al procesar el pago');
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cotizacion Enviada!</h2>
            <p className="text-gray-600 mb-6">Gracias {formData?.nombre}. Hemos recibido tu solicitud de cotizacion por <span className="font-semibold text-blue-600">{formatPrice(calcularPrecioLocal(), currency)} {currency}</span>.</p>
            <p className="text-gray-500 text-sm mb-8">Te contactaremos pronto a {formData?.email}</p>

            <div className="space-y-3">
              <button
                onClick={handlePayNow}
                disabled={isSubmitting}
                className="w-full py-4 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    Pagar Ahora - {formatPrice(calcularPrecioLocal(), currency)} {currency}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500">O espera a que te contactemos para coordinar el pago</p>
            </div>
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
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4"><Calculator className="w-4 h-4" /><span className="text-sm font-medium">Cotizador Interactivo</span></div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Calcula el Precio de tu <span className="gradient-text">Sitio Web</span></h1>
            <p className="text-lg text-gray-600">Personaliza tu proyecto y obtiene una cotizacion al instante.</p>
          </motion.div>

          <div className="flex items-center justify-center mb-12 gap-2">
            {[1, 2, 3, 4]?.map((s) => (<div key={s} className={`w-3 h-3 rounded-full transition-all ${step >= s ? 'bg-blue-600' : 'bg-gray-300'}`} />))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {step >= 1 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Tipo de Negocio</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {tiposNegocio?.map((tipo) => {
                      const Icon = tipo?.icon;
                      return (
                        <button key={tipo?.id} onClick={() => { setTipoNegocio(tipo?.id ?? ''); if (!tipoSitio) setStep(2); }} className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${tipoNegocio === tipo?.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          {Icon && <Icon className={`w-6 h-6 ${tipoNegocio === tipo?.id ? 'text-blue-600' : 'text-gray-500'}`} />}
                          <span className={`text-sm font-medium ${tipoNegocio === tipo?.id ? 'text-blue-600' : 'text-gray-700'}`}>{tipo?.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step >= 2 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Tipo de Sitio Web</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {tiposSitio?.map((tipo) => {
                      const precioLocal = convertPrice(tipo?.precioUSD ?? 0, currency);
                      return (
                        <button key={tipo?.id} onClick={() => { setTipoSitio(tipo?.id ?? ''); setNumeroPaginas(tipo?.paginas ?? 1); setStep(3); }} className={`p-4 rounded-xl border-2 transition-all text-left ${tipoSitio === tipo?.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <span className={`text-sm font-medium ${tipoSitio === tipo?.id ? 'text-blue-600' : 'text-gray-700'}`}>{tipo?.name}</span>
                          <div className="mt-1"><span className="text-lg font-bold text-gray-900">{formatPrice(precioLocal, currency)}</span><span className="text-gray-500 text-sm"> {currency}</span></div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step >= 3 && tipoSitio && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Caracteristicas Adicionales</h3>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Numero de Paginas: {numeroPaginas}</label>
                    <input type="range" min={1} max={20} value={numeroPaginas} onChange={(e) => setNumeroPaginas(parseInt(e?.target?.value ?? '1'))} className="w-full mt-2" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {caracteristicasOpcionales?.map((carac) => {
                      const precioLocal = convertPrice(carac?.precioUSD ?? 0, currency);
                      return (
                        <label key={carac?.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${caracteristicas?.[carac?.id ?? ''] ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input type="checkbox" checked={caracteristicas?.[carac?.id ?? ''] ?? false} onChange={(e) => setCaracteristicas(prev => ({ ...(prev ?? {}), [carac?.id ?? '']: e?.target?.checked ?? false }))} className="sr-only" />
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${caracteristicas?.[carac?.id ?? ''] ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                            {caracteristicas?.[carac?.id ?? ''] && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-1"><span className="text-sm font-medium text-gray-700">{carac?.name}</span></div>
                          {(carac?.precioUSD ?? 0) > 0 && <span className="text-sm text-blue-600 font-medium">+{formatPrice(precioLocal, currency)}</span>}
                        </label>
                      );
                    })}
                  </div>
                  <button onClick={() => setStep(4)} className="mt-6 w-full py-3 gradient-bg text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    Continuar<ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step >= 4 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">4. Tus Datos de Contacto</h3>
                  <div className="space-y-4">
                    <div><label className="text-sm font-medium text-gray-700">Nombre *</label><input type="text" value={formData?.nombre ?? ''} onChange={(e) => setFormData(prev => ({ ...(prev ?? {}), nombre: e?.target?.value ?? '' }))} className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tu nombre" /></div>
                    <div><label className="text-sm font-medium text-gray-700">Email *</label><input type="email" value={formData?.email ?? ''} onChange={(e) => setFormData(prev => ({ ...(prev ?? {}), email: e?.target?.value ?? '' }))} className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="tu@email.com" /></div>
                    <div><label className="text-sm font-medium text-gray-700">Telefono</label><input type="tel" value={formData?.telefono ?? ''} onChange={(e) => setFormData(prev => ({ ...(prev ?? {}), telefono: e?.target?.value ?? '' }))} className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+57 300 000 0000" /></div>
                    <div><label className="text-sm font-medium text-gray-700">Descripcion del Proyecto</label><textarea value={formData?.descripcion ?? ''} onChange={(e) => setFormData(prev => ({ ...(prev ?? {}), descripcion: e?.target?.value ?? '' }))} rows={3} className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Cuentanos sobre tu proyecto..." /></div>
                    <button onClick={handleSubmit} disabled={isSubmitting} className="w-full py-4 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                      {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />Enviando...</> : <>Solicitar Cotizacion - {formatPrice(calcularPrecioLocal(), currency)} {currency}</>}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Tipo de negocio</span><span className="font-medium">{tiposNegocio?.find(t => t?.id === tipoNegocio)?.name || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Tipo de sitio</span><span className="font-medium">{tiposSitio?.find(t => t?.id === tipoSitio)?.name || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Paginas</span><span className="font-medium">{numeroPaginas}</span></div>
                  <div className="border-t pt-3 mt-3">
                    {Object.entries(caracteristicas ?? {})?.filter(([, v]) => v)?.map(([key]) => {
                      const c = caracteristicasOpcionales?.find(x => x?.id === key);
                      const precioLocal = c ? convertPrice(c.precioUSD, currency) : 0;
                      return c && <div key={key} className="flex justify-between text-xs text-gray-500 mb-1"><span>{c?.name}</span>{(c?.precioUSD ?? 0) > 0 && <span>+{formatPrice(precioLocal, currency)}</span>}</div>;
                    })}
                  </div>
                </div>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-baseline"><span className="text-gray-700 font-medium">Total Estimado</span><div><span className="text-3xl font-bold gradient-text">{formatPrice(calcularPrecioLocal(), currency)}</span><span className="text-gray-500 ml-1 text-sm">{currency}</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}