"use client";

import { useState } from "react";
import {
  Share2,
  Link as LinkIcon,
  Check,
} from "lucide-react";

import {
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
  FaFacebookMessenger,
} from "react-icons/fa";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export default function ShareButtons({
  title,
  url,
}: ShareButtonsProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // ============================================================
  // NATIVE SHARE
  // ============================================================

  const nativeShare = async () => {
    if (!navigator.share) {
      setOpen((prev) => !prev);
      return;
    }

    try {
      setSharing(true);

      await navigator.share({
        title,
        text: title,
        url,
      });
    } catch (error: any) {
      // User closing/canceling the native share dialog
      // is not an actual error.
      if (error?.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    } finally {
      setSharing(false);
    }
  };

  // ============================================================
  // SHARE TO SOCIAL PLATFORM
  // ============================================================

  const shareTo = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl =
          `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;

      case "facebook":
        shareUrl =
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;

      case "messenger":
        /*
         * Messenger does not support a simple public share URL
         * without Facebook App configuration.
         *
         * Instead, open Facebook's share page.
         * Users can then choose Messenger where available.
         */
        shareUrl =
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;

      case "linkedin":
        shareUrl =
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;

      default:
        return;
    }

    window.open(
      shareUrl,
      "_blank",
      "width=600,height=600,resizable=yes,scrollbars=yes"
    );

    setOpen(false);
  };

  // ============================================================
  // COPY LINK
  // ============================================================

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);

      // Fallback for older browsers
      try {
        const textarea = document.createElement("textarea");

        textarea.value = url;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (fallbackError) {
        console.error(
          "Fallback copy failed:",
          fallbackError
        );
      }
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ======================================================
          SHARE BUTTON
      ======================================================= */}

      <button
        type="button"
        onClick={nativeShare}
        disabled={sharing}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-[var(--outline-variant)]
          bg-[var(--surface-container-lowest)]
          text-[var(--secondary)]
          transition
          hover:border-[var(--primary)]
          hover:bg-[var(--primary)]
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
        aria-label="साझा गर्नुहोस्"
        title="साझा गर्नुहोस्"
      >
        <Share2
          size={18}
          strokeWidth={1.7}
        />
      </button>

      {/* ======================================================
          SHARE MENU
      ======================================================= */}

      {open && (
        <div
          className="
            absolute
            right-0
            top-11
            z-[100]
            w-[220px]
            overflow-hidden
            rounded-lg
            border
            border-[var(--outline-variant)]
            bg-[var(--surface-container-lowest)]
            p-2
            shadow-xl
          "
        >
          {/* ==================================================
              WHATSAPP
          =================================================== */}

          <button
            type="button"
            onClick={() => shareTo("whatsapp")}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-md
              px-3
              py-2.5
              text-left
              text-sm
              text-[var(--on-surface)]
              transition
              hover:bg-[var(--surface-container)]
            "
          >
            <FaWhatsapp
              size={19}
              className="text-[#25D366]"
            />

            <span>WhatsApp</span>
          </button>

          {/* ==================================================
              FACEBOOK
          =================================================== */}

          <button
            type="button"
            onClick={() => shareTo("facebook")}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-md
              px-3
              py-2.5
              text-left
              text-sm
              text-[var(--on-surface)]
              transition
              hover:bg-[var(--surface-container)]
            "
          >
            <FaFacebookF
              size={18}
              className="text-[#1877F2]"
            />

            <span>Facebook</span>
          </button>

          {/* ==================================================
              MESSENGER
          =================================================== */}

          <button
            type="button"
            onClick={() => shareTo("messenger")}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-md
              px-3
              py-2.5
              text-left
              text-sm
              text-[var(--on-surface)]
              transition
              hover:bg-[var(--surface-container)]
            "
          >
            <FaFacebookMessenger
              size={19}
              className="text-[#0084FF]"
            />

            <span>Messenger</span>
          </button>

          {/* ==================================================
              LINKEDIN
          =================================================== */}

          <button
            type="button"
            onClick={() => shareTo("linkedin")}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-md
              px-3
              py-2.5
              text-left
              text-sm
              text-[var(--on-surface)]
              transition
              hover:bg-[var(--surface-container)]
            "
          >
            <FaLinkedinIn
              size={19}
              className="text-[#0A66C2]"
            />

            <span>LinkedIn</span>
          </button>

          {/* ==================================================
              DIVIDER
          =================================================== */}

          <div
            className="
              my-1
              border-t
              border-[var(--outline-variant)]
            "
          />

          {/* ==================================================
              COPY LINK
          =================================================== */}

          <button
            type="button"
            onClick={copyLink}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-md
              px-3
              py-2.5
              text-left
              text-sm
              text-[var(--on-surface)]
              transition
              hover:bg-[var(--surface-container)]
            "
          >
            {copied ? (
              <Check
                size={18}
                className="text-green-600"
              />
            ) : (
              <LinkIcon size={18} />
            )}

            <span>
              {copied
                ? "Link copied!"
                : "Copy link"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}