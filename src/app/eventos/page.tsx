import { Background3D } from "@/components/3d/Background3D";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventsCalendar } from "@/components/sections/EventsCalendar";

export default function EventosPage() {
  return (
    <>
      <Background3D />
      <Navbar />
      <main className="relative z-10">
        <EventsCalendar />
      </main>
      <Footer />
    </>
  );
}
