import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "सम्पर्क | प्रश्न न्यूज",
  description:
    "प्रश्न न्यूजसँग सम्पर्क गर्नुहोस्। सुझाव, प्रतिक्रिया, समाचार सम्बन्धी जानकारी तथा अन्य विषयका लागि हामीलाई सम्पर्क गर्न सक्नुहुन्छ।",
  keywords: [
    "प्रश्न न्यूज सम्पर्क",
    "Prashnaa News Contact",
    "सम्पर्क",
    "नेपाली समाचार",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            सम्पर्क
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            प्रश्न न्यूजसँग सम्पर्क गर्नुभएकोमा धन्यवाद। तपाईंको
            सुझाव, प्रतिक्रिया र समाचार सम्बन्धी जानकारी हाम्रा लागि
            महत्वपूर्ण छन्।
          </p>
        </div>

        <div className="space-y-8 text-gray-700">

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              हामीलाई सम्पर्क गर्नुहोस्
            </h2>

            <p className="leading-8">
              प्रश्न न्यूज सम्बन्धी कुनै प्रश्न, सुझाव, प्रतिक्रिया
              वा समाचार सम्बन्धी जानकारीका लागि तल दिइएको इमेलमा
              हामीलाई सम्पर्क गर्न सक्नुहुन्छ।
            </p>
          </section>

          <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">
                  समाचार संस्था
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  प्रश्न न्यूज
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  इमेल
                </p>
                <a
                  href="mailto:prashnaanews@gmail.com"
                  className="mt-1 inline-block font-semibold text-gray-900 hover:underline"
                >
                  prashnaanews@gmail.com
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  सम्पर्कको विषय
                </p>
                <p className="mt-1 text-gray-800">
                  सुझाव, प्रतिक्रिया, समाचार तथा अन्य जानकारी
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              समाचार सम्बन्धी जानकारी
            </h2>

            <p className="leading-8">
              यदि तपाईंसँग कुनै समाचार, सूचना वा महत्वपूर्ण घटनासँग
              सम्बन्धित जानकारी छ भने हामीलाई इमेलमार्फत पठाउन
              सक्नुहुन्छ। आवश्यक विवरण र उपलब्ध स्रोतसहित जानकारी
              पठाउँदा हामीलाई विषय बुझ्न सहज हुन्छ।
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              सुधार तथा प्रतिक्रिया
            </h2>

            <p className="leading-8">
              वेबसाइटमा कुनै त्रुटि, गलत जानकारी वा सुधार गर्नुपर्ने
              विषय भेटिएमा कृपया हामीलाई जानकारी दिनुहोस्। प्राप्त
              प्रतिक्रियालाई आवश्यकताअनुसार समीक्षा गरी सुधार गर्ने
              प्रयास गरिनेछ।
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