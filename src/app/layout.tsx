import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/wrappers/ClientProviders";
import { WelcomeScreen } from "@/components/WelcomeScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naruto Dark - Servidor Oficial",
  description: "O melhor servidor de Minecraft com mods de Naruto. Participe de eventos épicos como Akatsuki e Kage!",
  icons: {
    icon: "/narutologo.png",
    apple: "/narutologo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WelcomeScreen />
        
        {/* Players Counter & Version Badge */}
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
          {/* Players Counter */}
          <div className="relative animate-bounce-in" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-60"></div>
            <div className="relative pointer-events-auto">
              <img 
                src="/players.png" 
                alt="Players Online" 
                className="w-32 h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Version Badge */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative px-4 py-2 bg-black/80 backdrop-blur-md border border-primary/30 rounded-full pointer-events-auto">
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PATCH 15.1
              </span>
            </div>
          </div>
        </div>

        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
