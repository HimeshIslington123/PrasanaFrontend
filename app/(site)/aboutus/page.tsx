import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "हाम्रो बारेमा | प्रसन्ना न्यूज - नेपालको विश्वसनीय समाचार पोर्टल",

  description:
    "प्रसन्ना न्यूज नेपालको डिजिटल समाचार पोर्टल हो, जहाँ नेपाल र विश्वका ताजा तथा महत्वपूर्ण समाचार पढ्न सकिन्छ। राजनीति, समाज, अर्थतन्त्र, प्रविधि, मनोरञ्जन, खेलकुद, शिक्षा र समसामयिक विषयका विश्वसनीय नेपाली समाचार पढ्नुहोस्।",

  keywords: [
    // प्रसन्ना न्यूजका नाम तथा ब्रान्ड
    "प्रसन्ना न्यूज",
    "प्रसन्ना न्युज",
    "प्रसन्ना समाचार",
    "प्रसन्ना न्यूज़",
    "प्रसन्ना न्यूज नेपाल",
    "Prasanna News",
    "Prasanna News Nepal",
    "Prasanna Nepal",
    "Prassana News",
    "Prassana News Nepal",
    "Prassana Nepal",

    // नेपाली समाचार
    "नेपाली समाचार",
    "नेपाल समाचार",
    "आजको समाचार",
    "ताजा समाचार",
    "ताजा नेपाली समाचार",
    "नेपालको समाचार",
    "नेपालका समाचार",
    "समाचार नेपाल",
    "अनलाइन समाचार",
    "अनलाइन नेपाली समाचार",
    "डिजिटल समाचार",
    "विश्वसनीय समाचार",
    "नेपालको विश्वसनीय समाचार",
    "नेपालको उत्कृष्ट समाचार",
    "नेपालको लोकप्रिय समाचार",

    // English search terms
    "Nepali News",
    "Nepal News",
    "Latest Nepal News",
    "Latest Nepali News",
    "Nepal Latest News",
    "Breaking News Nepal",
    "News Nepal",
    "Online News Nepal",
    "Best News in Nepal",
    "Best News Nepal",
    "Top News Nepal",
    "Nepal News Portal",
    "Nepali News Portal",

    // समाचारका विधा
    "राष्ट्रिय समाचार",
    "अन्तर्राष्ट्रिय समाचार",
    "राजनीति समाचार",
    "नेपाल राजनीति समाचार",
    "समाज समाचार",
    "अर्थतन्त्र समाचार",
    "आर्थिक समाचार",
    "व्यापार समाचार",
    "प्रविधि समाचार",
    "मनोरञ्जन समाचार",
    "खेलकुद समाचार",
    "शिक्षा समाचार",
    "स्वास्थ्य समाचार",
    "जीवनशैली समाचार",
    "युवा समाचार",
    "समसामयिक समाचार",
  ],

  authors: [
    {
      name: "प्रसन्ना न्यूज",
    },
  ],

  creator: "प्रसन्ना न्यूज",
  publisher: "प्रसन्ना न्यूज",

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

  openGraph: {
    title: "प्रसन्ना न्यूज | नेपालको विश्वसनीय डिजिटल समाचार पोर्टल",

    description:
      "नेपाल र विश्वका ताजा तथा महत्वपूर्ण समाचार। राजनीति, समाज, अर्थतन्त्र, प्रविधि, मनोरञ्जन, खेलकुद, शिक्षा र समसामयिक विषयका नेपाली समाचार प्रसन्ना न्यूजमा पढ्नुहोस्।",

    type: "website",

    locale: "ne_NP",

    siteName: "प्रसन्ना न्यूज",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "प्रसन्ना न्यूज",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "प्रसन्ना न्यूज | नेपालको विश्वसनीय समाचार पोर्टल",

    description:
      "नेपाल र विश्वका ताजा समाचार, राजनीति, समाज, अर्थतन्त्र, प्रविधि, मनोरञ्जन, खेलकुद र समसामयिक समाचार।",

    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 lg:py-16">

        {/* Header */}
        <section className="mb-12 text-center">
          <h1 className="mb-5 text-4xl font-bold text-gray-900 md:text-5xl">
            हाम्रो बारेमा
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
            प्रसन्ना न्यूजमा स्वागत छ — नेपालको ताजा, विश्वसनीय र
            समसामयिक समाचारका लागि तपाईंको डिजिटल समाचार गन्तव्य।
          </p>
        </section>

        {/* About */}
        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            प्रसन्ना न्यूजको बारेमा
          </h2>

          <div className="space-y-5 text-base leading-8 text-gray-700">
            <p>
              <strong>प्रसन्ना न्यूज</strong> नेपाली पाठकहरूसम्म
              विश्वसनीय, सान्दर्भिक र समयमै समाचार तथा जानकारी
              पुर्‍याउने उद्देश्यले तयार गरिएको डिजिटल समाचार पोर्टल हो।
            </p>

            <p>
              नेपाल तथा विश्वभर भइरहेका महत्वपूर्ण घटनाक्रमलाई
              पाठकसमक्ष सरल, स्पष्ट र सहज भाषामा प्रस्तुत गर्नु
              हाम्रो प्राथमिकता हो। राजनीति, समाज, अर्थतन्त्र,
              प्रविधि, मनोरञ्जन, खेलकुद, शिक्षा, जीवनशैली तथा
              समसामयिक विषयसँग सम्बन्धित समाचारहरू हामी प्रस्तुत गर्छौं।
            </p>

            <p>
              बदलिँदो डिजिटल युगमा पाठकहरूले छिटो र सहज रूपमा
              समाचार प्राप्त गर्न सकून् भन्ने उद्देश्यले प्रसन्ना न्यूजले
              डिजिटल पत्रकारितालाई प्राथमिकता दिएको छ।
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            हाम्रो उद्देश्य
          </h2>

          <p className="text-base leading-8 text-gray-700">
            प्रसन्ना न्यूजको मुख्य उद्देश्य नेपाल र विश्वका महत्वपूर्ण
            घटनाक्रम तथा समसामयिक विषयलाई पाठकसमक्ष जिम्मेवार,
            स्पष्ट र प्रभावकारी ढंगले पुर्‍याउनु हो। तथ्यमा आधारित
            समाचार र उपयोगी जानकारीमार्फत पाठकलाई सूचित बनाउनु
            हाम्रो प्रमुख लक्ष्य हो।
          </p>
        </section>

        {/* What we cover */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            हामी के प्रस्तुत गर्छौं?
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "राष्ट्रिय तथा अन्तर्राष्ट्रिय समाचार",
              "राजनीति तथा समसामयिक विषय",
              "समाज तथा समुदायसँग सम्बन्धित समाचार",
              "अर्थतन्त्र तथा व्यापार",
              "प्रविधि तथा डिजिटल संसार",
              "मनोरञ्जन तथा सेलिब्रिटी समाचार",
              "खेलकुद तथा खेल समाचार",
              "शिक्षा तथा युवा केन्द्रित सामग्री",
              "जीवनशैली तथा संस्कृति",
              "विशेष रिपोर्ट तथा विचारप्रधान सामग्री",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <p className="font-medium text-gray-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Commitment */}
        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            हाम्रो प्रतिबद्धता
          </h2>

          <div className="space-y-5 text-base leading-8 text-gray-700">
            <p>
              पाठकको विश्वास नै हाम्रो सबैभन्दा ठूलो जिम्मेवारी हो।
              त्यसैले समाचार सामग्री तयार तथा प्रकाशन गर्दा तथ्यको
              शुद्धता, स्रोतको विश्वसनीयता, स्पष्टता र जिम्मेवार
              पत्रकारिताका आधारभूत मान्यतालाई प्राथमिकता दिने हाम्रो
              प्रतिबद्धता छ।
            </p>

            <p>
              हामी हाम्रा पाठकहरूलाई सही सूचना प्रदान गर्दै नेपालको
              डिजिटल समाचार क्षेत्रमा सकारात्मक योगदान पुर्‍याउने
              निरन्तर प्रयास गर्छौं।
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-12 rounded-xl bg-gray-50 p-8">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            हाम्रो दृष्टिकोण
          </h2>

          <p className="text-base leading-8 text-gray-700">
            विश्वसनीय सूचना, आधुनिक प्रविधि र जिम्मेवार पत्रकारितालाई
            संयोजन गर्दै नेपाली पाठकका लागि भरपर्दो डिजिटल समाचार
            प्लेटफर्म बन्नु हाम्रो दीर्घकालीन दृष्टिकोण हो।
          </p>
        </section>

        {/* Closing */}
        <section className="border-t border-gray-200 pt-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            प्रसन्ना न्यूज
          </h2>

          <p className="text-lg font-medium text-gray-600">
            सत्य, सूचना र समयको आवाज।
          </p>
        </section>

      </div>
    </main>
  );
}