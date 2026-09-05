import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

// ============================================================
// FONT
// ============================================================

const notoSans = Noto_Sans({
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
});

// ============================================================
// GLOBAL SEO METADATA
// ============================================================

export const metadata: Metadata = {
  // ==========================================================
  // TITLE
  // ==========================================================

  title: {
    default:
     "Nepal News | Nepali News | Breaking News Nepal | Latest Nepal News | Prashnaa",

    template: "%s | प्रश्ना न्यूज",
  },

  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  description:
    "प्रश्ना न्यूज नेपालको डिजिटल समाचार पोर्टल हो। नेपाल तथा विश्वभरका ताजा र महत्वपूर्ण समाचार, राजनीति, समाज, अर्थतन्त्र, व्यापार, प्रविधि, खेलकुद, मनोरञ्जन, शिक्षा र समसामयिक खबरहरू पढ्नुहोस्।",

  // ==========================================================
  // KEYWORDS
  // ==========================================================

  keywords: [
    // Brand - Nepali
    "प्रश्ना न्यूज",
    "प्रश्ना न्युज",
    "प्रश्ना समाचार",
    "प्रश्ना न्यूज नेपाल",
    "प्रश्ना नेपाल",
    "प्रश्ना खबर",
    "प्रश्ना ताजा समाचार",

    // Brand - English
    "Prashnaa News",
    "Prashnaa News Nepal",
    "Prashnaa Nepal",
    "Prashnaa News Portal",
    "Prashnaa News Online",
    "Prashnaa",

    // General Nepali News
    "नेपाली समाचार",
    "नेपाल समाचार",
    "आजको समाचार",
    "आजका समाचार",
    "ताजा समाचार",
    "ताजा नेपाली समाचार",
    "नेपालको ताजा समाचार",
    "नेपालका समाचार",
    "नेपालको समाचार",
    "समाचार नेपाल",
    "अनलाइन समाचार",
    "अनलाइन नेपाली समाचार",
    "डिजिटल समाचार",
    "नेपाली अनलाइन न्यूज",
    "नेपाल अनलाइन न्यूज",
    "विश्वसनीय समाचार",
    "नेपालको विश्वसनीय समाचार",
    "ताजा खबर",
    "आजको ताजा खबर",
    "नेपालको ताजा खबर",

    // General English News
    "Nepal News",
    "Nepali News",
    "Nepal News Today",
    "Nepali News Today",
    "Latest Nepal News",
    "Latest Nepali News",
    "Nepal Latest News",
    "Latest News Nepal",
    "Breaking News Nepal",
    "Nepal Breaking News",
    "News Nepal",
    "News in Nepal",
    "News from Nepal",
    "Nepal Online News",
    "Online News Nepal",
    "Nepali Online News",
    "Digital News Nepal",
    "Nepal News Portal",
    "Nepali News Portal",
    "Nepal News Website",
    "Nepali News Website",
    "Top News Nepal",
    "Top Nepal News",
    "Trusted News Nepal",
    "Reliable News Nepal",

    // Politics
    "राजनीति",
    "राजनीति समाचार",
    "नेपाल राजनीति",
    "नेपाल राजनीति समाचार",
    "राजनीतिक समाचार",
    "Political News Nepal",
    "Nepal Politics",
    "Nepal Political News",
    "Nepal Politics News",
    "Latest Nepal Politics",

    // Society
    "समाज",
    "समाज समाचार",
    "सामाजिक समाचार",
    "नेपाल समाज",
    "Society News Nepal",
    "Social News Nepal",
    "Nepal Society News",

    // Economy & Business
    "अर्थतन्त्र",
    "अर्थतन्त्र समाचार",
    "आर्थिक समाचार",
    "नेपाल अर्थतन्त्र",
    "व्यापार समाचार",
    "व्यवसाय समाचार",
    "नेपाल व्यापार",
    "Economic News Nepal",
    "Nepal Economy",
    "Nepal Economic News",
    "Business News Nepal",
    "Nepal Business News",
    "Nepal Business",

    // Technology
    "प्रविधि",
    "प्रविधि समाचार",
    "नेपाल प्रविधि",
    "टेक्नोलोजी समाचार",
    "Technology News Nepal",
    "Tech News Nepal",
    "Nepal Technology News",
    "Nepal Tech News",

    // Sports
    "खेलकुद",
    "खेलकुद समाचार",
    "नेपाल खेलकुद",
    "खेल समाचार",
    "Sports News Nepal",
    "Nepal Sports News",
    "Nepal Sports",
    "Latest Sports News Nepal",

    // Entertainment
    "मनोरञ्जन",
    "मनोरञ्जन समाचार",
    "नेपाली मनोरञ्जन",
    "चलचित्र समाचार",
    "फिल्म समाचार",
    "Entertainment News Nepal",
    "Nepali Entertainment News",
    "Nepal Entertainment News",
    "Nepali Movie News",
    "Nepal Film News",

    // Education
    "शिक्षा",
    "शिक्षा समाचार",
    "नेपाल शिक्षा",
    "शैक्षिक समाचार",
    "Education News Nepal",
    "Nepal Education News",
    "Nepal Education",

    // Lifestyle
    "जीवनशैली",
    "जीवनशैली समाचार",
    "नेपाल जीवनशैली",
    "Lifestyle News Nepal",
    "Nepal Lifestyle News",
    "Nepali Lifestyle",

    // National / International
    "राष्ट्रिय समाचार",
    "अन्तर्राष्ट्रिय समाचार",
    "नेपाल राष्ट्रिय समाचार",
    "विश्व समाचार",
    "National News Nepal",
    "International News Nepal",
    "World News Nepal",
    "Nepal National News",
    "Nepal International News",

    // Current / Breaking
    "ब्रेकिङ न्यूज",
    "ब्रेकिङ समाचार",
    "ताजा खबर नेपाल",
    "पछिल्लो समाचार",
    "पछिल्लो खबर",
    "समसामयिक समाचार",
    "Breaking News",
    "Breaking News Nepal",
    "Latest News",
    "Latest News Nepal",
    "Current News Nepal",
    "Latest Updates Nepal",
  ],

  // ==========================================================
  // AUTHORS
  // ==========================================================

  authors: [
    {
      name: "प्रश्ना न्यूज",
      url: "https://www.prashnaa.com/",
    },
  ],

  creator: "प्रश्ना न्यूज",

  publisher: "प्रश्ना न्यूज",

  // ==========================================================
  // PRODUCTION WEBSITE
  // ==========================================================

  metadataBase: new URL(
    "https://www.prashnaa.com"
  ),

  // ==========================================================
  // GOOGLE SEARCH CONSOLE
  // ==========================================================

  verification: {
    google:
      "JY08RkncfVwO8VI9uFp00GROZnFRmrmu2lmnNXao9eA",
  },

  // ==========================================================
  // CANONICAL
  // ==========================================================

  alternates: {
    canonical: "/",
  },

  // ==========================================================
  // OPEN GRAPH
  // ==========================================================

  openGraph: {
    type: "website",

    locale: "ne_NP",

    siteName: "प्रश्ना न्यूज",

    title:
      "प्रश्ना न्यूज | नेपालको ताजा र विश्वसनीय समाचार",

    description:
      "नेपाल तथा विश्वभरका ताजा समाचार, राजनीति, समाज, अर्थतन्त्र, व्यापार, प्रविधि, खेलकुद, मनोरञ्जन, शिक्षा र समसामयिक खबरहरू प्रश्ना न्यूजमा पढ्नुहोस्।",

    url: "/",

    images: [
      {
        url: "/og-image.jpg",

        width: 1200,

        height: 630,

        alt:
          "प्रश्ना न्यूज - नेपालको ताजा समाचार",
      },
    ],
  },

  // ==========================================================
  // TWITTER / X
  // ==========================================================

  twitter: {
    card: "summary_large_image",

    title:
      "प्रश्ना न्यूज | नेपालको ताजा र विश्वसनीय समाचार",

    description:
      "नेपाल तथा विश्वभरका ताजा समाचार, राजनीति, समाज, अर्थतन्त्र, प्रविधि, खेलकुद र मनोरञ्जनका खबरहरू।",

    images: ["/og-image.jpg"],
  },

  // ==========================================================
  // ROBOTS
  // ==========================================================

  robots: {
    index: true,

    follow: true,

    googleBot: {
      index: true,

      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },
};

// ============================================================
// ROOT LAYOUT
// ============================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ne">
      <body className={notoSans.variable}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}