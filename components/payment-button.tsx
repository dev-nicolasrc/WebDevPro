'use client';

import { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentButtonProps {
  cotizacionId: string;
  leadId: string;
  monto: number;
  moneda: string;
  disabled?: boolean;
}

export default function PaymentButton({
  cotizacionId,
  leadId,
  monto,
  moneda,
  disabled = false,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/pagos/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cotizacionId,
          leadId,
          country: 'CO',
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear preferencia de pago');
      }

      const data = await response.json();

      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        throw new Error('No se recibió URL de pago');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error('Error al procesar el pago. Intenta nuevamente.');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className="w-full py-4 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Procesando...
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5" />
          Pagar {monto.toLocaleString()} {moneda}
        </>
      )}
    </button>
  );
}
