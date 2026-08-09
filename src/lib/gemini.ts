// Gemini AI Client for ElegantlyWoven AI Saree Stylist
// Set VITE_GEMINI_API_KEY in Vercel Environment Variables to activate

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const SYSTEM_INSTRUCTION = `You are Ananya, the AI Saree Stylist & Luxury Concierge for ElegantlyWoven — a premier Indian handloom saree atelier (by LumaScale).

YOUR ROLE:
- Help customers select the perfect saree based on occasion (wedding, festival, party, office wear, bridal), fabric (Kanjivaram Silk, Banarasi, Chanderi, Tussar, Organza, Linen, Cotton), colour, skin tone, and budget (in INR ₹).
- Answer questions politely about store policies:
  • Shipping: Free insured shipping on orders above ₹2,999 (Express ₹149 below).
  • Delivery: 3-5 business days across India.
  • Returns & Refunds: 7-day return policy and 15-day replacement policy.
  • Blouse: All silk sarees include a 0.8m unstitched matching blouse piece.
  • Authenticity: 100% Silk Mark Certified with loom certificate included.
  • Payment: UPI (GPay, PhonePe), Credit/Debit Card, Netbanking, No-Cost EMI, and Cash on Delivery (COD).

TONE & STYLE:
- Warm, polite, elegant, culturally respectful Indian luxury concierge. Use terms like "Namaste", "weave", "pallu", "zari", "drape" naturally.
- Keep responses concise (2-4 sentences max per message unless detailed specs are requested).
- If asked about products, recommend sarees from ElegantlyWoven's collections like Kanjivaram Silk, Royal Banarasi, Festive Organza, and Soft Linen.`;

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export async function askGeminiStylist(history: ChatMessage[], userMessage: string, apiKey: string): Promise<string> {
  if (!apiKey) {
    return "Namaste! Please configure your Gemini API Key to activate live AI saree recommendations.";
  }

  try {
    const contents = [
      ...history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ];

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 350,
        },
      }),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      console.error("Gemini API Error:", response.status, errJson);
      return "Namaste! I am experiencing a temporary connection pause. How may I assist you with your saree selection today?";
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return replyText || "Namaste! How may I assist you in finding your dream saree today?";
  } catch (err) {
    console.error("Gemini Chat Error:", err);
    return "Namaste! I am currently updating our latest loom collection. Please ask me about our Kanjivaram or Banarasi sarees!";
  }
}
