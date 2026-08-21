import Image from "next/image";

const footerLinks = [
  "हाम्रो बारेमा",
  "सम्पर्क",
  "विज्ञापन",
  "गोपनीयता नीति",
  "कुकीज",
];

export default function Footer() {
  return (
    <footer className=" ">
      <div
        className="
          mx-auto
          w-full
     
          overflow-hidden
          rounded-b-[24px]
          border-t-[5px]
          border-[var(--primary)]
          bg-[var(--surface-container-lowest)]
        "
      >
        <div
          className="
            flex
            min-h-[310px]
            items-center
            justify-between
            gap-10
            px-8
            py-12
            sm:px-10
            md:px-12
            lg:px-16
            xl:px-20
          "
        >
          {/* LEFT */}
          <div className="flex flex-col items-start">
            <Image
              src="/logo.png"
              alt="प्रश्न"
              width={105}
              height={60}
              priority
              className="h-auto w-[70px] sm:w-[85px]"
            />

            <p
              className="
                mt-8
                font-[family-name:var(--font-devanagari)]
                text-[14px]
                text-[var(--secondary)]
                sm:text-[16px]
              "
            >
              © २०२४ प्रश्न मिडिया प्रा. लि. सर्वाधिकार सुरक्षित
            </p>
          </div>

          {/* RIGHT LINKS */}
          <nav
            className="
              flex
              flex-wrap
              items-center
              justify-end
              gap-x-8
              gap-y-4
              font-[family-name:var(--font-devanagari)]
              text-[15px]
              text-[var(--secondary)]
              sm:gap-x-10
              sm:text-[17px]
              lg:gap-x-12
            "
          >
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="
                  whitespace-nowrap
                  transition-colors
                  hover:text-[var(--primary)]
                "
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}