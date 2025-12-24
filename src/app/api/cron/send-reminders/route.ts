import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

const EVENTS_SCHEDULE = {
  "Terça-Feira": { hour: 20, events: ["Evento Orbe 3x", "Evento Top 1/2/3 do PvP"] },
  "Quinta-Feira": { hour: 20, events: ["Evento Orbe 3x", "Evento Sumô"] },
  "Sexta-Feira": { hour: 20, events: ["Evento Rank Lendário", "Evento Death Run"] },
  "Sábado": { hour: 20, events: ["Evento Orbe 3x", "Evento Hyuuga, Uchiha & Uzumaki Dominante"] },
  "Domingo": { hour: 20, events: ["Evento Mito do PvP", "Evento Parkour"] },
};

const DAY_MAP: Record<number, string> = {
  0: "Domingo",
  1: "Segunda-Feira",
  2: "Terça-Feira",
  3: "Quarta-Feira",
  4: "Quinta-Feira",
  5: "Sexta-Feira",
  6: "Sábado",
};

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const currentDay = DAY_MAP[now.getDay()];
    const currentHour = now.getHours();
    
    const schedule = EVENTS_SCHEDULE[currentDay as keyof typeof EVENTS_SCHEDULE];
    
    if (!schedule) {
      return NextResponse.json({ message: "No events today" });
    }

    if (currentHour === schedule.hour - 1) {
      const subscriptions = await prisma.subscription.findMany({
        where: {
          days: {
            has: currentDay,
          },
        },
      });

      const emailPromises = subscriptions.map((sub: { email: string }) =>
        resend.emails.send({
          from: "Naruto Dark <onboarding@resend.dev>",
          to: sub.email,
          subject: `⏰ Evento em 1 hora! - ${currentDay}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 40px 20px;">
                    <table role="presentation" style="max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);">
                      
                      <tr>
                        <td style="padding: 0;">
                          <img src="https://narutoplayers.vercel.app/email.png" alt="Naruto Dark RP" style="width: 100%; height: auto; display: block; border-radius: 16px 16px 0 0;" />
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="background: linear-gradient(90deg, #ff0000 0%, #ff6b00 25%, #ff8c00 50%, #ff6b00 75%, #ff0000 100%); padding: 4px 0;"></td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 50px 40px;">
                          <table role="presentation" style="margin: 0 auto 30px; width: 80px; height: 80px; background: linear-gradient(135deg, #ff0000, #ff6b00); border-radius: 50%; box-shadow: 0 10px 30px rgba(255, 0, 0, 0.5), 0 0 0 8px rgba(255, 0, 0, 0.1);">
                            <tr>
                              <td style="text-align: center; vertical-align: middle; font-size: 45px;">⏰</td>
                            </tr>
                          </table>
                          
                          <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; text-align: center; margin: 0 0 10px 0; letter-spacing: -0.5px; text-transform: uppercase;">Evento Começando!</h1>
                          
                          <p style="color: rgba(255, 255, 255, 0.7); font-size: 18px; text-align: center; margin: 0 0 40px 0; line-height: 1.6;">
                            O servidor está te esperando, ninja! 🥷
                          </p>
                          
                          <table role="presentation" style="width: 100%; background: linear-gradient(135deg, rgba(255, 0, 0, 0.15), rgba(255, 107, 0, 0.15)); border-radius: 12px; border: 2px solid rgba(255, 107, 0, 0.3); margin-bottom: 30px; box-shadow: 0 10px 30px rgba(255, 107, 0, 0.2);">
                            <tr>
                              <td style="padding: 35px; text-align: center;">
                                <p style="color: #ff6b00; margin: 0 0 20px 0; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Hoje • ${currentDay}</p>
                                
                                <div style="background: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.1);">
                                  <p style="color: #ffffff; font-size: 56px; font-weight: 800; margin: 0; line-height: 1; text-shadow: 0 0 20px rgba(255, 107, 0, 0.5);">20:00</p>
                                  <p style="color: rgba(255, 255, 255, 0.5); font-size: 14px; margin: 10px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">Horário do Evento</p>
                                </div>
                                
                                <table role="presentation" style="margin: 0 auto 25px;">
                                  <tr>
                                    <td style="background: linear-gradient(135deg, #ff0000, #ff6b00); border-radius: 25px; padding: 12px 30px; box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);">
                                      <span style="color: #ffffff; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">⚡ Falta 1 hora!</span>
                                    </td>
                                  </tr>
                                </table>
                                
                                <div style="text-align: left; padding: 20px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border-left: 4px solid #ff6b00;">
                                  <p style="color: #ff6b00; margin: 0 0 15px 0; font-weight: 700; font-size: 14px; text-transform: uppercase;">📋 Eventos de Hoje</p>
                                  ${schedule.events.map((event) => `
                                    <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0; font-size: 15px;">
                                      <span style="color: #ff6b00;">▸</span> ${event}
                                    </p>
                                  `).join("")}
                                </div>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="color: rgba(255, 255, 255, 0.6); font-size: 16px; text-align: center; margin: 0 0 35px 0; line-height: 1.7;">
                            Prepare seu personagem e não perca a ação!<br/>
                            <span style="color: #ff6b00; font-weight: 600;">Os melhores ninjas já estão se preparando.</span>
                          </p>
                          
                          <table role="presentation" style="margin: 0 auto;">
                            <tr>
                              <td style="border-radius: 50px; background: linear-gradient(135deg, #ff0000 0%, #ff6b00 50%, #ff8c00 100%); box-shadow: 0 10px 30px rgba(255, 107, 0, 0.5);">
                                <a href="https://narutoplayers.vercel.app" style="display: inline-block; padding: 20px 50px; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 0.5px; text-transform: uppercase;">
                                  🎮 Entrar Agora
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 30px 40px; background: rgba(0, 0, 0, 0.3); border-top: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: rgba(255, 255, 255, 0.4); font-size: 13px; text-align: center; margin: 0; line-height: 1.6;">
                            <strong style="color: #ff6b00;">Naruto Dark RP</strong><br/>
                            Você está recebendo porque ativou notificações de eventos<br/>
                            © 2025 Todos os direitos reservados
                          </p>
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        })
      );

      await Promise.all(emailPromises);

      return NextResponse.json({
        success: true,
        day: currentDay,
        hour: currentHour,
        sentTo: subscriptions.length,
      });
    }

    return NextResponse.json({ message: "Not time to send reminders yet" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send reminders" },
      { status: 500 }
    );
  }
}
