import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "विज्ञापन | प्रश्न न्यूज",
  description:
    "प्रश्न न्यूजमा आफ्नो व्यवसाय, ब्रान्ड, उत्पादन वा सेवाको विज्ञापन गर्न सम्पर्क गर्नुहोस्।",
  keywords: [
    "प्रश्न न्यूज विज्ञापन",
    "Prashnaa News Advertising",
    "नेपाल डिजिटल विज्ञापन",
    "online advertising Nepal",
    "news website advertisement",
  ],
  alternates: {
    canonical: "/advertise",
  },
};

export default function AdvertisePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            विज्ञापन
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            आफ्नो व्यवसाय, ब्रान्ड, उत्पादन वा सेवालाई अनलाइन
            दर्शकसम्म पुर्‍याउन प्रश्न न्यूजमा विज्ञापन गर्न
            सक्नुहुन्छ।
          </p>
        </div>

        <div className="space-y-8 text-gray-700">

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              विज्ञापनका अवसरहरू
            </h2>

            <p className="leading-8">
              प्रश्न न्यूजको वेबसाइटमार्फत विभिन्न प्रकारका
              डिजिटल विज्ञापन तथा प्रचार सामग्री राख्न सकिन्छ।
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
              <li>वेबसाइट ब्यानर विज्ञापन</li>
              <li>स्पोन्सर्ड सामग्री</li>
              <li>ब्रान्ड तथा व्यवसाय प्रचार</li>
              <li>विशेष डिजिटल अभियान</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              विज्ञापनका लागि सम्पर्क
            </h2>

            <p className="leading-8">
              विज्ञापनको दर, उपलब्ध स्थान, सामग्री र अन्य
              जानकारीका लागि हामीलाई इमेलमार्फत सम्पर्क गर्नुहोस्।
            </p>

            <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-6">
              <p className="text-sm text-gray-500">
                विज्ञापन सम्बन्धी सम्पर्क
              </p>

              <a
                href="mailto:prashnaanews@gmail.com"
                className="mt-2 inline-block font-semibold text-gray-900 hover:underline"
              >
                prashnaanews@gmail.com
              </a>
            </div>
          </section>

          <section>
            <p className="leading-8 text-gray-600">
              विज्ञापन तथा प्रायोजित सामग्री प्रकाशित गर्दा
              सामग्रीको प्रकृति स्पष्ट रूपमा उल्लेख गरिनेछ।
            </p>
          </section>

        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
          प्रश्न न्यूज — डिजिटल समाचार पोर्टल
        </div>

      </div>
    </main>
  );
}