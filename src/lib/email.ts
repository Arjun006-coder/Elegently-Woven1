// Helper to call the Supabase send-order-email Edge Function
// Used from payment.tsx (order confirmation) and admin/orders.tsx (status updates)

import { supabase } from "./supabase";

interface SendEmailOptions {
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

export async function sendOrderEmail(options: SendEmailOptions): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke("send-order-email", {
      body: options,
    });
    if (error) {
      console.warn("Email send warning (non-critical):", error);
    }
  } catch (err) {
    // Never block the user flow for email failures
    console.warn("Email system warning (non-critical):", err);
  }
}
