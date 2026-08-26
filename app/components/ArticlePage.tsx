"use client";

import Image from "next/image";
import { Share2, Bookmark, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

  // API can return null
  caption?: string | null;

  paragraphs?: string[];

  // API can return null
  pullQuote?: string | null;

  comments?: {
    newsId: number;
    content: string;
  }[];
};

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
}: ArticlePageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [savedid, setSavedId] = useState<number | null>(null);

  // Text currently being typed
  const [comment, setComment] = useState("");

  // List of existing comments
  const [comments, setComments] = useState(initialComments);

  const router = useRouter();

  // ============================================================
  // ADD COMMENT
  // ============================================================

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Comment`,
        {
          Content: comment,
          NewsId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setComments((prevComments) => [
        ...prevComments,
        response.data,
      ]);

      setComment("");
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push("/Login");
        return;
      }

      console.error(error);
    }
  };

  // ============================================================
  // BOOKMARK
  // ============================================================

  const handleId = async (id: number) => {
    try {
      if (!isBookmarked) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/bookmark`,
          id,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setIsBookmarked(true);
      } else {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/bookmark`,
          {
            data: id,
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setIsBookmarked(false);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push("/login");
        return;
      }

      console.error(error);
    }
  };

  // ============================================================
  // CHECK BOOKMARK
  // ============================================================

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/bookmark/${id}`,
          {
            withCredentials: true,
          }
        );

        setIsBookmarked(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    checkBookmark();
  }, [id]);

  // ============================================================
  // UI
  // ============================================================

  return (
    <main className="min-h-screen bg-[var(--background)]">

      {/* ========================================================
          MAIN PAGE CONTAINER
      ========================================================= */}

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

        {/* ======================================================
            GRID
        ======================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-8
            lg:grid-cols-[minmax(0,2fr)_320px]
            lg:gap-10
          "
        >

          {/* ====================================================
              LEFT SIDE - ARTICLE
          ===================================================== */}

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
  {/* Home */}
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

  {/* Arrow */}
  <ChevronRight
    size={14}
    strokeWidth={1.5}
    className="mx-1 text-[var(--secondary)]"
  />

  {/* Category */}
  <span className="text-[var(--on-surface)]">
    {category}
  </span>
</nav>

            {/* ==================================================
                ARTICLE HEADER
            =================================================== */}

            <header className="max-w-[900px]">

              {/* Category */}

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

              {/* Title */}

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
                BYLINE
            =================================================== */}

            <div
              className="
                mt-7
                flex
                items-center
                justify-between
                border-y
                border-[var(--outline-variant)]
                py-4
              "
            >

              {/* Author */}

              <div className="flex items-center gap-3">

                {/* Author Image */}

                {authorImageSrc ? (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={authorImageSrc}
                      alt={authorName}
                      fill
                      sizes="40px"
                      className="object-contain object-top"
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
                    {authorName?.charAt(0)}
                  </div>
                )}

                {/* Author Information */}

                <div className="leading-tight">

                  <p
                    className="
                      font-[family-name:var(--font-devanagari)]
                      text-[13px]
                      font-bold
                      text-[var(--primary)]
                    "
                  >
                    {authorName}
                  </p>

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

                  {publishedAt && (
                    <p
                      className="
                        mt-0.5
                        font-[family-name:var(--font-devanagari)]
                        text-[11px]
                        text-[var(--secondary)]
                      "
                    >
                      {publishedAt}
                    </p>
                  )}

                </div>

              </div>

              {/* Share / Bookmark */}

              <div className="flex items-center gap-1">

                {/* Share */}

                <button
                  type="button"
                  aria-label="साझा गर्नुहोस्"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    text-[var(--secondary)]
                    transition-colors
                    hover:text-[var(--primary)]
                  "
                >
                  <Share2 size={19} strokeWidth={1.6} />
                </button>

                {/* Bookmark */}

                <button
                  type="button"
                  aria-label="सुरक्षित राख्नुहोस्"
                  onClick={() => handleId(id)}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    transition-colors
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
                ARTICLE CONTENT
            =================================================== */}

            <div className="mt-7 max-w-[900px]">

              {/* HERO IMAGE */}

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
                      src={heroImageSrc}
                      alt={heroImageAlt || title}
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

                  {/* IMAGE CAPTION */}

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

                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-7 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}

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

              {/* ADD COMMENT */}

              <div className="mb-8">

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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

                <div className="mt-3 flex justify-end">

                  <button
                    type="button"
                    onClick={handleComment}
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

              {/* COMMENTS LIST */}

              <div className="space-y-5">

                {comments.length === 0 ? (
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
                  comments.map((item, index) => (
                    <div
                      key={`${item.newsId}-${index}`}
                      className="
                        border-b
                        border-[var(--outline-variant)]
                        pb-5
                      "
                    >

                      <div className="flex items-start gap-3">

                        {/* User Avatar */}

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

                        {/* Comment */}

                        <div>

                          <p
                            className="
                              font-[family-name:var(--font-devanagari)]
                              font-bold
                            "
                          >
                            प्रयोगकर्ता
                          </p>

                          <p
                            className="
                              mt-1
                              font-[family-name:var(--font-devanagari)]
                              text-[15px]
                              text-[var(--on-surface)]
                            "
                          >
                            {item.content}
                          </p>

                        </div>

                      </div>

                    </div>
                  ))
                )}

              </div>

            </section>

          </article>


          {/* ====================================================
              RIGHT SIDE - ADS
          ===================================================== */}

          <aside className="lg:block lg:pt-10">

            <div className="sticky top-2 space-y-6">

              {/* Advertisement 1 */}

              <div className="relative w-full overflow-hidden">
                <Image
                  src="/ad6.jpeg"
                  alt="विज्ञापन"
                  width={320}
                  height={250}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Advertisement 2 */}

              <div className="relative w-full overflow-hidden">
                <Image
                  src="/ad7.jpeg"
                  alt="विज्ञापन"
                  width={320}
                  height={250}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Advertisement 3 */}

              <div className="relative w-full overflow-hidden">
                <Image
                  src="/ad3.png"
                  alt="विज्ञापन"
                  width={400}
                  height={400}
                  className="h-auto w-full object-cover"
                />
              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}