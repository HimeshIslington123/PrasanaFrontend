
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "सम्पर्क | Prasna News",
  description:
    "Prasna News सँग सम्पर्क गर्नुहोस्। सुझाव, प्रतिक्रिया, समाचार सम्बन्धी जानकारी तथा अन्य विषयका लागि हामीलाई सम्पर्क गर्न सक्नुहुन्छ।",
  keywords: [
    "Prasna News सम्पर्क",
    "Contact Prasna News",
    "सम्पर्क",
    "नेपाली समाचार",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">सम्पर्क</h1>

      <div className="space-y-5 text-gray-700 leading-8">
        <p>
          तपाईंको सुझाव, प्रतिक्रिया तथा समाचार सम्बन्धी जानकारी हाम्रो लागि
          महत्वपूर्ण छ।
        </p>

        <p>
          Prasna News सम्बन्धी कुनै पनि प्रश्न, सुझाव वा जानकारीका लागि हामीसँग
          सम्पर्क गर्न सक्नुहुन्छ।
        </p>

        <div className="bg-gray-100 p-6 rounded-lg space-y-3">
          <p>
            <strong>समाचार संस्था:</strong> Prasna News
          </p>

          <p>
            <strong>इमेल:</strong> info@prasananews.com
          </p>

          <p>
            <strong>विषय:</strong> सुझाव, प्रतिक्रिया तथा समाचार सम्बन्धी जानकारी
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          प्रतिक्रिया पठाउनुहोस्
        </h2>

        <p>
          यदि तपाईंले हाम्रो वेबसाइटमा कुनै त्रुटि, गलत जानकारी वा सुधार गर्नुपर्ने
          विषय देख्नुभएको छ भने कृपया हामीलाई जानकारी दिनुहोस्।
        </p>

        <p>
          हामी तपाईंको प्रतिक्रिया र सुझावलाई सम्मान गर्दछौं र आवश्यक सुधारका
          लागि प्रयास गर्नेछौं।
        </p>
      </div>
    </main>
  );
}