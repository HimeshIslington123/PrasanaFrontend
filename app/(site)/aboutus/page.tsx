import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "हाम्रो बारेमा | प्रश्न न्यूज",
  description:
    "प्रश्न न्यूज नेपाल तथा विश्वका समाचार, सूचना र समसामयिक विषय प्रस्तुत गर्ने स्वतन्त्र डिजिटल समाचार पोर्टल हो।",

  keywords: [
    "प्रश्न न्यूज",
    "प्रश्न न्युज",
    "Prashnaa News",
    "Prashnaa News Nepal",
    "Nepali News",
    "Nepal News",
    "नेपाली समाचार",
    "नेपाल समाचार",
    "ताजा समाचार",
    "अनलाइन समाचार",
  ],

  authors: [{ name: "प्रश्न न्यूज" }],
  creator: "प्रश्न न्यूज",
  publisher: "प्रश्न न्यूज",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "प्रश्न न्यूज | नेपालको डिजिटल समाचार पोर्टल",
    description:
      "नेपाल तथा विश्वका समाचार, सूचना र समसामयिक विषय पढ्नुहोस्।",
    type: "website",
    locale: "ne_NP",
    siteName: "प्रश्न न्यूज",
    images: [
      {
        url: "/icon1.png",
        width: 512,
        height: 512,
        alt: "प्रश्न न्यूज",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "प्रश्न न्यूज | नेपालको डिजिटल समाचार पोर्टल",
    description:
      "नेपाल तथा विश्वका समाचार, सूचना र समसामयिक विषय पढ्नुहोस्।",
    images: ["/icon1.png"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">

        {/* Header */}
        <div className="mb-12 text-center">
          <Image
            src="/logo1.png"
            alt="प्रश्न न्यूज"
            width={80}
            height={80}
            className="mx-auto mb-6 object-contain"
            priority
          />

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            हाम्रो बारेमा
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            प्रश्न न्यूज नेपाल तथा विश्वका समाचार र समसामयिक
            विषयहरू पाठकसम्म पुर्‍याउने एक स्वतन्त्र डिजिटल
            समाचार पोर्टल हो।
          </p>
        </div>

        {/* About */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            प्रश्न न्यूजको बारेमा
          </h2>

          <div className="space-y-5 text-[16px] leading-8 text-gray-700">
            <p>
              <strong>प्रश्न न्यूज</strong> मा हामी नेपाल र विश्वभर
              भइरहेका महत्वपूर्ण घटनाक्रमलाई नेपाली भाषामा प्रस्तुत
              गर्छौं। राजनीति, समाज, अर्थतन्त्र, खेलकुद, प्रविधि,
              मनोरञ्जन, शिक्षा लगायतका विषयमा समाचार तथा जानकारी
              प्रकाशित गर्ने हाम्रो उद्देश्य हो।
            </p>

            <p>
              अहिले समाचार प्राप्त गर्ने माध्यम धेरै परिवर्तन भएको छ।
              पाठकले मोबाइल वा कम्प्युटरबाट जुनसुकै समयमा समाचार
              पढ्न सक्ने भएकाले प्रश्न न्यूजलाई सरल र सहज डिजिटल
              समाचार प्लेटफर्मका रूपमा विकास गरिएको हो।
            </p>

            <p>
              समाचार प्रकाशित गर्दा उपलब्ध तथ्य र स्रोतलाई ध्यानमा
              राख्ने तथा पाठकलाई विषय बुझ्न सजिलो हुने गरी सामग्री
              प्रस्तुत गर्ने हाम्रो प्रयास रहन्छ।
            </p>
          </div>
        </section>

        {/* What we cover */}
        <section className="mb-10 border-t border-gray-200 pt-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            हामी के समाचार प्रकाशित गर्छौं?
          </h2>

          <p className="mb-5 leading-7 text-gray-600">
            प्रश्न न्यूजमा विभिन्न क्षेत्रसँग सम्बन्धित समाचार तथा
            जानकारीहरू प्रकाशित हुन्छन्।
          </p>

          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {[
              "राष्ट्रिय समाचार",
              "अन्तर्राष्ट्रिय समाचार",
              "राजनीति",
              "समाज",
              "अर्थतन्त्र तथा व्यापार",
              "प्रविधि",
              "खेलकुद",
              "मनोरञ्जन",
              "शिक्षा",
              "समसामयिक विषय",
            ].map((item) => (
              <div
                key={item}
                className="border-b border-gray-100 py-3 text-gray-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Editorial */}
        <section className="mb-10 border-t border-gray-200 pt-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            हाम्रो समाचार नीति
          </h2>

          <p className="text-[16px] leading-8 text-gray-700">
            समाचार सामग्री तयार गर्दा तथ्य र स्रोतको विश्वसनीयतालाई
            महत्व दिने हाम्रो प्रयास हुन्छ। कुनै समाचारमा त्रुटि
            भेटिएमा त्यसलाई सच्याउने र आवश्यक परेमा पाठकलाई स्पष्ट
            जानकारी गराउने हाम्रो नीति हो।
          </p>
        </section>

        {/* Registration */}
        <section className="mb-10 border-t border-gray-200 pt-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            संस्थागत जानकारी
          </h2>

          <p className="text-[16px] leading-8 text-gray-700">
            प्रश्न न्यूज हाल स्वतन्त्र रूपमा सञ्चालन भइरहेको डिजिटल
            समाचार पोर्टल हो। प्रश्न न्यूज हालसम्म नेपालमा औपचारिक
            रूपमा दर्ता भएको सञ्चार संस्था होइन। भविष्यमा आवश्यक
            कानुनी तथा संस्थागत प्रक्रिया पूरा गर्दै यसलाई थप
            व्यवस्थित रूपमा सञ्चालन गर्ने योजना रहेको छ।
          </p>
        </section>

        {/* Contact */}
        <section className="border-t border-gray-200 pt-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            पाठकसँगको सम्बन्ध
          </h2>

          <p className="text-[16px] leading-8 text-gray-700">
            प्रश्न न्यूजलाई अझ राम्रो बनाउन पाठकको सुझाव र प्रतिक्रिया
            महत्वपूर्ण छ। समाचारसँग सम्बन्धित सुझाव, प्रतिक्रिया वा
            आवश्यक जानकारीका लागि हामीलाई सम्पर्क गर्न सक्नुहुन्छ।
          </p>
        </section>

        {/* Bottom */}
        <div className="mt-14 border-t border-gray-200 pt-8 text-center">
          <Image
            src="/logo1.png"
            alt="प्रश्न न्यूज"
            width={48}
            height={48}
            className="mx-auto object-contain"
          />

          <p className="mt-3 text-sm text-gray-500">
            प्रश्न न्यूज
          </p>
        </div>

      </div>
    </main>
  );
}