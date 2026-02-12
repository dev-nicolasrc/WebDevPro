'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, Palette } from 'lucide-react';

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  {
    name: 'Portfolio',
    href: '#',
    submenu: [
      { name: 'Restaurante', href: '/muestras/restaurante' },
      { name: 'Hotel', href: '/muestras/hotel' },
      { name: 'Clinica', href: '/muestras/clinica' },
    ],
  },
  { name: 'Cotizador', href: '/cotizador' },
  { name: 'Contacto', href: '/contacto' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              WebDev <span className="gradient-text">Pro</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems?.map((item) => (
              <div
                key={item?.name}
                className="relative"
                onMouseEnter={() => item?.submenu && setOpenSubmenu(item?.name)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                {item?.submenu ? (
                  <button
                    className={`px-4 py-2 rounded-lg flex items-center gap-1 transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'}`}
                  >
                    {item?.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={item?.href || '#'}
                    className={`px-4 py-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'}`}
                  >
                    {item?.name}
                  </Link>
                )}
                <AnimatePresence>
                  {item?.submenu && openSubmenu === item?.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      {item?.submenu?.map((subItem) => (
                        <Link
                          key={subItem?.name}
                          href={subItem?.href || '#'}
                          className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {subItem?.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/cotizador"
              className="px-6 py-2.5 rounded-full gradient-bg text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Cotizar Ahora
              </span>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navItems?.map((item) => (
                  <div key={item?.name}>
                    {item?.submenu ? (
                      <div>
                        <button
                          onClick={() => setOpenSubmenu(openSubmenu === item?.name ? null : item?.name)}
                          className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                        >
                          {item?.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === item?.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openSubmenu === item?.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 space-y-1"
                            >
                              {item?.submenu?.map((subItem) => (
                                <Link
                                  key={subItem?.name}
                                  href={subItem?.href || '#'}
                                  className="block px-4 py-2 text-gray-600 hover:text-blue-600"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subItem?.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item?.href || '#'}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item?.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Link
                  href="/cotizador"
                  className="block w-full text-center px-6 py-3 rounded-full gradient-bg text-white font-medium mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cotizar Ahora
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}