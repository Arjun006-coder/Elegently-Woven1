import { supabase } from "./supabase";

interface SendEmailOptions {
  type: "order_confirmation" | "order_shipped" | "order_delivered" | "order_cancelled" | "welcome" | "new_arrival";
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
  productName?: string;
  productSlug?: string;
  price?: number;
  image?: string;
  category?: string;
}

function inr(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function generateEmailHTML(options: SendEmailOptions): { subject: string; html: string } {
  const brandColor = "#8B3A2A";
  const goldColor = "#C9A84C";
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://elegantlywoven.com";

  const baseStyle = `font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background: #FAFAF7; border: 1px solid #E8E4DC; border-radius: 12px; overflow: hidden;`;
  const header = `
    <div style="background: ${brandColor}; padding: 32px 40px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 28px; letter-spacing: 2px;">ElegantlyWoven</h1>
      <p style="margin: 4px 0 0; color: rgba(255,255,255,0.75); font-size: 11px; letter-spacing: 4px; text-transform: uppercase; font-family: Arial, sans-serif;">Luxury Handloom Atelier</p>
    </div>
  `;
  const footer = `
    <div style="background: #1C1917; padding: 24px 40px; text-align: center;">
      <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 11px; font-family: Arial, sans-serif;">
        ElegantlyWoven · Luxury Handlooms<br/>
        Need help? Reply to this email or WhatsApp us at +91 98800 11223<br/>
        <a href="${siteUrl}/privacy-policy" style="color: ${goldColor}; text-decoration: none;">Privacy Policy</a> · 
        <a href="${siteUrl}/terms" style="color: ${goldColor}; text-decoration: none;">Terms & Conditions</a>
      </p>
    </div>
  `;

  if (options.type === "new_arrival") {
    const prodImg = options.image || "https://images.unsplash.com/photo-1610189014163-54942d512a81?w=600&q=80";
    const prodUrl = `${siteUrl}/product/${options.productSlug || ""}`;

    return {
      subject: `✨ New Arrival: ${options.productName || "Luxury Saree"} — ElegantlyWoven`,
      html: `
        <div style="${baseStyle}">
          ${header}
          <div style="padding: 40px; text-align: center;">
            <span style="background: #F5E6C8; color: #8B3A2A; font-family: Arial, sans-serif; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 99px; text-transform: uppercase; letter-spacing: 2px;">
              New Collection Drop
            </span>
            <h2 style="color: ${brandColor}; margin: 16px 0 8px; font-size: 24px;">${options.productName}</h2>
            <p style="color: #666; font-family: Arial, sans-serif; font-size: 14px; margin: 0 0 24px;">
              Discover our newest handcrafted ${options.category || "handloom"} saree, woven with pure silk & certified zari.
            </p>

            <div style="margin: 20px 0; overflow: hidden; border-radius: 12px; border: 1px solid #E8E4DC;">
              <img src="${prodImg}" alt="${options.productName}" style="width: 100%; max-height: 380px; object-fit: cover; display: block;" />
              <div style="padding: 16px; background: #FFF8F0; text-align: center;">
                <p style="margin: 0; font-family: Georgia, serif; font-size: 22px; color: ${brandColor}; font-weight: bold;">
                  ${options.price ? inr(options.price) : ""}
                </p>
                <p style="margin: 4px 0 0; font-family: Arial, sans-serif; font-size: 12px; color: #888;">
                  Limited loom stock · Inclusive of all taxes & free shipping
                </p>
              </div>
            </div>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${prodUrl}" style="background: ${brandColor}; color: white; padding: 14px 36px; border-radius: 999px; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif; display: inline-block;">
                View Saree & Order Now
              </a>
            </div>
          </div>
          ${footer}
        </div>
      `,
    };
  }

  if (options.type === "welcome") {
    return {
      subject: `Welcome to ElegantlyWoven, ${options.customerName}! 🌸`,
      html: `
        <div style="${baseStyle}">
          ${header}
          <div style="padding: 40px;">
            <h2 style="color: ${brandColor}; margin: 0 0 16px;">Welcome, ${options.customerName}! 🎉</h2>
            <p style="color: #555; font-family: Arial, sans-serif; line-height: 1.6;">
              Your account has been created successfully. Enjoy 15% off your first luxury drape using code <strong>WOVEN15</strong>.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${siteUrl}/collections" style="background: ${brandColor}; color: white; padding: 14px 36px; border-radius: 999px; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif; display: inline-block;">
                Explore Handloom Sarees
              </a>
            </div>
          </div>
          ${footer}
        </div>
      `,
    };
  }

  // Fallback for order confirmation
  const itemsHtml = (options.items || []).map((item) => `
    <tr style="border-bottom: 1px solid #E8E4DC;">
      <td style="padding: 12px 8px; font-family: Arial, sans-serif; font-size: 13px; color: #333;">${item.name}</td>
      <td style="padding: 12px 8px; text-align: center; font-family: Arial, sans-serif; font-size: 13px; color: #666;">${item.qty}</td>
      <td style="padding: 12px 8px; text-align: right; font-family: Arial, sans-serif; font-size: 13px; color: #333; font-weight: bold;">${inr(item.price * item.qty)}</td>
    </tr>
  `).join("");

  return {
    subject: `✅ Order Confirmed: #${options.orderNumber || "EW"} — ElegantlyWoven`,
    html: `
      <div style="${baseStyle}">
        ${header}
        <div style="padding: 40px;">
          <h2 style="color: ${brandColor}; margin: 0 0 4px;">Order #${options.orderNumber}</h2>
          <p style="color: #555; font-family: Arial, sans-serif;">Dear <strong>${options.customerName}</strong>, thank you for shopping with ElegantlyWoven!</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #E8E4DC; border-radius: 8px;">
            <thead>
              <tr style="background: #F5F0EA;">
                <th style="padding: 12px 8px; text-align: left; font-family: Arial, sans-serif; font-size: 11px;">Item</th>
                <th style="padding: 12px 8px; text-align: center; font-family: Arial, sans-serif; font-size: 11px;">Qty</th>
                <th style="padding: 12px 8px; text-align: right; font-family: Arial, sans-serif; font-size: 11px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr style="background: #F5F0EA; font-weight: bold;">
                <td colspan="2" style="padding: 12px 8px; font-family: Arial, sans-serif; font-size: 14px;">Total Paid</td>
                <td style="padding: 12px 8px; text-align: right; font-family: Georgia, serif; font-size: 18px; color: ${brandColor};">${inr(options.orderTotal || 0)}</td>
              </tr>
            </tbody>
          </table>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${siteUrl}/account/orders" style="background: ${brandColor}; color: white; padding: 14px 36px; border-radius: 999px; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif; display: inline-block;">
              Track Order
            </a>
          </div>
        </div>
        ${footer}
      </div>
    `,
  };
}

export async function sendOrderEmail(options: SendEmailOptions): Promise<void> {
  try {
    // 1. First try Supabase Edge Function
    const { error } = await supabase.functions.invoke("send-order-email", {
      body: options,
    });

    if (!error) return;

    // 2. Fallback: Direct Resend REST API fetch if edge function fails/is not deployed
    const apiKey = import.meta.env.VITE_RESEND_API_KEY || "";
    if (apiKey) {
      const { subject, html } = generateEmailHTML(options);
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: [options.to],
          subject,
          html,
        }),
      });
    }
  } catch (err) {
    console.warn("Email send notice (non-critical):", err);
  }
}
