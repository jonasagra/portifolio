import HeroSection from '@/components/HeroSection';
import HomeContent from '@/components/HomeContent';

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-950 overflow-x-hidden">
      <HeroSection />
      <HomeContent />
    </main>
  );
}
