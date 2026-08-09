import { products } from "./data";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const SYSTEM_PROMPT = `You are "Sharmaji", a warm, polite, and deeply knowledgeable traditional Indian saree shopkeeper & master weaver consultant at ElegantlyWoven (a luxury saree atelier in India).

YOUR PERSONALITY & VOICE:
- Speak in warm, respectful Indian English with authentic shopkeeper phrases: "Namasteji!", "Ji bilkul", "Aap bilkul tension mat lijiye", "Beta/Ji", "Pure silk zari work", "Directly from our Kamakshi loom weavers".
- Be incredibly helpful, polite, and enthusiastic about Indian handloom sarees.
- Always recommend specific sarees from the catalog provided below matching the customer's budget, occasion (wedding, party, daily wear, festival), or color preference.
- Keep responses concise (2-4 sentences max) so they fit nicely in a mobile chat bubble.

OUR STORE'S LIVE PRODUCT CATALOG CONTEXT:
${products
  .map(
    (p) =>
      `• "${p.name}" (ID: ${p.id}, Slug: ${p.slug || p.id}): ${p.weave} ${p.fabric}, ${p.color} color, Perfect for ${p.occasion}. Price: ₹${p.price} (MRP: ₹${p.mrp}). Stock: ${p.stock} units. Description: ${p.description.slice(0, 100)}`
  )
  .join("\n")}

STORE POLICIES TO REMEMBER:
- Free shipping across India on orders above ₹2,999.
- 7-day easy return & Silk Mark certificate with every purchase.
- Delivery in 3-5 business days.
- Custom stitching & fall/pico available.

Respond in character as Sharmaji the Indian shopkeeper!`;

export async function askGeminiShopkeeper(
  userQuery: string,
  history: Array<{ sender: "user" | "bot"; text: string }> = []
): Promise<string> {
  if (!GEMINI_API_KEY) {
    return getOfflineShopkeeperResponse(userQuery);
  }

  try {
    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Namasteji! Welcome to ElegantlyWoven. I am Sharmaji, your saree stylist & weaver consultant. Tell me, what occasion or color saree are you looking for today?",
          },
        ],
      },
    ];

    // Append last 4 messages for conversation memory
    const recentHistory = history.slice(-4);
    recentHistory.forEach((msg) => {
      contents.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    });

    contents.push({
      role: "user",
      parts: [{ text: userQuery }],
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      console.warn("Gemini API response not OK, using shopkeeper fallback:", response.statusText);
      return getOfflineShopkeeperResponse(userQuery);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply && reply.trim()) {
      return reply.trim();
    }

    return getOfflineShopkeeperResponse(userQuery);
  } catch (err) {
    console.warn("Gemini fetch error, using shopkeeper fallback:", err);
    return getOfflineShopkeeperResponse(userQuery);
  }
}

/** Warm Indian Shopkeeper Rule Engine Fallback */
function getOfflineShopkeeperResponse(userText: string): string {
  const lower = userText.toLowerCase();

  if (lower.includes("hi") || lower.includes("hello") || lower.includes("namaste") || lower.includes("hey")) {
    return "Namasteji! 🙏 Aao aao, welcome to ElegantlyWoven! Tell meji, what occasion or color are you looking for today? We have pure Kanjivaram, Banarasi, and Chanderi sarees straight from our master weavers!";
  }

  if (lower.includes("wedding") || lower.includes("bridal") || lower.includes("shaadi") || lower.includes("marriage")) {
    return "Arre wah! For weddings, nothing beats our 'Sindoor Bridal Banarasi' (₹18,999) and 'Kanchipuram Temple Silk' (₹24,999)! Both have certified gold zari pallu work. Aap bilkul queen lagoge!";
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate") || lower.includes("budget") || lower.includes("cheap")) {
    return "Ji bilkul! Our handloom collection starts from ₹2,499 for daily linen & cotton drapes up to ₹45,000 for bridal royal silks. All prices include GST, plus free shipping on orders above ₹2,999!";
  }

  if (lower.includes("ship") || lower.includes("delivery") || lower.includes("track") || lower.includes("time")) {
    return "Aap tension mat lijiye! We ship via express courier in 3 to 5 business days across India. Doorstep delivery with live tracking & Silk Mark certificate included!";
  }

  if (lower.includes("return") || lower.includes("exchange") || lower.includes("quality") || lower.includes("silk mark")) {
    return "Bilkul 100% genuine pure silkji! Every saree comes with official Silk Mark certification and a 7-day easy return policy. Quality is our guarantee!";
  }

  if (lower.includes("cotton") || lower.includes("linen") || lower.includes("daily") || lower.includes("office")) {
    return "For comfortable daily or office wear, check out our 'Chanderi Tissue Silk' and 'Mangalagiri Cotton' sarees! Light as air, super elegant, and easy to drape all day long.";
  }

  return "Aapka choice bilkul shandar hai! Explore our 'Collections' page to see all drapes, or tap the WhatsApp button below to speak directly with our weaver team on video call!";
}
