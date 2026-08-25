import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "कुकीज नीति | Prasna News",
  description:
    "Prasna News वेबसाइटले कुकीज कसरी प्रयोग गर्छ भन्ने जानकारी। हाम्रो कुकीज नीति र प्रयोगकर्ता अनुभव सम्बन्धी विवरण।",
  keywords: ["Prasna News Cookies", "कुकीज नीति", "Cookies Policy Nepal"],
  alternates: { canonical: "/cookies" },
};
export default function CookiesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {" "}
      <h1 className="text-3xl font-bold mb-6">कुकीज नीति</h1>{" "}
      <div className="space-y-6 text-gray-700 leading-8">
        {" "}
        <p>
          {" "}
          Prasna News ले प्रयोगकर्ता अनुभव सुधार गर्न तथा वेबसाइटलाई प्रभावकारी
          रूपमा सञ्चालन गर्न कुकीज प्रयोग गर्न सक्छ।{" "}
        </p>{" "}
        <h2 className="text-2xl font-bold text-gray-900">
          {" "}
          कुकीज भनेको के हो?{" "}
        </h2>{" "}
        <p>
          {" "}
          कुकीज साना टेक्स्ट फाइलहरू हुन् जुन तपाईंले वेबसाइट भ्रमण गर्दा
          तपाईंको ब्राउजरमा सुरक्षित हुन सक्छन्।{" "}
        </p>{" "}
        <h2 className="text-2xl font-bold text-gray-900">
          {" "}
          हामी कुकीज किन प्रयोग गर्छौं?{" "}
        </h2>{" "}
        <ul className="list-disc pl-6 space-y-2">
          {" "}
          <li>वेबसाइटको कार्यक्षमता सुधार गर्न</li>{" "}
          <li>प्रयोगकर्ता अनुभव सुधार गर्न</li>{" "}
          <li>वेबसाइटको प्रयोग सम्बन्धी जानकारी बुझ्न</li>{" "}
          <li>आवश्यक सुरक्षा तथा प्राविधिक सेवाहरू सञ्चालन गर्न</li>{" "}
        </ul>{" "}
        <h2 className="text-2xl font-bold text-gray-900"> कुकीज नियन्त्रण </h2>{" "}
        <p>
          {" "}
          तपाईं आफ्नो ब्राउजरको सेटिङमार्फत कुकीज नियन्त्रण वा हटाउन सक्नुहुन्छ।
          तर केही कुकीज निष्क्रिय गर्दा वेबसाइटका केही सुविधाहरू प्रभावित हुन
          सक्छन्।{" "}
        </p>{" "}
        <h2 className="text-2xl font-bold text-gray-900">
          {" "}
          नीतिमा परिवर्तन{" "}
        </h2>{" "}
        <p>
          {" "}
          हामी आवश्यक परेमा यो कुकीज नीति परिवर्तन वा अद्यावधिक गर्न सक्छौं।
          परिवर्तन भएपछि यस पृष्ठमा नयाँ जानकारी प्रकाशित गरिनेछ।{" "}
        </p>{" "}
      </div>{" "}
    </main>
  );
}
