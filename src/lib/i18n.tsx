import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type LanguageCode = "EN" | "HI" | "TA" | "KN";

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (text: string) => string;
  translateAsync: (text: string) => Promise<string>;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Comprehensive local dictionary for 0ms instant UI translation
const DICTIONARY: Record<LanguageCode, Record<string, string>> = {
  EN: {},
  HI: {
    "Home": "होम",
    "Collections": "संग्रह",
    "Categories": "श्रेणियां",
    "Track order": "ऑर्डर ट्रैक करें",
    "Account": "खाता",
    "Sign In": "साइन इन करें",
    "Sign out": "साइन आउट करें",
    "Support": "सहायता",
    "Offers": "ऑफ़र",
    "Shopping bag": "शॉपिंग बैग",
    "Wishlist": "विशलिस्ट",
    "Search": "खोजें",
    "Search sarees": "साड़ियां खोजें",
    "Search for Kanjivaram, cotton, bridal…": "कांजीवरम, सूती, दुल्हन साड़ियां खोजें…",
    "My Account": "मेरा खाता",
    "Dashboard": "डैशबोर्ड",
    "My Orders": "मेरे ऑर्डर",
    "Add to bag": "बैग में जोड़ें",
    "Buy now": "अभी खरीदें",
    "Add to wishlist": "विशलिस्ट में जोड़ें",
    "Saved": "सहेजा गया",
    "Quick add": "त्वरित जोड़ें",
    "Sold out": "बिक गया",
    "Filters": "फ़िल्टर",
    "Clear all": "सभी साफ़ करें",
    "Price": "मूल्य",
    "In stock only": "केवल स्टॉक में उपलब्ध",
    "Sort by": "क्रमानुसाार",
    "Popularity": "लोकप्रियता",
    "Newest first": "नवीनतम पहले",
    "Price: low to high": "मूल्य: कम से अधिक",
    "Price: high to low": "मूल्य: अधिक से कम",
    "Discount": "छूट",
    "Customer rating": "ग्राहक रेटिंग",
    "Checkout": "चेकआउट",
    "Proceed to checkout": "चेकआउट के लिए आगे बढ़ें",
    "Subtotal": "उप-योग",
    "GST (5%)": "जीएसटी (5%)",
    "Shipping": "शिपिंग",
    "Grand total": "कुल योग",
    "Free": "मुफ्त",
    "Apply": "लागू करें",
    "Coupon code": "कूपन कोड",
    "Delivery & services": "वितरण और सेवाएं",
    "Enter pincode": "पिनकोड दर्ज करें",
    "Check": "जांचें",
    "Description": "विवरण",
    "Specifications": "विशेषताएं",
    "Care": "देखभाल",
    "Q & A": "प्रश्न और उत्तर",
    "Reviews": "समीक्षाएं",
    "Write a review": "समीक्षा लिखें",
    "Frequently bought together": "अक्सर साथ खरीदे जाने वाले",
    "Similar sarees": "समान साड़ियां",
    "Recently viewed": "हाल ही में देखे गए",
    "Silk Mark certified": "सिल्क मार्क प्रमाणित",
    "2–4 day delivery": "2–4 दिनों में डिलीवरी",
    "7-day easy returns": "7-दिनों में आसान वापसी",
    "Fall, pico & blouse": "फॉल, पीको और ब्लाउज",
  },
  TA: {
    "Home": "முகப்பு",
    "Collections": "தொகுப்புகள்",
    "Categories": "வகைகள்",
    "Track order": "ஆர்டரைக் கண்காணிக்க",
    "Account": "கணக்கு",
    "Sign In": "உள்நுழைக",
    "Sign out": "வெளியேறு",
    "Support": "ஆதரவு",
    "Offers": "சலுகைகள்",
    "Shopping bag": "ஷாப்பிங் பை",
    "Wishlist": "விருப்பப்பட்டியல்",
    "Search": "தேடு",
    "Search sarees": "புடவைகளைத் தேடு",
    "Search for Kanjivaram, cotton, bridal…": "காஞ்சீவரம், பருத்தி, மணமகள் புடவைகளைத் தேடு…",
    "My Account": "என் கணக்கு",
    "Dashboard": "டாஷ்போர்டு",
    "My Orders": "என் ஆர்டர்கள்",
    "Add to bag": "பையில் சேர்",
    "Buy now": "இப்போதே வாங்கு",
    "Add to wishlist": "விருப்பப்பட்டியலில் சேர்",
    "Saved": "சேமிக்கப்பட்டது",
    "Quick add": "விரைவு சேர்க்கை",
    "Sold out": "விற்பனையானது",
    "Filters": "வடிகட்டிகள்",
    "Clear all": "அனைத்தையும் நீக்கு",
    "Price": "விலை",
    "In stock only": "இருப்பில் உள்ளவை மட்டும்",
    "Sort by": "வரிசைப்படுத்து",
    "Popularity": "பிரபலம்",
    "Newest first": "புதியவை முதலில்",
    "Price: low to high": "விலை: குறைந்ததிலிருந்து அதிகம்",
    "Price: high to low": "விலை: அதிகத்திலிருந்து குறைவு",
    "Discount": "தள்ளுபடி",
    "Customer rating": "வாடிக்கையாளர் மதிப்பீடு",
    "Checkout": "செக்அவுட்",
    "Proceed to checkout": "செக்அவுட்டிற்குச் செல்",
    "Subtotal": "கூட்டுத்தொகை",
    "GST (5%)": "ஜிஎஸ்டி (5%)",
    "Shipping": "ஷிப்பிங்",
    "Grand total": "மொத்தத் தொகை",
    "Free": "இலவசம்",
    "Apply": "பயன்படுத்து",
    "Coupon code": "கூப்பன் குறியீடு",
    "Delivery & services": "டெலிவரி மற்றும் சேவைகள்",
    "Enter pincode": "பின்கோடு உள்ளிடவும்",
    "Check": "சரிபார்க்கவும்",
    "Description": "விளக்கம்",
    "Specifications": "விவரக்குறிப்புகள்",
    "Care": "பராமரிப்பு",
    "Q & A": "கேள்வி பதில்",
    "Reviews": "மதிப்புரைகள்",
    "Write a review": "மதிப்புரை எழுதுக",
    "Frequently bought together": "அடிக்கடி ஒன்றாக வாங்கப்படுபவை",
    "Similar sarees": "ஒத்த புடவைகள்",
    "Recently viewed": "சமீபத்தில் பார்த்தவை",
    "Silk Mark certified": "சில்க் மார்க் சான்றளிக்கப்பட்டது",
    "2–4 day delivery": "2–4 நாட்களில் டெலிவரி",
    "7-day easy returns": "7-நாள் சுலபமான திரும்பப்பெறுதல்",
    "Fall, pico & blouse": "ஃபால், பீக்கோ மற்றும் பிளவுஸ்",
  },
  KN: {
    "Home": "ಮುಖಪುಟ",
    "Collections": "ಸಂಗ್ರಹಣೆಗಳು",
    "Categories": "ವರ್ಗಗಳು",
    "Track order": "ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    "Account": "ಖಾತೆ",
    "Sign In": "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    "Sign out": "ಸೈನ್ ಔಟ್ ಮಾಡಿ",
    "Support": "ಬೆಂಬಲ",
    "Offers": "ಆಫರ್‌ಗಳು",
    "Shopping bag": "ಶಾಪಿಂಗ್ ಬ್ಯಾಗ್",
    "Wishlist": "ವಿಶ್‌ಲಿಸ್ಟ್",
    "Search": "ಹುಡುಕಿ",
    "Search sarees": "ಸೀರೆಗಳನ್ನು ಹುಡುಕಿ",
    "Search for Kanjivaram, cotton, bridal…": "ಕಾಂಜೀವರಂ, ಕಾಟನ್, ಬ್ರೈಡಲ್ ಸೀರೆಗಳನ್ನು ಹುಡುಕಿ…",
    "My Account": "ನನ್ನ ಖಾತೆ",
    "Dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "My Orders": "ನನ್ನ ಆರ್ಡರ್‌ಗಳು",
    "Add to bag": "ಬ್ಯಾಗ್‌ಗೆ ಸೇರಿಸಿ",
    "Buy now": "ಈಗಲೇ ಖರೀದಿಸಿ",
    "Add to wishlist": "ವಿಶ್‌ಲಿಸ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
    "Saved": "ಉಳಿಸಲಾಗಿದೆ",
    "Quick add": "ತ್ವರಿತ ಸೇರ್ಪಡೆ",
    "Sold out": "ಖಾಲಿಯಾಗಿದೆ",
    "Filters": "ಫಿಲ್ಟರ್‌ಗಳು",
    "Clear all": "ಎಲ್ಲವನ್ನೂ ತೆರವುಗೊಳಿಸಿ",
    "Price": "ಬೆಲೆ",
    "In stock only": "ಸ್ಟಾಕ್‌ನಲ್ಲಿರುವವು ಮಾತ್ರ",
    "Sort by": "ವಿಂಗಡಿಸಿ",
    "Popularity": "ಜನಪ್ರಿಯತೆ",
    "Newest first": "ಹೊಸವು ಮೊದಲು",
    "Price: low to high": "ಬೆಲೆ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚು",
    "Price: high to low": "ಬೆಲೆ: ಹೆಚ್ಚಿನಿಂದ ಕಡಿಮೆ",
    "Discount": "ರಿಯಾಯಿತಿ",
    "Customer rating": "ಗ್ರಾಹಕ ರೇಟಿಂಗ್",
    "Checkout": "ಚೆಕ್‌ಔಟ್",
    "Proceed to checkout": "ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ",
    "Subtotal": "ಉಪಮೊತ್ತ",
    "GST (5%)": "ಜಿಎಸ್‌ಟಿ (5%)",
    "Shipping": "ಶಿಪ್ಪಿಂಗ್",
    "Grand total": "ಒಟ್ಟು ಮೊತ್ತ",
    "Free": "ಉಚಿತ",
    "Apply": "ಅನ್ವಯಿಸಿ",
    "Coupon code": "ಕೂಪನ್ ಕೋಡ್",
    "Delivery & services": "ಡೆಲಿವರಿ ಮತ್ತು ಸೇವೆಗಳು",
    "Enter pincode": "ಪಿನ್‌ಕೋಡ್ ನಮೂದಿಸಿ",
    "Check": "ಪರಿಶೀಲಿಸಿ",
    "Description": "ವಿವರಣೆ",
    "Specifications": "ವಿವರಣೆಗಳು",
    "Care": "ಕಾಳಜಿ",
    "Q & A": "ಪ್ರಶ್ನೋತ್ತರ",
    "Reviews": "ವಿಮರ್ಶೆಗಳು",
    "Write a review": "ವಿಮರ್ಶೆ ಬರೆಯಿರಿ",
    "Frequently bought together": "ಒಟ್ಟಿಗೆ ಹೆಚ್ಚಾಗಿ ಖರೀದಿಸಿದವು",
    "Similar sarees": "ಸಮಾನ ಸೀರೆಗಳು",
    "Recently viewed": "ಇತ್ತೀಚೆಗೆ ವೀಕ್ಷಿಸಿದವು",
    "Silk Mark certified": "ಸಿಲ್ಕ್ ಮಾರ್ಕ್ ಪ್ರಮಾಣೀಕೃತ",
    "2–4 day delivery": "2-4 ದಿನಗಳಲ್ಲಿ ಡೆಲಿವರಿ",
    "7-day easy returns": "7-ದಿನಗಳ ಸುಲಭ ವಾಪಸಾತಿ",
    "Fall, pico & blouse": "ಫಾಲ್, ಪಿಕೊ ಮತ್ತು ಬ್ಲೌಸ್",
  },
};

const ISO_MAP: Record<LanguageCode, string> = {
  EN: "en",
  HI: "hi",
  TA: "ta",
  KN: "kn",
};

const translationCache = new Map<string, string>();

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== "undefined") {
      try {
        return (localStorage.getItem("ew_lang") as LanguageCode) || "EN";
      } catch {
        return "EN";
      }
    }
    return "EN";
  });
  const [isTranslating, setIsTranslating] = useState(false);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ew_lang", lang);
        document.documentElement.lang = ISO_MAP[lang] || "en";
      } catch {
        /* fallback */
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = ISO_MAP[language] || "en";
    }
  }, [language]);

  // Synchronous dictionary translator with 0ms latency
  const t = useCallback(
    (text: string): string => {
      if (language === "EN" || !text) return text;
      const dict = DICTIONARY[language];
      if (dict && dict[text]) {
        return dict[text]!;
      }
      const cacheKey = `${language}:${text}`;
      if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey)!;
      }
      return text;
    },
    [language]
  );

  // Dynamic async translator using free open source MyMemory API for database/custom text
  const translateAsync = useCallback(
    async (text: string): Promise<string> => {
      if (language === "EN" || !text.trim()) return text;
      const dict = DICTIONARY[language];
      if (dict && dict[text]) {
        return dict[text]!;
      }

      const cacheKey = `${language}:${text}`;
      if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey)!;
      }

      try {
        setIsTranslating(true);
        const targetIso = ISO_MAP[language];
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            text
          )}&langpair=en|${targetIso}`
        );
        const data = await res.json();
        if (data && data.responseData && data.responseData.translatedText) {
          const translated = data.responseData.translatedText;
          translationCache.set(cacheKey, translated);
          setIsTranslating(false);
          return translated;
        }
      } catch (err) {
        console.error("Free Translation API Error:", err);
      } finally {
        setIsTranslating(false);
      }
      return text;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateAsync, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return ctx;
}
