import { Hero } from '@/components/Hero/Hero';
import { Atmosphere } from '@/components/Atmosphere/Atmosphere';
import { OurMenu } from '@/components/OurMenu/OurMenu';
import { About } from '@/components/About/About';
import { Gallery } from '@/components/Gallery/Gallery';
import { Reviews } from '@/components/Reviews/Reviews';
import { CoffeeQuiz } from '@/components/CoffeeQuiz/CoffeeQuiz';
import { CoffeeOrigins } from '@/components/CoffeeOrigins/CoffeeOrigins';
import { Events } from '@/components/Events/Events';
import { ContactForm } from '@/components/ContactForm/ContactForm';
import { ToastContainer } from 'react-toastify';

async function getHeroData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/hero`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch hero data');
    const result = await response.json();
    return result.data ?? result;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

export default async function Home() {
  const heroData = await getHeroData();

  return (
    <main>
      <Hero initialHero={heroData} />
      <Atmosphere />
      <OurMenu />
      <About />
      <Gallery />
      <CoffeeQuiz />
      <CoffeeOrigins />
      <Events />
      <ContactForm />
      <Reviews />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}
