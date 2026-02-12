export interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  tipoNegocio?: string;
  fuente: string;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cotizacion {
  id: string;
  leadId: string;
  tipoSitio: string;
  caracteristicas: CotizacionCaracteristicas;
  precioEstimado: number;
  descripcion?: string;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CotizacionCaracteristicas {
  numeroPaginas: number;
  formularioContacto: boolean;
  galeriaImagenes: boolean;
  sistemaReservas: boolean;
  blog: boolean;
  redesSociales: boolean;
  disenoPersonalizado: boolean;
  seoAvanzado: boolean;
}

export interface Reunion {
  id: string;
  leadId: string;
  fechaReunion: Date;
  horaReunion: string;
  estado: string;
  notas?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversacionChatbot {
  id: string;
  leadId?: string;
  mensajes: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Paquete {
  nombre: string;
  precioUSD: number;
  descripcion: string;
  caracteristicas: string[];
  popular?: boolean;
}

export const PAQUETES: Paquete[] = [
  {
    nombre: 'Básico',
    precioUSD: 200,
    descripcion: 'Landing page profesional',
    caracteristicas: [
      'Diseño profesional',
      '1 página principal',
      'Formulario de contacto',
      'Responsive (móvil/desktop)',
      'Optimización SEO básica',
      'Entrega en 7 días',
    ],
  },
  {
    nombre: 'Profesional',
    precioUSD: 450,
    descripcion: 'Sitio web completo (5-7 páginas)',
    caracteristicas: [
      'Diseño personalizado',
      '5-7 páginas',
      'Galería de imágenes',
      'Formularios avanzados',
      'Blog integrado',
      'SEO optimizado',
      'Integración redes sociales',
      'Entrega en 14 días',
    ],
    popular: true,
  },
  {
    nombre: 'Premium',
    precioUSD: 800,
    descripcion: 'Sitio web avanzado con funcionalidades especiales',
    caracteristicas: [
      'Diseño exclusivo',
      'Hasta 15 páginas',
      'Sistema de reservas',
      'Panel de administración',
      'Chat en vivo',
      'Animaciones personalizadas',
      'SEO avanzado',
      'Soporte prioritario',
      'Entrega en 21 días',
    ],
  },
  {
    nombre: 'E-commerce',
    precioUSD: 1200,
    descripcion: 'Tienda online completa',
    caracteristicas: [
      'Tienda online completa',
      'Catálogo de productos ilimitado',
      'Carrito de compras',
      'Pasarela de pagos',
      'Gestión de inventario',
      'Panel de administración',
      'Reportes de ventas',
      'SEO para e-commerce',
      'Entrega en 30 días',
    ],
  },
];