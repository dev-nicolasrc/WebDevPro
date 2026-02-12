export type Currency = 'USD' | 'COP' | 'MXN' | 'ARS' | 'CLP' | 'PEN';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
  rate: number;
}

export const CURRENCY_RATES: Record<Currency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'Dólar', rate: 1 },
  COP: { code: 'COP', symbol: '$', name: 'Peso Colombiano', rate: 4000 },
  MXN: { code: 'MXN', symbol: '$', name: 'Peso Mexicano', rate: 17 },
  ARS: { code: 'ARS', symbol: '$', name: 'Peso Argentino', rate: 350 },
  CLP: { code: 'CLP', symbol: '$', name: 'Peso Chileno', rate: 900 },
  PEN: { code: 'PEN', symbol: 'S/', name: 'Sol Peruano', rate: 3.7 },
};

export const COUNTRY_CURRENCY_MAP: Record<string, Currency> = {
  CO: 'COP',
  MX: 'MXN',
  AR: 'ARS',
  CL: 'CLP',
  PE: 'PEN',
  US: 'USD',
};

export function convertPrice(priceUSD: number, targetCurrency: Currency): number {
  const rate = CURRENCY_RATES[targetCurrency].rate;
  const converted = priceUSD * rate;
  
  if (targetCurrency === 'COP' || targetCurrency === 'CLP' || targetCurrency === 'ARS') {
    return Math.round(converted / 1000) * 1000;
  }
  
  return Math.round(converted);
}

export function formatPrice(price: number, currency: Currency): string {
  const config = CURRENCY_RATES[currency];
  
  if (currency === 'COP' || currency === 'CLP' || currency === 'ARS') {
    return `${config.symbol}${price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`;
  }
  
  return `${config.symbol}${price.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export async function detectUserCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code || 'CO';
  } catch (error) {
    return 'CO';
  }
}

export function getCurrencyFromCountry(countryCode: string): Currency {
  return COUNTRY_CURRENCY_MAP[countryCode] || 'COP';
}

export function useCurrency() {
  if (typeof window === 'undefined') {
    return { currency: 'COP' as Currency, setCurrency: () => {} };
  }

  const stored = localStorage.getItem('currency');
  const currency = (stored as Currency) || 'COP';

  const setCurrency = (newCurrency: Currency) => {
    localStorage.setItem('currency', newCurrency);
    window.location.reload();
  };

  return { currency, setCurrency };
}
