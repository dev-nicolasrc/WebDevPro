import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from 'sonner';
import ChatbotWidget from '@/components/chatbot-widget';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'WebDev Pro | Desarrollo Web Profesional para tu Negocio',
  description: 'Creamos sitios web profesionales para restaurantes, hoteles y clínicas. Diseño moderno, optimizado para conversiones y totalmente responsive.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'WebDev Pro | Desarrollo Web Profesional',
    description: 'Sitios web que generan resultados para tu negocio',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
          <ChatbotWidget />
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}