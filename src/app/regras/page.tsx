import { Background3D } from '@/components/3d/Background3D';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RulesSection } from '@/components/sections/RulesSection';

export default function RulesPage() {
  return (
    <>
      <Background3D />
      <Navbar />
      <main className="relative">
        <RulesSection />
      </main>
      <Footer />
    </>
  );
}
