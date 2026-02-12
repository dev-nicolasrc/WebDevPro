import Header from '@/components/header';
import Hero from '@/components/hero';
import ServicesSection from '@/components/services-section';
import PortfolioPreview from '@/components/portfolio-preview';
import TestimonialsSection from '@/components/testimonials-section';
import CTASection from '@/components/cta-section';
import Footer from '@/components/footer';

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <ServicesSection />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}