import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "विज्ञापन | Prasna News",
  description:
    "Prasna News मा आफ्नो व्यवसाय, ब्रान्ड, उत्पादन वा सेवाको विज्ञापन गर्नुहोस् र आफ्नो सन्देश बढी पाठकसम्म पुर्‍याउनुहोस्।",
  keywords: [
    "Prasna News विज्ञापन",
    "नेपाल डिजिटल विज्ञापन",
    "online advertising Nepal",
    "news website advertisement",
  ],
  alternates: { canonical: "/advertise" },
};
export default function AdvertisePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {" "}
      <h1 className="text-3xl font-bold mb-6">विज्ञापन</h1>{" "}
      <div className="space-y-5 text-gray-700 leading-8">
        {" "}
        <p>
          {" "}
          आफ्नो व्यवसाय, ब्रान्ड, उत्पादन वा सेवालाई बढी दर्शकसम्म पुर्‍याउन
          Prasna News सँग विज्ञापनको अवसर लिनुहोस्।{" "}
        </p>
        <p>
          {" "}
          हाम्रो डिजिटल प्लेटफर्ममार्फत तपाईंले आफ्नो व्यवसाय तथा सेवाको प्रचार
          प्रभावकारी रूपमा गर्न सक्नुहुन्छ।{" "}
        </p>{" "}
        <h2 className="text-2xl font-bold text-gray-900">
          {" "}
          विज्ञापनका अवसरहरू{" "}
        </h2>{" "}
        <ul className="list-disc pl-6 space-y-2">
          {" "}
          <li>वेबसाइट ब्यानर विज्ञापन</li> <li>स्पोन्सर्ड सामग्री</li>{" "}
          <li>ब्रान्ड प्रमोशन</li> <li>विशेष अभियान तथा डिजिटल प्रचार</li>{" "}
        </ul>{" "}
        <p>
          {" "}
          विज्ञापन दर, उपलब्ध स्थान तथा अन्य जानकारीका लागि हामीसँग सम्पर्क
          गर्नुहोस्।{" "}
        </p>{" "}
        <div className="bg-gray-100 p-6 rounded-lg">
          {" "}
          <p>
            {" "}
            <strong>विज्ञापनका लागि सम्पर्क:</strong>{" "}
          </p>{" "}
          <p>इमेल: advertise@prasananews.com</p>{" "}
        </div>
      </div>{" "}
    </main>
  );
}
