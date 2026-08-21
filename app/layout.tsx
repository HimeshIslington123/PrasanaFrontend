import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const notoSans = Noto_Sans({
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
});

export const metadata: Metadata = {
  title: {
    default: "प्रश्न",
    template: "%s | प्रश्न",
  },

  description:
    "प्रश्न नेपालको भरपर्दो नेपाली समाचार पोर्टल हो। नेपाल तथा विश्वभरका पछिल्ला राजनीति, समाज, अर्थतन्त्र, खेलकुद, मनोरञ्जन र समसामयिक समाचारहरू पढ्नुहोस्।",

  keywords: [
    "प्रश्न",
    "Prashna",
    "Prashna News",
    "Nepal News",
    "Nepali News",
    "नेपाली समाचार",
    "नेपाल समाचार",
    "ताजा समाचार",
    "आजको समाचार",
    "नेपालका समाचार",
    "राजनीति",
    "समाज",
    "अर्थतन्त्र",
    "खेलकुद",
    "मनोरञ्जन",
  ],

  authors: [
    {
      name: "प्रश्न",
    },
  ],

  creator: "प्रश्न",

  publisher: "प्रश्न",

  openGraph: {
    type: "website",
    locale: "ne_NP",
    siteName: "प्रश्न",
    title: "प्रश्न | नेपालको पछिल्लो समाचार",
    description:
      "नेपाल तथा विश्वभरका पछिल्ला समाचार, राजनीति, समाज,df अर्थतन्त्र, खेलकुद र मनोरञ्जनका जानकारी।",
  },

  twitter: {
    card: "summary_large_image",
    title: "प्रश्न | नेपालको पछिल्लो समाचार",
    description:
      "नेपाल तथा विश्वभरका पछिल्ला समाचार र जानकारी।",
  },

  robots: {
    index: true,
    follow: true,
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
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}