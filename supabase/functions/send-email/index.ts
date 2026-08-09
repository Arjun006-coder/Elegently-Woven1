import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, subject, html, bcc } = await req.json();

    const gmailUser = Deno.env.get("GMAIL_USER") ?? "";
    const gmailPass = Deno.env.get("GMAIL_APP_PASSWORD") ?? "";

    if (!gmailUser || !gmailPass) {
      throw new Error("Email credentials not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in Supabase secrets.");
    }

    // Use nodemailer via npm for Gmail SMTP
    const { default: nodemailer } = await import("npm:nodemailer@6.9.7");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass.replace(/\s/g, ""), // remove spaces from app password
      },
    });

    const mailOptions: Record<string, unknown> = {
      from: `"ElegantlyWoven ✨" <${gmailUser}>`,
      to,
      subject,
      html,
    };

    if (bcc && Array.isArray(bcc) && bcc.length > 0) {
      mailOptions.bcc = bcc.join(",");
    }

    await transporter.sendMail(mailOptions);

    console.log(`Email sent to: ${to} | Subject: ${subject}`);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Email send error:", message);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
