import { supabase } from "./supabase";

const BRAND = {
  name: "ElegantlyWoven",
  tagline: "Luxury Handloom Atelier",
  color: "#7c3d2b",
  gold: "#D4AF37",
  url: "https://elegantlywoven.com",
};

/** Shared luxury HTML email shell */
function emailShell(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${BRAND.name}</title>
</head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:${BRAND.color};padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:400;letter-spacing:3px;text-transform:uppercase;">${BRAND.name}</h1>
            <p style="margin:6px 0 0;color:${BRAND.gold};font-size:11px;letter-spacing:4px;text-transform:uppercase;">${BRAND.tagline}</p>
          </td>
        </tr>
        <!-- Content -->
        <tr>
          <td style="padding:40px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#1c1917;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#a8a29e;font-size:11px;letter-spacing:1px;">© ${new Date().getFullYear()} ${BRAND.name} · Luxury Handloom Atelier</p>
            <p style="margin:8px 0 0;color:#78716c;font-size:11px;">You received this because you placed an order or opted in to our updates.</p>
            <p style="margin:8px 0 0;">
              <a href="${BRAND.url}" style="color:${BRAND.gold};font-size:11px;text-decoration:none;">Visit Store</a>
              &nbsp;·&nbsp;
              <a href="${BRAND.url}/account/notifications" style="color:${BRAND.gold};font-size:11px;text-decoration:none;">Manage Preferences</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Call the Supabase Edge Function to send email */
async function sendEmail(to: string, subject: string, html: string, bcc?: string[]): Promise<boolean> {
  try {
    const { error } = await supabase.functions.invoke("send-email", {
      body: { to, subject, html, bcc },
    });
    if (error) {
      console.error("Email send error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Email invoke error:", err);
    return false;
  }
}

// ─────────────────────────────────────────────────────────
// ORDER CONFIRMATION EMAIL
// ─────────────────────────────────────────────────────────
export async function sendOrderConfirmationEmail(order: {
  order_number: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  subtotal: number;
  tax_amount: number;
  shipping_charge: number;
  payment_method: string;
  items: Array<{ name: string; price: number; quantity?: number; qty?: number }>;
  shipping_address: { line?: string; city?: string; state?: string; pincode?: string } | string;
}): Promise<boolean> {
  if (!order.customer_email) return false;

  const itemsRows = (order.items || []).map((it) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe5;font-size:14px;color:#3d2b1a;">${it.name}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe5;font-size:14px;color:#6b5a4e;text-align:center;">${it.quantity || it.qty || 1}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe5;font-size:14px;color:#3d2b1a;text-align:right;">₹${((it.price || 0) * (it.quantity || it.qty || 1)).toLocaleString("en-IN")}</td>
    </tr>`).join("");

  const addr = typeof order.shipping_address === "object"
    ? `${order.shipping_address?.line || ""}, ${order.shipping_address?.city || ""}, ${order.shipping_address?.state || ""} ${order.shipping_address?.pincode || ""}`
    : order.shipping_address || "On file";

  const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#d4af3720;border:1px solid ${BRAND.gold};border-radius:50px;padding:8px 24px;">
        <span style="color:${BRAND.gold};font-size:12px;letter-spacing:2px;text-transform:uppercase;">✓ Order Confirmed</span>
      </div>
    </div>
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:400;color:#1c1917;">Thank you, ${order.customer_name || "Valued Customer"}!</h2>
    <p style="margin:0 0 24px;color:#6b5a4e;font-size:14px;line-height:1.7;">Your order has been received and is being processed. We'll send you a shipping update once your saree is dispatched.</p>

    <div style="background:#faf7f4;border-radius:8px;padding:20px;margin-bottom:24px;">
      <p style="margin:0;font-size:12px;color:#a8a29e;letter-spacing:2px;text-transform:uppercase;">Order Reference</p>
      <p style="margin:6px 0 0;font-size:24px;color:${BRAND.color};font-weight:600;letter-spacing:1px;">#${order.order_number}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <th style="text-align:left;font-size:11px;color:#a8a29e;letter-spacing:2px;text-transform:uppercase;padding-bottom:10px;border-bottom:2px solid #f0ebe5;">Item</th>
        <th style="text-align:center;font-size:11px;color:#a8a29e;letter-spacing:2px;text-transform:uppercase;padding-bottom:10px;border-bottom:2px solid #f0ebe5;">Qty</th>
        <th style="text-align:right;font-size:11px;color:#a8a29e;letter-spacing:2px;text-transform:uppercase;padding-bottom:10px;border-bottom:2px solid #f0ebe5;">Amount</th>
      </tr>
      ${itemsRows || `<tr><td colspan="3" style="padding:12px 0;color:#6b5a4e;font-size:14px;">Handcrafted Saree Order</td></tr>`}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr><td style="font-size:13px;color:#6b5a4e;padding:4px 0;">Subtotal</td><td style="text-align:right;font-size:13px;color:#3d2b1a;">₹${(order.subtotal || 0).toLocaleString("en-IN")}</td></tr>
      <tr><td style="font-size:13px;color:#6b5a4e;padding:4px 0;">GST (5%)</td><td style="text-align:right;font-size:13px;color:#3d2b1a;">₹${(order.tax_amount || 0).toLocaleString("en-IN")}</td></tr>
      <tr><td style="font-size:13px;color:#6b5a4e;padding:4px 0;">Shipping</td><td style="text-align:right;font-size:13px;color:#3d2b1a;">${order.shipping_charge ? `₹${order.shipping_charge.toLocaleString("en-IN")}` : "FREE"}</td></tr>
      <tr>
        <td style="font-size:16px;font-weight:700;color:#1c1917;padding:12px 0 4px;border-top:2px solid #f0ebe5;">Total Paid</td>
        <td style="text-align:right;font-size:18px;font-weight:700;color:${BRAND.color};padding:12px 0 4px;border-top:2px solid #f0ebe5;">₹${(order.total_amount || 0).toLocaleString("en-IN")}</td>
      </tr>
    </table>

    <div style="background:#faf7f4;border-radius:8px;padding:20px;margin-bottom:28px;">
      <p style="margin:0;font-size:11px;color:#a8a29e;letter-spacing:2px;text-transform:uppercase;">Delivery Address</p>
      <p style="margin:8px 0 0;font-size:14px;color:#3d2b1a;line-height:1.6;">${addr}</p>
      <p style="margin:8px 0 0;font-size:12px;color:#a8a29e;">Payment: ${order.payment_method || "UPI"}</p>
    </div>

    <div style="text-align:center;">
      <a href="${BRAND.url}/account/orders" style="display:inline-block;background:${BRAND.color};color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Track My Order</a>
    </div>`;

  return sendEmail(
    order.customer_email,
    `✨ Order Confirmed — #${order.order_number} | ElegantlyWoven`,
    emailShell(content)
  );
}

// ─────────────────────────────────────────────────────────
// SHIPPING UPDATE EMAIL
// ─────────────────────────────────────────────────────────
export async function sendShippingUpdateEmail(order: {
  order_number: string;
  customer_name: string;
  customer_email: string;
  tracking_number?: string;
  total_amount: number;
}): Promise<boolean> {
  if (!order.customer_email) return false;

  const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#0f766e20;border:1px solid #0f766e;border-radius:50px;padding:8px 24px;">
        <span style="color:#0f766e;font-size:12px;letter-spacing:2px;text-transform:uppercase;">🚚 Order Shipped</span>
      </div>
    </div>
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:400;color:#1c1917;">Your saree is on its way!</h2>
    <p style="margin:0 0 24px;color:#6b5a4e;font-size:14px;line-height:1.7;">Great news, ${order.customer_name || "Valued Customer"}! Your order <strong>#${order.order_number}</strong> has been shipped and is headed to you.</p>
    ${order.tracking_number ? `
    <div style="background:#faf7f4;border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#a8a29e;letter-spacing:2px;text-transform:uppercase;">Tracking Number</p>
      <p style="margin:8px 0 0;font-size:20px;color:${BRAND.color};font-weight:600;letter-spacing:2px;">${order.tracking_number}</p>
    </div>` : ""}
    <div style="background:#faf7f4;border-radius:8px;padding:20px;margin-bottom:28px;">
      <p style="margin:0;font-size:14px;color:#3d2b1a;line-height:1.7;">📦 Expected delivery: <strong>3–5 business days</strong><br/>Your package is handled with care and is insured during transit.</p>
    </div>
    <div style="text-align:center;">
      <a href="${BRAND.url}/track-order" style="display:inline-block;background:${BRAND.color};color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Track My Order</a>
    </div>`;

  return sendEmail(
    order.customer_email,
    `🚚 Your Order #${order.order_number} Has Been Shipped — ElegantlyWoven`,
    emailShell(content)
  );
}

// ─────────────────────────────────────────────────────────
// DELIVERY CONFIRMATION EMAIL
// ─────────────────────────────────────────────────────────
export async function sendDeliveryEmail(order: {
  order_number: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
}): Promise<boolean> {
  if (!order.customer_email) return false;

  const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#d4af3720;border:1px solid ${BRAND.gold};border-radius:50px;padding:8px 24px;">
        <span style="color:${BRAND.gold};font-size:12px;letter-spacing:2px;text-transform:uppercase;">✅ Delivered</span>
      </div>
    </div>
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:400;color:#1c1917;">Your saree has arrived! 🎉</h2>
    <p style="margin:0 0 24px;color:#6b5a4e;font-size:14px;line-height:1.7;">Dear ${order.customer_name || "Valued Customer"}, your order <strong>#${order.order_number}</strong> has been delivered. We hope you love your saree!</p>
    <div style="background:#faf7f4;border-radius:8px;padding:20px;margin-bottom:24px;">
      <p style="margin:0;font-size:14px;color:#3d2b1a;line-height:1.8;">
        🌟 <strong>Enjoy your saree!</strong><br/>
        If anything is not right, our 7-day return policy has you covered.<br/><br/>
        Please share your experience — your review helps other customers and our weavers.
      </p>
    </div>
    <div style="text-align:center;margin-bottom:16px;">
      <a href="${BRAND.url}/account/orders" style="display:inline-block;background:${BRAND.color};color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Write a Review</a>
    </div>
    <div style="text-align:center;">
      <a href="${BRAND.url}/collections" style="display:inline-block;border:1px solid ${BRAND.color};color:${BRAND.color};text-decoration:none;padding:12px 28px;border-radius:50px;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Shop New Arrivals</a>
    </div>`;

  return sendEmail(
    order.customer_email,
    `✅ Delivered — Order #${order.order_number} | ElegantlyWoven`,
    emailShell(content)
  );
}

// ─────────────────────────────────────────────────────────
// NEW COLLECTION UPDATE EMAIL (Newsletter)
// ─────────────────────────────────────────────────────────
export async function sendCollectionUpdateEmail(product: {
  name: string;
  description?: string;
  price: number;
  mrp?: number;
  category?: string;
  weave?: string;
  images?: string[];
  slug?: string;
  id?: string;
}): Promise<number> {
  // Fetch all opted-in users
  const { data: subscribers } = await supabase
    .from("profiles")
    .select("email")
    .eq("collection_updates_opt_in", true)
    .not("email", "is", null);

  if (!subscribers || subscribers.length === 0) return 0;

  const emails = subscribers.map((s) => s.email).filter(Boolean) as string[];
  const productLink = `${BRAND.url}/product/${product.slug || product.id || "new"}`;
  const discount = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#d4af3720;border:1px solid ${BRAND.gold};border-radius:50px;padding:8px 24px;">
        <span style="color:${BRAND.gold};font-size:12px;letter-spacing:2px;text-transform:uppercase;">✨ New Arrival</span>
      </div>
    </div>
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:400;color:#1c1917;">A new treasure has arrived</h2>
    <p style="margin:0 0 28px;color:#6b5a4e;font-size:14px;line-height:1.7;">Our artisans have crafted something beautiful for you. Exclusively available now at ElegantlyWoven.</p>
    ${product.images?.[0] ? `
    <div style="text-align:center;margin-bottom:24px;">
      <img src="${product.images[0]}" alt="${product.name}" style="max-width:100%;width:400px;height:500px;object-fit:cover;border-radius:12px;display:block;margin:0 auto;" />
    </div>` : ""}
    <div style="text-align:center;margin-bottom:24px;">
      <p style="margin:0;font-size:12px;color:#a8a29e;letter-spacing:3px;text-transform:uppercase;">${product.weave || ""} ${product.category || "Saree"}</p>
      <h3 style="margin:8px 0;font-size:24px;font-weight:400;color:#1c1917;">${product.name}</h3>
      <div style="display:flex;justify-content:center;align-items:baseline;gap:12px;margin:12px 0;">
        <span style="font-size:24px;font-weight:700;color:${BRAND.color};">₹${product.price.toLocaleString("en-IN")}</span>
        ${product.mrp ? `<span style="font-size:16px;color:#a8a29e;text-decoration:line-through;">₹${product.mrp.toLocaleString("en-IN")}</span>` : ""}
        ${discount > 0 ? `<span style="font-size:13px;color:#0f766e;font-weight:600;">${discount}% off</span>` : ""}
      </div>
      ${product.description ? `<p style="margin:0;color:#6b5a4e;font-size:13px;line-height:1.7;max-width:480px;margin:0 auto;">${product.description.slice(0, 200)}...</p>` : ""}
    </div>
    <div style="text-align:center;margin-bottom:16px;">
      <a href="${productLink}" style="display:inline-block;background:${BRAND.color};color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:50px;font-size:12px;letter-spacing:3px;text-transform:uppercase;">View This Saree</a>
    </div>
    <p style="text-align:center;font-size:11px;color:#a8a29e;margin-top:24px;">Limited stock available. This saree is handcrafted by master weavers.</p>`;

  // Send to first subscriber directly, rest as BCC (to protect privacy)
  if (emails.length === 1) {
    const sent = await sendEmail(emails[0]!, `✨ New Arrival: ${product.name} | ElegantlyWoven`, emailShell(content));
    return sent ? 1 : 0;
  }

  // Send to first email, BCC the rest
  const [first, ...rest] = emails;
  const sent = await sendEmail(
    first!,
    `✨ New Arrival: ${product.name} | ElegantlyWoven`,
    emailShell(content),
    rest
  );
  return sent ? emails.length : 0;
}
