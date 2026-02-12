import { Currency } from './currency';

export interface MercadoPagoConfig {
  accessToken: string;
  publicKey: string;
}

export interface PaymentPreference {
  title: string;
  description: string;
  price: number;
  currency: Currency;
  quantity: number;
  leadEmail: string;
  leadName: string;
  cotizacionId?: string;
}

export async function createMercadoPagoPreference(
  preference: PaymentPreference,
  config: MercadoPagoConfig
): Promise<{ id: string; init_point: string }> {
  const currencyMap: Record<Currency, string> = {
    USD: 'USD',
    COP: 'COP',
    MXN: 'MXN',
    ARS: 'ARS',
    CLP: 'CLP',
    PEN: 'PEN',
  };

  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
  console.log('🌐 Base URL for MercadoPago:', baseUrl);

  const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');
  const isSandboxMode = process.env.MERCADOPAGO_SANDBOX_MODE === 'true';

  console.log('🧪 Sandbox mode:', isSandboxMode ? 'ENABLED (Test)' : 'DISABLED (Production)');

  const body: any = {
    items: [
      {
        title: preference.title,
        description: preference.description,
        quantity: preference.quantity,
        unit_price: preference.price,
        currency_id: currencyMap[preference.currency],
      },
    ],
    payer: {
      email: preference.leadEmail,
      name: preference.leadName,
    },
    back_urls: {
      success: `${baseUrl}/pago/success`,
      failure: `${baseUrl}/pago/failure`,
      pending: `${baseUrl}/pago/pending`,
    },
    external_reference: preference.cotizacionId || '',
  };

  if (!isLocalhost) {
    body.auto_return = 'approved';
    body.notification_url = `${baseUrl}/api/webhooks/mercadopago`;
  }

  console.log('📦 MercadoPago preference body:', JSON.stringify(body, null, 2));

  const apiUrl = isSandboxMode
    ? 'https://api.mercadopago.com/checkout/preferences'
    : 'https://api.mercadopago.com/checkout/preferences';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.accessToken}`,
      ...(isSandboxMode && { 'X-Test-Scope': 'sandbox' }),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`MercadoPago API error: ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return {
    id: data.id,
    init_point: data.init_point,
  };
}

export async function getPaymentInfo(paymentId: string, accessToken: string) {
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch payment info');
  }

  return response.json();
}

export function getMercadoPagoConfig(): MercadoPagoConfig {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;

  if (!accessToken || !publicKey) {
    throw new Error('MercadoPago credentials not configured');
  }

  return {
    accessToken,
    publicKey,
  };
}
