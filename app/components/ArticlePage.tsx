"use client";

import Image from "next/image";
import {
  Bookmark,
  ChevronRight,
  Eye,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import ShareButtons from "./ShareButtons";

// ============================================================
// TYPES
// ============================================================

type ArticleComment = {
  newsId: number;
  content: string;
};

type ArticlePageProps = {
  id: number;

  title: string;

  category?: string;

  authorName?: string;

  authorRole?: string;

  publishedAt?: string;

  authorImageSrc?: string;

  heroImageSrc?: string;

  heroImageAlt?: string;

  caption?: string | null;

  paragraphs?: string[];

  pullQuote?: string | null;

  comments?: ArticleComment[];

  initialViewCount?: number;

  initialShareCount?: number;
};

// ============================================================
// COMPONENT
// ============================================================

export default function ArticlePage({
  id,

  title,

  category = "प्रविधि",

  authorName = "प्रश्न समाचार ब्युरो",

  authorRole = "",

  publishedAt = "",

  authorImageSrc = "",

  heroImageSrc,

  heroImageAlt = "",

  caption = null,

  paragraphs = [],

  pullQuote = null,

  comments: initialComments = [],

  initialViewCount = 0,

  initialShareCount = 0,
}: ArticlePageProps) {
  // ==========================================================
  // STATES
  // ==========================================================

  const [isBookmarked, setIsBookmarked] =
    useState(false);

  const [comment, setComment] =
    useState("");

  const [comments, setComments] =
    useState<ArticleComment[]>(
      initialComments
    );

  const [viewCount, setViewCount] =
    useState(initialViewCount);

  const [shareCount, setShareCount] =
    useState(initialShareCount);

  const [articleUrl, setArticleUrl] =
    useState("");

  // ==========================================================
  // REFS
  // ==========================================================

  /*
   * Prevent duplicate view-count requests
   * during React Strict Mode development.
   */
  const viewCountAdded =
    useRef(false);

  /*
   * Prevent multiple share-count requests
   * from very fast clicks.
   */
  const shareCountAdding =
    useRef(false);

  // ==========================================================
  // ROUTER
  // ==========================================================

  const router = useRouter();

  // ==========================================================
  // API BASE
  // ==========================================================

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL;

  // ==========================================================
  // ARTICLE URL
  // ==========================================================

  useEffect(() => {
    /*
     * window is only available in the browser.
     */
    setArticleUrl(
      window.location.href
    );
  }, []);

  // ==========================================================
  // UPDATE COMMENTS
  // ==========================================================

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  // ==========================================================
  // ADD VIEW COUNT
  // ==========================================================

  useEffect(() => {
    if (!API_BASE) {
      console.error(
        "NEXT_PUBLIC_API_URL is not configured"
      );

      return;
    }

    /*
     * React Strict Mode may run this effect twice
     * in development.
     *
     * This prevents duplicate requests during
     * the same component mount.
     */
    if (viewCountAdded.current) {
      return;
    }

    viewCountAdded.current = true;

    const addView = async () => {
      try {
        const response =
          await axios.post(
            `${API_BASE}/News/AddViewCount/${id}`
          );

        /*
         * Case 1:
         *
         * Backend returns:
         *
         * 71
         */
        if (
          typeof response.data ===
          "number"
        ) {
          setViewCount(
            response.data
          );

          return;
        }

        /*
         * Case 2:
         *
         * Backend returns:
         *
         * {
         *   viewCount: 71
         * }
         */
        if (
          response.data?.viewCount !==
          undefined
        ) {
          setViewCount(
            Number(
              response.data.viewCount
            )
          );

          return;
        }

        /*
         * Case 3:
         *
         * Backend doesn't return
         * updated count.
         */
        setViewCount(
          (previous) =>
            previous + 1
        );
      } catch (error) {
        console.error(
          "Failed to add view count:",
          error
        );
      }
    };

    addView();
  }, [id, API_BASE]);

  // ==========================================================
  // ADD SHARE COUNT
  // ==========================================================

  const handleShareCount =
    async () => {
      if (!API_BASE) {
        console.error(
          "NEXT_PUBLIC_API_URL is not configured"
        );

        return;
      }

      /*
       * Prevent duplicate requests
       * from very fast clicks.
       */
      if (
        shareCountAdding.current
      ) {
        return;
      }

      shareCountAdding.current =
        true;

      try {
        const response =
          await axios.post(
            `${API_BASE}/News/AddShareCount/${id}`
          );

        /*
         * Case 1:
         *
         * Backend returns:
         *
         * 10
         */
        if (
          typeof response.data ===
          "number"
        ) {
          setShareCount(
            response.data
          );

          return;
        }

        /*
         * Case 2:
         *
         * Backend returns:
         *
         * {
         *   shareCount: 10
         * }
         */
        if (
          response.data?.shareCount !==
          undefined
        ) {
          setShareCount(
            Number(
              response.data.shareCount
            )
          );

          return;
        }

        /*
         * Case 3:
         *
         * Backend doesn't return
         * updated count.
         */
        setShareCount(
          (previous) =>
            previous + 1
        );
      } catch (error) {
        console.error(
          "Failed to add share count:",
          error
        );
      } finally {
        shareCountAdding.current =
          false;
      }
    };

  // ==========================================================
  // FORMAT PUBLISHED DATE
  // ==========================================================

  /*
   * IMPORTANT:
   *
   * Do NOT use "ne-NP" here.
   *
   * Browser and server can produce different
   * localized output with different environments.
   *
   * We use "en-US" explicitly so the output
   * is deterministic on both server and client.
   *
   * The timezone is fixed to Nepal.
   *
   * Example:
   *
   * API:
   * 2026-09-05T04:53:41.384731Z
   *
   * Output:
   * September 5, 2026 at 10:38 AM
   */
  const formatPublishedDate = (
    dateString: string
  ) => {
    if (!dateString) {
      return "";
    }

    const date =
      new Date(dateString);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return dateString;
    }

    const parts =
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone:
            "Asia/Kathmandu",

          year: "numeric",

          month: "long",

          day: "numeric",

          hour: "numeric",

          minute: "2-digit",

          hour12: true,
        }
      ).formatToParts(date);

    const getPart = (
      type: Intl.DateTimeFormatPartTypes
    ) => {
      return (
        parts.find(
          (part) =>
            part.type === type
        )?.value ?? ""
      );
    };

    const month =
      getPart("month");

    const day =
      getPart("day");

    const year =
      getPart("year");

    const hour =
      getPart("hour");

    const minute =
      getPart("minute");

    const dayPeriod =
      getPart("dayPeriod");

    return `${month} ${day}, ${year} at ${hour}:${minute} ${dayPeriod}`;
  };

  // ==========================================================
  // ADD COMMENT
  // ==========================================================

  const handleComment =
    async () => {
      if (!comment.trim()) {
        return;
      }

      if (!API_BASE) {
        console.error(
          "NEXT_PUBLIC_API_URL is not configured"
        );

        return;
      }

      try {
        const response =
          await axios.post(
            `${API_BASE}/api/Comment`,
            {
              Content:
                comment.trim(),

              NewsId: id,
            },
            {
              headers: {
                "Content-Type":
                  "application/json",
              },

              withCredentials: true,
            }
          );

        setComments(
          (previousComments) => [
            ...previousComments,
            response.data,
          ]
        );

        setComment("");
      } catch (error: any) {
        if (
          error.response?.status ===
          401
        ) {
          router.push("/Login");

          return;
        }

        console.error(
          "Failed to add comment:",
          error
        );
      }
    };

  // ==========================================================
  // BOOKMARK
  // ==========================================================

  const handleBookmark =
    async () => {
      if (!API_BASE) {
        console.error(
          "NEXT_PUBLIC_API_URL is not configured"
        );

        return;
      }

      try {
        /*
         * ADD BOOKMARK
         */
        if (!isBookmarked) {
          await axios.post(
            `${API_BASE}/bookmark`,
            id,
            {
              headers: {
                "Content-Type":
                  "application/json",
              },

              withCredentials: true,
            }
          );

          setIsBookmarked(true);
        }

        /*
         * REMOVE BOOKMARK
         */
        else {
          await axios.delete(
            `${API_BASE}/bookmark`,
            {
              data: id,

              headers: {
                "Content-Type":
                  "application/json",
              },

              withCredentials: true,
            }
          );

          setIsBookmarked(false);
        }
      } catch (error: any) {
        if (
          error.response?.status ===
          401
        ) {
          router.push("/login");

          return;
        }

        console.error(
          "Bookmark error:",
          error
        );
      }
    };

  // ==========================================================
  // CHECK BOOKMARK
  // ==========================================================

  useEffect(() => {
    if (!API_BASE) {
      return;
    }

    const checkBookmark =
      async () => {
        try {
          const response =
            await axios.get(
              `${API_BASE}/bookmark/${id}`,
              {
                withCredentials: true,
              }
            );

          setIsBookmarked(
            Boolean(response.data)
          );
        } catch (error: any) {
          /*
           * 401 simply means the user
           * isn't logged in.
           */
          if (
            error.response?.status !==
            401
          ) {
            console.error(
              "Failed to check bookmark:",
              error
            );
          }
        }
      };

    checkBookmark();
  }, [id, API_BASE]);

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <main className="min-h-screen bg-[var(--background)]">

      {/* ======================================================
          MAIN CONTAINER
      ======================================================= */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* ====================================================
            GRID
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-8
            lg:grid-cols-[minmax(0,2fr)_320px]
            lg:gap-10
          "
        >

          {/* ==================================================
              ARTICLE
          =================================================== */}

          <article
            className="
              min-w-0
              bg-[var(--surface-container-lowest)]
              px-5
              py-7
              text-[var(--on-surface)]
              sm:px-8
              sm:py-8
              lg:px-10
              lg:py-10
            "
          >

            {/* ==================================================
                BREADCRUMB
            =================================================== */}

            <nav
              aria-label="Breadcrumb"
              className="
                mb-6
                flex
                items-center
                font-[family-name:var(--font-devanagari)]
                text-[12px]
                leading-[16px]
              "
            >

              <Link
                href="/"
                className="
                  text-[var(--secondary)]
                  transition-colors
                  hover:text-[var(--primary)]
                "
              >
                गृहपृष्ठ
              </Link>

              <ChevronRight
                size={14}
                strokeWidth={1.5}
                className="
                  mx-1
                  text-[var(--secondary)]
                "
              />

              <span
                className="
                  text-[var(--on-surface)]
                "
              >
                {category}
              </span>

            </nav>

            {/* ==================================================
                HEADER
            =================================================== */}

            <header className="max-w-[900px]">

              {category && (
                <div className="mb-3">

                  <span
                    className="
                      font-[family-name:var(--font-devanagari)]
                      text-[12px]
                      font-bold
                      uppercase
                      tracking-[0.05em]
                      text-[var(--primary)]
                    "
                  >
                    {category}
                  </span>

                </div>
              )}

              <h1
                className="
                  max-w-[900px]
                  font-[family-name:var(--font-devanagari)]
                  text-[32px]
                  font-extrabold
                  leading-[1.2]
                  tracking-[-0.02em]
                  text-[var(--on-surface)]
                  sm:text-[40px]
                  sm:leading-[1.25]
                  lg:text-[48px]
                  lg:leading-[56px]
                "
              >
                {title}
              </h1>

            </header>

            {/* ==================================================
                BYLINE + COUNTERS
            =================================================== */}

            <div
              className="
                mt-7
                flex
                items-center
                justify-between
                gap-4
                border-y
                border-[var(--outline-variant)]
                py-4
              "
            >

              {/* ==================================================
                  AUTHOR
              =================================================== */}

              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                "
              >

                {authorImageSrc ? (
                  <div
                    className="
                      relative
                      h-10
                      w-10
                      shrink-0
                      overflow-hidden
                      rounded-full
                    "
                  >

                    <Image
                      src={
                        authorImageSrc
                      }
                      alt={
                        authorName
                      }
                      fill
                      sizes="40px"
                      className="
                        object-contain
                        object-top
                      "
                    />

                  </div>
                ) : (
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      bg-[var(--surface-container-high)]
                      font-[family-name:var(--font-devanagari)]
                      text-sm
                      font-bold
                      text-[var(--primary)]
                    "
                  >
                    {authorName?.charAt(
                      0
                    )}
                  </div>
                )}

                <div
                  className="
                    min-w-0
                    leading-tight
                  "
                >

                  {/* AUTHOR NAME */}

                  <p
                    className="
                      truncate
                      font-[family-name:var(--font-devanagari)]
                      text-[13px]
                      font-bold
                      text-[var(--primary)]
                    "
                  >
                    {authorName}
                  </p>

                  {/* AUTHOR ROLE */}

                  {authorRole && (
                    <p
                      className="
                        mt-0.5
                        font-[family-name:var(--font-devanagari)]
                        text-[11px]
                        text-[var(--secondary)]
                      "
                    >
                      {authorRole}
                    </p>
                  )}

                  {/* PUBLISHED DATE */}

                  {publishedAt && (
                    <p
                      className="
                        mt-0.5
                        font-[family-name:var(--font-devanagari)]
                        text-[11px]
                        text-[var(--secondary)]
                      "
                    >
                      {formatPublishedDate(
                        publishedAt
                      )}
                    </p>
                  )}

                </div>

              </div>

              {/* ==================================================
                  VIEWS + SHARE + BOOKMARK
              =================================================== */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-1
                "
              >

                {/* ==================================================
                    VIEW COUNT
                =================================================== */}

                <div
                  className="
                    flex
                    h-9
                    items-center
                    gap-1.5
                    px-2
                    font-[family-name:var(--font-devanagari)]
                    text-[12px]
                    text-[var(--secondary)]
                  "
                  title={`${viewCount} views`}
                  aria-label={`${viewCount} views`}
                >

                  <Eye
                    size={18}
                    strokeWidth={1.6}
                  />

                  <span>
                    {viewCount}
                  </span>

                </div>

                {/* ==================================================
                    SHARE BUTTON
                =================================================== */}

                {articleUrl && (
                  <ShareButtons
                    title={title}
                    url={articleUrl}
                    onShare={
                      handleShareCount
                    }
                    shareCount={
                      shareCount
                    }
                  />
                )}

                {/* ==================================================
                    BOOKMARK
                =================================================== */}

                <button
                  type="button"
                  aria-label="सुरक्षित राख्नुहोस्"
                  title="सुरक्षित राख्नुहोस्"
                  onClick={
                    handleBookmark
                  }
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    transition-colors
                    hover:bg-[var(--surface-container)]
                  "
                >

                  <Bookmark
                    size={19}
                    strokeWidth={1.6}
                    className={
                      isBookmarked
                        ? "fill-red-500 text-red-500"
                        : "text-[var(--secondary)] hover:text-[var(--primary)]"
                    }
                  />

                </button>

              </div>

            </div>

            {/* ==================================================
                CONTENT
            =================================================== */}

            <div className="mt-7 max-w-[900px]">

              {/* ==================================================
                  HERO IMAGE
              =================================================== */}

              {heroImageSrc && (
                <figure>

                  <div
                    className="
                      relative
                      aspect-[16/10]
                      w-full
                      overflow-hidden
                      bg-[var(--surface-container)]
                    "
                  >

                    <Image
                      src={
                        heroImageSrc
                      }
                      alt={
                        heroImageAlt ||
                        title
                      }
                      fill
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1280px) 65vw,
                        850px
                      "
                      className="object-cover"
                      priority
                    />

                  </div>

                  {/* ==================================================
                      CAPTION
                  =================================================== */}

                  {caption && (
                    <figcaption
                      className="
                        mt-2
                        flex
                        items-start
                        border-t
                        border-[var(--outline-variant)]
                        pt-2
                        font-[family-name:var(--font-devanagari)]
                        text-[12px]
                        leading-[18px]
                        text-[var(--secondary)]
                      "
                    >

                      <span
                        className="
                          mr-2
                          mt-0.5
                          block
                          h-4
                          w-[2px]
                          shrink-0
                          bg-[var(--primary)]
                        "
                      />

                      <span>
                        {caption}
                      </span>

                    </figcaption>
                  )}

                </figure>
              )}

              {/* ==================================================
                  ARTICLE BODY
              =================================================== */}

              <div
                className="
                  mt-7
                  font-[family-name:var(--font-devanagari)]
                  text-[17px]
                  font-normal
                  leading-[1.9]
                  text-[var(--on-surface)]
                  sm:text-[18px]
                  sm:leading-[1.9]
                "
              >

                {paragraphs.map(
                  (
                    paragraph,
                    index
                  ) => (
                    <p
                      key={index}
                      className="mb-7 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  )
                )}

                {/* ==================================================
                    PULL QUOTE
                =================================================== */}

                {pullQuote && (
                  <blockquote
                    className="
                      my-9
                      border-l-[3px]
                      border-[var(--primary)]
                      py-1
                      pl-5
                      sm:pl-6
                    "
                  >

                    <p
                      className="
                        font-[family-name:var(--font-devanagari)]
                        text-[20px]
                        font-bold
                        italic
                        leading-[1.55]
                        text-[var(--on-surface-variant)]
                        sm:text-[22px]
                        sm:leading-[1.55]
                      "
                    >
                      “{pullQuote}”
                    </p>

                  </blockquote>
                )}

              </div>

            </div>

            {/* ==================================================
                COMMENTS
            =================================================== */}

            <section
              className="
                mt-12
                max-w-[900px]
                border-t
                border-[var(--outline-variant)]
                pt-8
              "
            >

              <h2
                className="
                  mb-6
                  font-[family-name:var(--font-devanagari)]
                  text-[24px]
                  font-bold
                  text-[var(--on-surface)]
                "
              >
                टिप्पणी गर्नुहोस्
              </h2>

              {/* ==================================================
                  COMMENT INPUT
              =================================================== */}

              <div className="mb-8">

                <textarea
                  value={comment}
                  onChange={(e) =>
                    setComment(
                      e.target.value
                    )
                  }
                  placeholder="आफ्नो टिप्पणी लेख्नुहोस्..."
                  rows={4}
                  className="
                    w-full
                    resize-none
                    border
                    border-[var(--outline-variant)]
                    bg-[var(--surface-container-lowest)]
                    p-4
                    font-[family-name:var(--font-devanagari)]
                    text-[15px]
                    text-[var(--on-surface)]
                    outline-none
                    transition
                    focus:border-[var(--primary)]
                  "
                />

                <div
                  className="
                    mt-3
                    flex
                    justify-end
                  "
                >

                  <button
                    type="button"
                    onClick={
                      handleComment
                    }
                    className="
                      bg-[var(--primary)]
                      px-6
                      py-2.5
                      font-[family-name:var(--font-devanagari)]
                      text-sm
                      font-bold
                      text-white
                      transition
                      hover:opacity-90
                    "
                  >
                    टिप्पणी पठाउनुहोस्
                  </button>

                </div>

              </div>

              {/* ==================================================
                  COMMENTS LIST
              =================================================== */}

              <div className="space-y-5">

                {comments.length ===
                0 ? (
                  <p
                    className="
                      font-[family-name:var(--font-devanagari)]
                      text-sm
                      text-[var(--secondary)]
                    "
                  >
                    अहिलेसम्म कुनै टिप्पणी छैन।
                  </p>
                ) : (
                  comments.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={`${item.newsId}-${index}`}
                        className="
                          border-b
                          border-[var(--outline-variant)]
                          pb-5
                        "
                      >

                        <div
                          className="
                            flex
                            items-start
                            gap-3
                          "
                        >

                          {/* USER AVATAR */}

                          <div
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-[var(--surface-container-high)]
                              font-bold
                              text-[var(--primary)]
                            "
                          >
                            U
                          </div>

                          <div>

                            {/* USER NAME */}

                            <p
                              className="
                                font-[family-name:var(--font-devanagari)]
                                font-bold
                              "
                            >
                              प्रयोगकर्ता
                            </p>

                            {/* COMMENT */}

                            <p
                              className="
                                mt-1
                                font-[family-name:var(--font-devanagari)]
                                text-[15px]
                                text-[var(--on-surface)]
                              "
                            >
                              {
                                item.content
                              }
                            </p>

                          </div>

                        </div>

                      </div>
                    )
                  )
                )}

              </div>

            </section>

          </article>

          {/* ====================================================
              RIGHT SIDE ADS
          ===================================================== */}

          <aside
            className="
              lg:block
              lg:pt-10
            "
          >

            <div
              className="
                sticky
                top-2
                space-y-6
              "
            >

              {/* ==================================================
                  AD 1
              =================================================== */}

              <div
                className="
                  relative
                  aspect-[320/250]
                  w-full
                  overflow-hidden
                "
              >

                <Image
                  src="/ad6.jpeg"
                  alt="विज्ञापन"
                  fill
                  sizes="320px"
                  className="object-cover"
                />

              </div>

              {/* ==================================================
                  AD 2
              =================================================== */}

              <div
                className="
                  relative
                  aspect-[320/250]
                  w-full
                  overflow-hidden
                "
              >

                <Image
                  src="/ad7.jpeg"
                  alt="विज्ञापन"
                  fill
                  sizes="320px"
                  className="object-cover"
                />

              </div>

              {/* ==================================================
                  AD 3
              =================================================== */}

              <div
                className="
                  relative
                  aspect-square
                  w-full
                  overflow-hidden
                "
              >

                <Image
                  src="/ad3.png"
                  alt="विज्ञापन"
                  fill
                  sizes="320px"
                  className="object-cover"
                />

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}