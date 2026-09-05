"use client";

import { useEffect, useRef, useState } from "react";
import ShareButtons from "./ShareButtons";

// ============================================================
// TYPES
// ============================================================

type BlogCounterProps = {
  blogId: number;
  title: string;
  url: string;
  initialViewCount: number;
  initialShareCount: number;
};

// ============================================================
// API
// ============================================================

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL;

// ============================================================
// COMPONENT
// ============================================================

export default function BlogCounter({
  blogId,
  title,
  url,
  initialViewCount,
  initialShareCount,
}: BlogCounterProps) {
  // ==========================================================
  // STATE
  // ==========================================================

  const [viewCount, setViewCount] =
    useState(initialViewCount);

  const [shareCount, setShareCount] =
    useState(initialShareCount);

  // ==========================================================
  // PREVENT DUPLICATE VIEW REQUEST
  // ==========================================================

  const viewRequestSent =
    useRef(false);

  // ==========================================================
  // ADD VIEW COUNT
  // ==========================================================

  useEffect(() => {
    if (viewRequestSent.current) {
      return;
    }

    viewRequestSent.current = true;

    const addView = async () => {
      if (!API_BASE) {
        console.error(
          "NEXT_PUBLIC_API_URL is not configured"
        );

        return;
      }

      try {
        const response =
          await fetch(
            `${API_BASE}/Blog/${blogId}/view`,
            {
              method: "POST",
            }
          );

        if (!response.ok) {
          console.error(
            "Failed to add blog view count"
          );

          return;
        }

        /*
         * Backend successfully increased
         * the database view count.
         *
         * Increase the visible UI count too.
         */
        setViewCount(
          (previous) =>
            previous + 1
        );
      } catch (error) {
        console.error(
          "Failed to add blog view:",
          error
        );
      }
    };

    addView();
  }, [blogId]);

  // ==========================================================
  // ADD SHARE COUNT
  // ==========================================================

  const handleShare =
    async () => {
      if (!API_BASE) {
        console.error(
          "NEXT_PUBLIC_API_URL is not configured"
        );

        return;
      }

      try {
        const response =
          await fetch(
            `${API_BASE}/Blog/${blogId}/share`,
            {
              method: "POST",
            }
          );

        if (!response.ok) {
          console.error(
            "Failed to add blog share count"
          );

          return;
        }

        /*
         * Backend successfully increased
         * the database share count.
         *
         * Increase the visible UI count.
         */
        setShareCount(
          (previous) =>
            previous + 1
        );
      } catch (error) {
        console.error(
          "Failed to add blog share:",
          error
        );
      }
    };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-x-5
        gap-y-2
      "
    >
      {/* ======================================================
          VIEW COUNT
      ======================================================= */}

      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          text-gray-500
        "
      >
        <span>
          {viewCount}
        </span>

        <span>
          views
        </span>
      </div>

      {/* ======================================================
          SHARE BUTTON
      ======================================================= */}

      <ShareButtons
        title={title}
        url={url}
        shareCount={shareCount}
        onShare={handleShare}
      />
    </div>
  );
}