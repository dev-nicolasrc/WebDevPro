import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import { Target, Users, Award, Rocket, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-blue-600 to-teal-500">
        <div className="max-w-[1200px] mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Somos expertos en crear sitios web que impulsan negocios.</p>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Transformamos Negocios con <span className="gradient-text">Tecnologia Web</span></h2>
              <p className="text-gray-600 mb-6">En WebDev Pro nos especializamos en crear sitios web profesionales para restaurantes, hoteles y clinicas. Entendemos las necesidades unicas de cada industria y creamos soluciones que generan resultados.</p>
              <ul className="space-y-3">
                {['Mas de 50 proyectos entregados', 'Especializacion en nichos especificos', 'Soporte continuo post-lanzamiento', 'Disenos 100% personalizados']?.map((item) => (<li key={item} className="flex items-center gap-3 text-gray-700"><CheckCircle className="w-5 h-5 text-green-500" /><span>{item}</span></li>))}
              </ul>
            </div>
            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl"><Image src="https://cdn.abacus.ai/images/4f803a2a-7dee-487e-8f6b-f0105f8f4342.png" alt="Team" fill className="object-cover" /></div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Target, title: 'Enfoque', desc: 'Nos enfocamos en resultados medibles para tu negocio.' },
              { icon: Users, title: 'Colaboracion', desc: 'Trabajamos de la mano contigo en cada paso.' },
              { icon: Award, title: 'Calidad', desc: 'Entregamos sitios web de alta calidad, siempre.' },
              { icon: Rocket, title: 'Innovacion', desc: 'Usamos las ultimas tecnologias del mercado.' },
            ]?.map((item) => {
              const Icon = item?.icon;
              return (<div key={item?.title} className="text-center p-6"><div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center"><Icon className="w-8 h-8 text-white" /></div><h3 className="text-xl font-semibold text-gray-900 mb-2">{item?.title}</h3><p className="text-gray-600">{item?.desc}</p></div>);
            })}
          </div>
        </div>
      </section>
      <section className="py-20 gradient-bg px-4">
        <div className="max-w-[1200px] mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Listo para Comenzar?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Hablemos sobre como podemos ayudarte a crear la presencia web que tu negocio merece.</p>
          <Link href="/cotizador" className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105">Solicitar Cotizacion</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}