"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function AdPopup() {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!showAd) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4">

      {/* Ad container */}
      <div className="relative max-h-[80vh] max-w-[700px]">

        {/* Close button */}
        <button
          onClick={() => setShowAd(false)}
          className="absolute right-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
          aria-label="Close advertisement"
        >
          <X size={24} />
        </button>

        {/* Advertisement */}
        <Image
          src="/ad3.png"
          alt="Advertisement"
          width={1200}
          height={800}
          
          priority
          className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
        />

      </div>
    </div>
  );
}