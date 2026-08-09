// Supabase Edge Function: send-order-email
// Deploy: supabase functions deploy send-order-email
// Set secrets: supabase secrets set RESEND_API_KEY=re_YOUR_KEY

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailPayload {
  type: "order_confirmation" | "order_shipped" | "order_delivered" | "order_cancelled" | "welcome";
  to: string;
  customerName: string;
  orderNumber?: string;
  orderTotal?: number;
  items?: Array<{ name: string; qty: number; price: number; image?: string }>;
  shippingAddress?: {
    line: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

function inr(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function getEmailTemplate(payload: OrderEmailPayload): { subject: string; html: string } {
  const brandColor = "#8B3A2A";
  const goldColor = "#C9A84C";

  const baseStyle = `
    font-family: Georgia, 'Times New Roman', serif;
    max-width: 600px;
    margin: 0 auto;
    background: #FAFAF7;
    border: 1px solid #E8E4DC;
    border-radius: 12px;
    overflow: hidden;
  `;

  const header = `
    <div style="background: ${brandColor}; padding: 32px 40px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 28px; letter-spacing: 2px;">ElegantlyWoven</h1>
      <p style="margin: 4px 0 0; color: rgba(255,255,255,0.75); font-size: 11px; letter-spacing: 4px; text-transform: uppercase; font-family: Arial, sans-serif;">Luxury Handloom Atelier</p>
    </div>
  `;

  const footer = `
    <div style="background: #1C1917; padding: 24px 40px; text-align: center;">
      <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 11px; font-family: Arial, sans-serif;">
        ElegantlyWoven · LumaScale Digital Commerce<br/>
        Need help? Reply to this email or WhatsApp us at +91 98765 43210<br/>
        <a href="https://elegantlywoven.com/privacy-policy" style="color: ${goldColor}; text-decoration: none;">Privacy Policy</a> · 
        <a href="https://elegantlywoven.com/terms" style="color: ${goldColor}; text-decoration: none;">Terms & Conditions</a>
      </p>
    </div>
  `;

  if (payload.type === "welcome") {
    return {
      subject: `Welcome to ElegantlyWoven, ${payload.customerName}! 🌸`,
      html: `<div style="${baseStyle}">
        ${header}
        <div style="padding: 40px;">
          <h2 style="color: ${brandColor}; margin: 0 0 16px;">Welcome, ${payload.customerName}! 🎉</h2>
          <p style="color: #555; font-family: Arial, sans-serif; line-height: 1.6;">
            Your account has been created successfully. You now have access to:
          </p>
          <ul style="color: #555; font-family: Arial, sans-serif; line-height: 2;">
            <li>🛍️ Browse 500+ premium handloom sarees</li>
            <li>💖 Save your favourites to wishlist</li>
            <li>📦 Track all your orders in real-time</li>
            <li>🏷️ Get exclusive member-only offers</li>
          </ul>
          <div style="text-align: center; margin: 32px 0;">
            <a href="https://elegantlywoven.com/collections" style="background: ${brandColor}; color: white; padding: 14px 36px; border-radius: 999px; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif;">
              Explore Collections
            </a>
          </div>
          <p style="color: #999; font-family: Arial, sans-serif; font-size: 12px;">Use code <strong>WOVEN15</strong> for 15% off your first order!</p>
        </div>
        ${footer}
      </div>`,
    };
  }

  if (payload.type === "order_confirmation") {
    const itemsHtml = (payload.items || []).map(item => `
      <tr style="border-bottom: 1px solid #E8E4DC;">
        <td style="padding: 12px 8px; font-family: Arial, sans-serif; font-size: 13px; color: #333;">${item.name}</td>
        <td style="padding: 12px 8px; text-align: center; font-family: Arial, sans-serif; font-size: 13px; color: #666;">${item.qty}</td>
        <td style="padding: 12px 8px; text-align: right; font-family: Arial, sans-serif; font-size: 13px; color: #333; font-weight: bold;">${inr(item.price * item.qty)}</td>
      </tr>
    `).join("");

    const addr = payload.shippingAddress;
    const addrText = addr ? `${addr.line}, ${addr.city}, ${addr.state} - ${addr.pincode}` : "Address on file";

    return {
      subject: `✅ Order Confirmed: #${payload.orderNumber} — ElegantlyWoven`,
      html: `<div style="${baseStyle}">
        ${header}
        <div style="padding: 40px;">
          <div style="background: #F0FFF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
            <p style="margin: 0; color: #166534; font-family: Arial, sans-serif; font-size: 14px; font-weight: bold;">✅ Your order is confirmed and being processed!</p>
          </div>

          <h2 style="color: ${brandColor}; margin: 0 0 4px;">Order #${payload.orderNumber}</h2>
          <p style="color: #999; font-family: Arial, sans-serif; font-size: 12px; margin: 0 0 24px;">Placed on ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

          <p style="color: #555; font-family: Arial, sans-serif;">Dear <strong>${payload.customerName}</strong>, thank you for shopping with ElegantlyWoven! Here's your order summary:</p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #E8E4DC; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #F5F0EA;">
                <th style="padding: 12px 8px; text-align: left; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888;">Item</th>
                <th style="padding: 12px 8px; text-align: center; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888;">Qty</th>
                <th style="padding: 12px 8px; text-align: right; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr style="background: #F5F0EA; font-weight: bold;">
                <td colspan="2" style="padding: 12px 8px; font-family: Arial, sans-serif; font-size: 14px; color: #333;">Total Paid (incl. GST)</td>
                <td style="padding: 12px 8px; text-align: right; font-family: Georgia, serif; font-size: 18px; color: ${brandColor};">${inr(payload.orderTotal || 0)}</td>
              </tr>
            </tbody>
          </table>

          <div style="background: #F5F0EA; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0 0 8px; font-family: Arial, sans-serif; font-size: 12px; font-weight: bold; color: #666; text-transform: uppercase; letter-spacing: 1px;">Delivery Address</p>
            <p style="margin: 0; font-family: Arial, sans-serif; color: #333; font-size: 13px;">${addrText}</p>
            <p style="margin: 8px 0 0; font-family: Arial, sans-serif; font-size: 12px; color: #666;">Payment: ${payload.paymentMethod || "Online Payment"} · Expected delivery: 5–7 business days</p>
          </div>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://elegantlywoven.com/account/orders" style="background: ${brandColor}; color: white; padding: 14px 36px; border-radius: 999px; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif;">
              Track Your Order
            </a>
          </div>
        </div>
        ${footer}
      </div>`,
    };
  }

  if (payload.type === "order_shipped") {
    return {
      subject: `🚚 Your Order #${payload.orderNumber} is On Its Way! — ElegantlyWoven`,
      html: `<div style="${baseStyle}">
        ${header}
        <div style="padding: 40px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 16px;">🚚</div>
          <h2 style="color: ${brandColor}; margin: 0 0 8px;">Your order is on its way, ${payload.customerName}!</h2>
          <p style="color: #666; font-family: Arial, sans-serif; font-size: 14px; margin: 0 0 24px;">Order #${payload.orderNumber} has been shipped and is en route to you.</p>
          
          ${payload.trackingNumber ? `
          <div style="background: #FFF8F0; border: 1px solid ${goldColor}; border-radius: 8px; padding: 16px; margin: 20px 0; text-align: left;">
            <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #888; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Tracking Number</p>
            <p style="margin: 4px 0 0; font-family: 'Courier New', monospace; font-size: 18px; color: ${brandColor}; font-weight: bold;">${payload.trackingNumber}</p>
          </div>` : ""}
          
          ${payload.estimatedDelivery ? `<p style="color: #555; font-family: Arial, sans-serif;">Estimated Delivery: <strong>${payload.estimatedDelivery}</strong></p>` : ""}

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://elegantlywoven.com/track-order" style="background: ${brandColor}; color: white; padding: 14px 36px; border-radius: 999px; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif;">
              Track Live Location
            </a>
          </div>
        </div>
        ${footer}
      </div>`,
    };
  }

  if (payload.type === "order_delivered") {
    return {
      subject: `🎉 Your Order #${payload.orderNumber} Has Been Delivered! — ElegantlyWoven`,
      html: `<div style="${baseStyle}">
        ${header}
        <div style="padding: 40px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 16px;">🎉</div>
          <h2 style="color: ${brandColor}; margin: 0 0 8px;">Delivered! Enjoy your saree, ${payload.customerName}! 🌸</h2>
          <p style="color: #666; font-family: Arial, sans-serif; font-size: 14px; margin: 0 0 24px;">Order #${payload.orderNumber} has been successfully delivered.</p>
          <p style="color: #555; font-family: Arial, sans-serif;">We'd love to hear your thoughts! Please leave a review to help other customers.</p>
          <div style="text-align: center; margin: 32px 0; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="https://elegantlywoven.com/account/orders" style="background: ${brandColor}; color: white; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif; display: inline-block; margin: 4px;">
              Write a Review
            </a>
            <a href="https://elegantlywoven.com/collections" style="background: #E8E4DC; color: #333; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif; display: inline-block; margin: 4px;">
              Shop Again
            </a>
          </div>
        </div>
        ${footer}
      </div>`,
    };
  }

  // Default fallback
  return {
    subject: `Update on Order #${payload.orderNumber} — ElegantlyWoven`,
    html: `<div style="${baseStyle}">${header}<div style="padding: 40px;"><p style="font-family: Arial, sans-serif; color: #555;">Hi ${payload.customerName}, there's an update on your order #${payload.orderNumber}.</p></div>${footer}</div>`,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured in Supabase secrets");
    }

    const payload: OrderEmailPayload = await req.json();

    if (!payload.to || !payload.type) {
      throw new Error("Missing required fields: to, type");
    }

    const { subject, html } = getEmailTemplate(payload);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ElegantlyWoven <orders@elegantlywoven.com>",
        to: [payload.to],
        subject,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error("Resend API error:", errText);
      // Don't throw — email failure should not break order flow
      return new Response(JSON.stringify({ success: false, error: errText }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await resendResponse.json();
    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ success: false, error: String(error) }), {
      status: 200, // Always 200 so order flow doesn't break
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
