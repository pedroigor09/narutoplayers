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
        from: "Naruto Dark <onboarding@resend.dev>", // Change this after verifying your domain
        to: email,
        subject: "🎉 Notificações Ativadas - Naruto Dark",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #fff; border-radius: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8b5cf6; font-size: 32px; margin: 0;">⚡ Naruto Dark</h1>
            </div>
            
            <div style="background: rgba(139, 92, 246, 0.1); border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 15px; padding: 25px; margin-bottom: 20px;">
              <h2 style="color: #f97316; margin-top: 0;">🔔 Notificações Ativadas!</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Olá, ninja! Suas notificações de eventos foram ativadas com sucesso.
              </p>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #8b5cf6; font-size: 18px;">📅 Você receberá notificações para:</h3>
                <ul style="color: #e0e0e0; font-size: 16px;">
                  ${days.map((day: string) => `<li>${day}</li>`).join("")}
                </ul>
              </div>
              
              <p style="font-size: 14px; color: #a0a0a0; margin-bottom: 0;">
                💡 Você receberá lembretes 1 hora antes de cada evento.
              </p>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(139, 92, 246, 0.2);">
              <p style="color: #a0a0a0; font-size: 14px; margin: 0;">
                Naruto Dark - Onde lendas são forjadas<br>
                <a href="https://narutodark.com" style="color: #8b5cf6; text-decoration: none;">narutodark.com</a>
              </p>
            </div>
          </div>
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
}
