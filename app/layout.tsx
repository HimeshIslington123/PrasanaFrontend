import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
});

export const metadata: Metadata = {
  title: {
    default: "प्रसन्ना न्यूज | नेपालको ताजा र विश्वसनीय समाचार",
    template: "%s | प्रसन्ना न्यूज",
  },

  description:
    "प्रसन्ना न्यूज नेपालको डिजिटल समाचार पोर्टल हो। नेपाल तथा विश्वभरका ताजा र महत्वपूर्ण समाचार, राजनीति, समाज, अर्थतन्त्र, व्यापार, प्रविधि, खेलकुद, मनोरञ्जन, शिक्षा र समसामयिक खबरहरू पढ्नुहोस्।",

  keywords: [
    // =========================
    // Brand - Nepali
    // =========================
    "प्रसन्ना न्यूज",
    "प्रसन्ना न्युज",
    "प्रसन्ना समाचार",
    "प्रसन्ना न्यूज नेपाल",
    "प्रसन्ना नेपाल",
    "प्रसन्ना",
    "प्रसन्ना खबर",
    "प्रसन्ना ताजा समाचार",

    // =========================
    // Brand - English
    // =========================
    "Prasanna News",
    "Prasanna News Nepal",
    "Prasanna Nepal",
    "Prasanna News Portal",
    "Prasanna News Online",
    "Prasanna",
    "Prassana News",
    "Prassana News Nepal",
    "Prassana Nepal",
    "Prassana News Portal",

    // =========================
    // General Nepali News
    // =========================
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

    // =========================
    // General English News
    // =========================
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
    "Best News Nepal",
    "Best News in Nepal",
    "Trusted News Nepal",
    "Reliable News Nepal",

    // =========================
    // Politics
    // =========================
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

    // =========================
    // Society
    // =========================
    "समाज",
    "समाज समाचार",
    "सामाजिक समाचार",
    "नेपाल समाज",
    "Society News Nepal",
    "Social News Nepal",
    "Nepal Society News",

    // =========================
    // Economy & Business
    // =========================
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

    // =========================
    // Technology
    // =========================
    "प्रविधि",
    "प्रविधि समाचार",
    "नेपाल प्रविधि",
    "टेक्नोलोजी समाचार",
    "Technology News Nepal",
    "Tech News Nepal",
    "Nepal Technology News",
    "Nepal Tech News",

    // =========================
    // Sports
    // =========================
    "खेलकुद",
    "खेलकुद समाचार",
    "नेपाल खेलकुद",
    "खेल समाचार",
    "Sports News Nepal",
    "Nepal Sports News",
    "Nepal Sports",
    "Latest Sports News Nepal",

    // =========================
    // Entertainment
    // =========================
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

    // =========================
    // Education
    // =========================
    "शिक्षा",
    "शिक्षा समाचार",
    "नेपाल शिक्षा",
    "शैक्षिक समाचार",
    "Education News Nepal",
    "Nepal Education News",
    "Nepal Education",

    // =========================
    // Lifestyle
    // =========================
    "जीवनशैली",
    "जीवनशैली समाचार",
    "नेपाल जीवनशैली",
    "Lifestyle News Nepal",
    "Nepal Lifestyle News",
    "Nepali Lifestyle",

    // =========================
    // National / International
    // =========================
    "राष्ट्रिय समाचार",
    "अन्तर्राष्ट्रिय समाचार",
    "नेपाल राष्ट्रिय समाचार",
    "विश्व समाचार",
    "National News Nepal",
    "International News Nepal",
    "World News Nepal",
    "Nepal National News",
    "Nepal International News",

    // =========================
    // Current / Breaking
    // =========================
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

  authors: [
    {
      name: "प्रसन्ना न्यूज",
    },
  ],

  creator: "प्रसन्ना न्यूज",
  publisher: "प्रसन्ना न्यूज",

  metadataBase: new URL("https://your-domain.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "ne_NP",
    siteName: "प्रसन्ना न्यूज",

    title: "प्रसन्ना न्यूज | नेपालको ताजा र विश्वसनीय समाचार",

    description:
      "नेपाल तथा विश्वभरका ताजा समाचार, राजनीति, समाज, अर्थतन्त्र, व्यापार, प्रविधि, खेलकुद, मनोरञ्जन, शिक्षा र समसामयिक खबरहरू प्रसन्ना न्यूजमा पढ्नुहोस्।",

    url: "/",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "प्रसन्ना न्यूज - नेपालको ताजा समाचार",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "प्रसन्ना न्यूज | नेपालको ताजा र विश्वसनीय समाचार",

    description:
      "नेपाल तथा विश्वभरका ताजा समाचार, राजनीति, समाज, अर्थतन्त्र, प्रविधि, खेलकुद र मनोरञ्जनका खबरहरू।",

    images: ["/og-image.jpg"],
  },

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ne">
      <body className={notoSans.variable}>
        {children}
      </body>
    </html>
  );
}