import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, days } = await request.json();

    if (!email || !days || days.length === 0) {
      return NextResponse.json(
        { error: "Email e dias são obrigatórios." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido." },
        { status: 400 }
      );
    }

    try {
      const subscription = await prisma.subscription.upsert({
        where: { email },
        update: { days },
        create: { email, days },
      });

      try {
      await resend.emails.send({
        from: "Naruto Dark <onboarding@resend.dev>",
        to: email,
        subject: "✅ Notificações Ativadas - Naruto Dark RP",
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
                      <td style="background: linear-gradient(90deg, #ff6b00 0%, #ff8c00 50%, #ff6b00 100%); padding: 3px 0;"></td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 50px 40px;">
                        <table role="presentation" style="margin: 0 auto 30px; width: 80px; height: 80px; background: linear-gradient(135deg, #ff6b00, #ff8c00); border-radius: 50%; box-shadow: 0 10px 30px rgba(255, 107, 0, 0.5);">
                          <tr>
                            <td style="text-align: center; vertical-align: middle; font-size: 50px;">✓</td>
                          </tr>
                        </table>
                        
                        <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; text-align: center; margin: 0 0 15px 0; letter-spacing: -0.5px;">Olá, ninja!</h1>
                        
                        <p style="color: rgba(255, 255, 255, 0.7); font-size: 18px; text-align: center; margin: 0 0 40px 0; line-height: 1.6;">
                          Suas notificações de eventos foram ativadas com <span style="color: #ff6b00; font-weight: 600;">sucesso</span>.
                        </p>
                        
                        <table role="presentation" style="width: 100%; background: rgba(255, 107, 0, 0.08); border-radius: 12px; border: 2px solid rgba(255, 107, 0, 0.2); margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 30px;">
                              <p style="color: #ff6b00; margin: 0 0 20px 0; font-weight: 700; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">📅 Seus dias de notificação</p>
                              <table role="presentation" style="width: 100%;">
                                ${days.map((day: string) => `
                                  <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                                      <span style="display: inline-block; width: 8px; height: 8px; background: #ff6b00; border-radius: 50%; margin-right: 12px;"></span>
                                      <span style="color: #ffffff; font-size: 16px; font-weight: 500;">${day}</span>
                                      <span style="float: right; color: rgba(255, 255, 255, 0.5); font-size: 14px;">20:00</span>
                                    </td>
                                  </tr>
                                `).join("")}
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="color: rgba(255, 255, 255, 0.6); font-size: 15px; text-align: center; margin: 0 0 35px 0; line-height: 1.6;">
                          Você receberá lembretes <span style="color: #ffffff; font-weight: 600;">1 hora antes</span> de cada evento começar.
                        </p>
                        
                        <table role="presentation" style="margin: 0 auto;">
                          <tr>
                            <td style="border-radius: 50px; background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%); box-shadow: 0 10px 30px rgba(255, 107, 0, 0.4);">
                              <a href="https://narutoplayers.vercel.app/eventos" style="display: inline-block; padding: 18px 45px; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 0.5px; text-transform: uppercase;">
                                Ver Calendário
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
      });
    } catch (emailError) {}

      return NextResponse.json({
        success: true,
        message: "Inscrição realizada com sucesso!",
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Erro ao processar inscrição." },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar inscrição." },
      { status: 500 }
    );
  }
}
