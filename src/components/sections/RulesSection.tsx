'use client';

const RULES = [
  {
    title: '🚫 Uso de Itens VIP sem ser VIP',
    content: `Primeira Infração: 1d Jail
Segunda Infração: 7d Jail
Terceira Infração: 14d Jail
Quarta Infração: Banimento pela temporada

Se algum player VIP dropar itens que só conseguem na /warp vip, os dois deverão ser punidos.`,
  },
  {
    title: '⚠️ Uso de AutoClick, Macros ou Hacks',
    content: `Primeira Infração: 24h Jail
Segunda Infração: Banimento pela temporada

Inclui qualquer tipo de programa que te dê vantagens no jogo tipo Auto-Click, Macros e Hacks.`,
  },
  {
    title: '🐛 Abuso de Bugs',
    content: `Primeira Infração: Dependendo do bug pode ser 1d de jail ou Banimento

Aplica a qualquer tipo de bug que forneça vantagens ao jogador.`,
  },
  {
    title: '🎮 Anti-Jogo',
    content: `Primeira Infração: 8h Jail
Segunda Infração: 3d Jail
Terceira Infração: 1 semana Jail
Quarta Infração: Banimento pela temporada

Aplica a qualquer comportamento que prejudique a experiência de jogo.`,
  },
  {
    title: '🛡️ Ataques em Zonas Seguras',
    content: `Primeira Infração: 8h Jail
Segunda Infração: 3d Jail
Terceira Infração: 1 Semana Jail
Quarta Infração: Banimento pela temporada

Inclui qualquer tipo de ataque em zonas seguras com a intenção de atrapalhar o farm ou a experiência do player.`,
  },
  {
    title: '📬 Flood de TPA',
    content: `Primeira Infração: 4h Jail
Segunda Infração: 8d Jail
Terceira Infração: 3d Jail

Exemplo: Ficar floodando TPA no outro para atrapalhar em eventos/quests.`,
  },
  {
    title: '🏋️ Treinar na Training Errada',
    content: `Primeira Infração: 1d Jail
Segunda Infração: 4d Jail
Terceira Infração: 7d Jail
Quarta Infração: Banimento pela temporada

Exemplo: Player do rank Akatsuki treinando na Nukenin.`,
  },
  {
    title: '💬 Uso Excessivo de Capslock/Flood/Spam',
    content: `Primeira Infração: 1h Mute
Segunda Infração: 4h Mute
Terceira Infração: 3h Mute + 3h Jail

Exemplo: ALGUEM ME DA 20K (repetidamente).`,
  },
  {
    title: '😡 Ofensa a Jogador/Staff',
    content: `Primeira Infração: 1h Mute
Segunda Infração: 1d Mute
Terceira Infração: 3d Mute

Qualquer tipo de ofensa direcionada a outros jogadores ou membros da staff.`,
  },
  {
    title: '📞 Flood de /tell',
    content: `Primeira Infração: 30m Mute
Segunda Infração: 2h Mute
Terceira Infração: 1d Mute + 1d Jail

Exemplo: Ficar mandando mensagens repetitivas no /tell de um player.`,
  },
  {
    title: '⛔ Banimento Direto',
    content: `As seguintes infrações resultam em banimento imediato:

• Ajuda em sagas secretas/JK
• Uso de Hacks
• 3 contas ou mais
• Fraudes
• Dupagem e/ou duplicação de itens`,
  },
];

export function RulesSection() {
  return (
    <>
      {/* Parallax Header */}
      <header className="rules-parallax-header">
        {/* First container - Solid with gradient text clipping */}
        <div className="rules-container rules-container-solid">
          <div className="rules-title-wrapper">
            <h1>📜 Regras do Servidor</h1>
          </div>
        </div>

        {/* Second container - Image background with white text */}
        <div className="rules-container rules-container-image" aria-hidden="true">
          <div className="rules-title-wrapper">
            <h1>📜 Regras do Servidor</h1>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <section className="rules-content-section">
        <h2>⚖️ Código de Conduta</h2>
        <p className="rules-intro">
          Leia atentamente as regras para garantir uma experiência justa e divertida para todos
          os jogadores. O respeito e fair play são fundamentais no Naruto Dark.
        </p>

        <div className="rules-grid">
          {RULES.map((rule) => (
            <article key={rule.title} className="rules-card">
              <h3>{rule.title}</h3>
              <p>{rule.content}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
