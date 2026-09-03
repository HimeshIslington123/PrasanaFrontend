import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    label: "हाम्रो बारेमा",
    href: "/aboutus",
  },
  {
    label: "सम्पर्क",
    href: "/contact",
  },
  {
    label: "विज्ञापन",
    href: "/Advertise",
  },
  {
    label: "गोपनीयता नीति",
    href: "/privacy",
  },
  {
    label: "कुकीज",
    href: "/cookie",
  },
];

export default function Footer() {
  return (
    <footer>
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
            <Link href="/" aria-label="प्रश्न गृहपृष्ठ">
              <Image
                src="/logo1.png"
                alt="प्रश्न"
                width={105}
                height={60}
                priority
                className="h-auto w-[70px] sm:w-[85px]"
              />
            </Link>

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
            aria-label="Footer navigation"
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
              <Link
                key={link.href}
                href={link.href}
                className="
                  whitespace-nowrap
                  transition-colors
                  hover:text-[var(--primary)]
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}