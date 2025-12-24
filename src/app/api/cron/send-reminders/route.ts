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

      const emailPromises = subscriptions.map((sub) =>
        resend.emails.send({
          from: "Naruto Dark <onboarding@resend.dev>",
          to: sub.email,
          subject: `⚡ Eventos começam em 1 hora - ${currentDay}!`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #fff; border-radius: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #8b5cf6; font-size: 32px; margin: 0;">⚡ Naruto Dark</h1>
              </div>
              
              <div style="background: rgba(249, 115, 22, 0.1); border: 2px solid rgba(249, 115, 22, 0.3); border-radius: 15px; padding: 25px; margin-bottom: 20px;">
                <h2 style="color: #f97316; margin-top: 0;">⏰ Os eventos começam em 1 hora!</h2>
                <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                  Prepare-se, ninja! Os eventos de <strong>${currentDay}</strong> começam às <strong>${schedule.hour}:00</strong>.
                </p>
                
                <div style="margin: 20px 0;">
                  <h3 style="color: #8b5cf6; font-size: 18px;">📅 Eventos de Hoje:</h3>
                  <ul style="color: #e0e0e0; font-size: 16px;">
                    ${schedule.events.map((event) => `<li>${event}</li>`).join("")}
                  </ul>
                </div>
                
                <div style="text-align: center; margin-top: 25px;">
                  <a href="http://naruto.rededarkmc.com" style="display: inline-block; background: linear-gradient(45deg, #8b5cf6, #f97316); color: white; padding: 15px 40px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 18px;">
                    🎮 Entrar no Servidor
                  </a>
                </div>
              </div>
              
              <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(139, 92, 246, 0.2);">
                <p style="color: #a0a0a0; font-size: 14px; margin: 0;">
                  Naruto Dark - Onde lendas são forjadas<br>
                  IP: <strong style="color: #8b5cf6;">naruto.rededarkmc.com</strong>
                </p>
              </div>
            </div>
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
