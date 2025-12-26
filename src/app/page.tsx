import { Background3D } from '@/components/3d/Background3D';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { CinematicEventsSection } from '@/components/sections/CinematicEventsSection';
import { StaffSection } from '@/components/sections/StaffSection';
import { getEvents, getTimeline } from '@/actions/server';

export default async function Home() {
  const [events, timeline] = await Promise.all([
    getEvents(),
    getTimeline(),
  ]);

  return (
    <>
      <Background3D />
      <Navbar />
      
      <main className="relative">
        <HeroSection />
        <TimelineSection events={timeline} />
        <CinematicEventsSection />
        <StaffSection />
        
        {/* About Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-8 glow-purple">
                ⚡ SOBRE O SERVIDOR
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Bem-vindo ao <span className="glow-orange font-bold">Naruto Dark</span>, onde os limites entre
                Minecraft e o universo ninja se dissolvem. Aqui, você não apenas joga — você vive.
                Domine jutsus lendários, ascenda à elite da Akatsuki, dispute o título de Kage.
                Cada batalha importa. Cada escolha define seu legado.
                <span className="block mt-4 text-primary font-semibold">
                  Mais de 1000 ninjas online. Uma comunidade. Um destino.
                </span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/20">
                  <div className="text-4xl mb-4">🥷</div>
                  <h3 className="font-bold text-xl mb-2">Clãs & Jutsus</h3>
                  <p className="text-muted-foreground">
                    Escolha seu clã e aprenda jutsus poderosos
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-secondary/20">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="font-bold text-xl mb-2">Comunidade Ativa</h3>
                  <p className="text-muted-foreground">
                    Mais de 60 jogadores online diariamente
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/20">
                  <div className="text-4xl mb-4">🎭</div>
                  <h3 className="font-bold text-xl mb-2">Eventos Épicos</h3>
                  <p className="text-muted-foreground">
                    Participe de guerras, torneios e seleções
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
