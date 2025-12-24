export function Footer() {
  return (
    <footer className="relative py-12 border-t border-primary/20 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-black mb-4 glow-purple">NARUTO DARK</h3>
            <p className="text-muted-foreground">
              O melhor servidor de Minecraft com mods de Naruto. Entre para a aventura ninja!
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Links Rápidos</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#eventos" className="hover:text-primary transition-colors">
                  📋 Eventos
                </a>
              </li>
              <li>
                <a href="#staff" className="hover:text-primary transition-colors">
                  👥 Staff
                </a>
              </li>
              <li>
                <a href="#regras" className="hover:text-primary transition-colors">
                  📜 Regras
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Comunidade</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  💬 Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  📺 YouTube
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  📸 Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-muted-foreground border-t border-primary/20 pt-8">
          <p>© 2025 Naruto Dark. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
