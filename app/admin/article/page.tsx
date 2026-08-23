"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

type Category = {
  id: number;
  name: string;
  news: unknown[];
};

export default function ArticleEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [pullQuote, setPullQuote] = useState("");
  const [heroImageSrc, setHeroImageSrc] = useState("");

  const [slug, setSlug] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState("");

  /*
   * ================= GET CATEGORIES =================
   */
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${API_BASE}/Category`
        );

        setCategories(response.data);
      } catch (error) {
        console.error("Failed to get categories:", error);
        setMessage("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    getCategories();
  }, []);

  /*
   * ================= GENERATE SLUG =================
   */
  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  /*
   * ================= TITLE CHANGE =================
   */
  const handleTitleChange = (value: string) => {
    setTitle(value);

    if (!slug) {
      setSlug(generateSlug(value));
    }
  };

  /*
   * ================= IMAGE CHANGE =================
   */
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  /*
   * ================= PUBLISH NEWS =================
   */
  const handlePublish = async () => {
    setMessage("");

    if (!title.trim()) {
      setMessage("Title is required");
      return;
    }

    if (!content.trim()) {
      setMessage("Content is required");
      return;
    }

    if (!categoryId) {
      setMessage("Please select a category");
      return;
    }

    if (!image) {
      setMessage("Featured image is required");
      return;
    }

    try {
      setPublishing(true);

      const formData = new FormData();

      formData.append("Title", title);
      formData.append("Content", content);
      formData.append("CategoryId", categoryId);
      formData.append("Image", image);

      if (pullQuote.trim()) {
        formData.append("PullQuote", pullQuote);
      }

      if (heroImageSrc.trim()) {
        formData.append("HeroImageSrc", heroImageSrc);
      }

      console.log("Publishing news...");
      console.log("API:", `${API_BASE}/News`);

      const response = await axios.post(
        `${API_BASE}/News`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Publish successful:", response.data);

      setMessage("News has been published successfully.");

      /*
       * ================= CLEAR FORM =================
       */
      setTitle("");
      setContent("");
      setCategoryId("");
      setTags("");
      setImage(null);
      setPullQuote("");
      setHeroImageSrc("");
      setSlug("");
      setMetaDescription("");

    } catch (error: unknown) {
      console.error("FULL PUBLISH ERROR:", error);

      /*
       * ================= AXIOS ERROR =================
       */
      if (axios.isAxiosError(error)) {
        console.error("Error message:", error.message);
        console.error("Status:", error.response?.status);
        console.error("Response data:", error.response?.data);
        console.error("Response headers:", error.response?.headers);

        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;

          let errorText = "";

          if (typeof data === "string") {
            errorText = data;
          } else if (data?.message) {
            errorText = data.message;
          } else if (data?.title) {
            errorText = data.title;
          } else {
            try {
              errorText = JSON.stringify(data);
            } catch {
              errorText = "Unknown server error";
            }
          }

          setMessage(
            `Server Error (${status}): ${errorText}`
          );
        } else if (error.request) {
          /*
           * Request was sent but no response came back
           */
          setMessage(
            `No response from server. ${error.message}`
          );
        } else {
          setMessage(
            `Request Error: ${error.message}`
          );
        }
      } else if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Unknown error occurred.");
      }
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1c1c]">
      <div className="mx-auto max-w-[1200px]">

        {/* ================= TOP NAV ================= */}

        <div className="flex h-[70px] items-center justify-between border-b border-[#e2beba] bg-white px-6">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-[#8f000d]">
              प्रश्न Editor
            </h1>

            <nav className="flex items-center gap-7 text-sm font-medium text-[#5a403e]">
              <span>Dashboard</span>

              <span className="border-b-2 border-[#8f000d] pb-5 text-[#8f000d]">
                Articles
              </span>

              <span>Media</span>
              <span>Analytics</span>
              <span>Users</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm text-[#5a403e]"
            >
              Preview
            </button>

            <button
              type="button"
              className="rounded border border-[#8e706d] bg-white px-4 py-2 text-sm"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={handlePublish}
              disabled={publishing}
              className="rounded bg-[#8f000d] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#72000a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {publishing ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        {/* ================= MAIN ================= */}

        <div className="grid min-h-[850px] grid-cols-[1fr_300px] bg-white">

          {/* ================= LEFT EDITOR ================= */}

          <main className="border-r border-[#e2beba] px-12 py-8">

            {/* TITLE */}

            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="मुख्य शीर्षक प्रविष्ट गर्नुहोस् (Headline)"
              className="mb-8 w-full border border-[#e2beba] px-4 py-5 text-4xl font-bold outline-none placeholder:text-[#d7d7d7] focus:border-[#8f000d]"
            />

            {/* CONTENT */}

            <div className="mb-4 border-b border-[#e2beba] pb-4">
              <span className="text-sm font-medium text-[#5a403e]">
                Article Content
              </span>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="समाचारको सामग्री यहाँ लेख्नुहोस्..."
              className="min-h-[500px] w-full resize-none border-none text-[17px] leading-8 outline-none placeholder:text-[#999]"
            />

            {/* PULL QUOTE */}

            <div className="mt-8">
              <label className="mb-2 block text-sm font-semibold text-[#5a403e]">
                Pull Quote
              </label>

              <textarea
                value={pullQuote}
                onChange={(e) => setPullQuote(e.target.value)}
                placeholder="महत्वपूर्ण उद्धरण..."
                rows={3}
                className="w-full resize-none border border-[#e2beba] p-4 outline-none focus:border-[#8f000d]"
              />
            </div>

            {/* HERO IMAGE SOURCE */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-[#5a403e]">
                Hero Image Source
              </label>

              <input
                type="text"
                value={heroImageSrc}
                onChange={(e) => setHeroImageSrc(e.target.value)}
                placeholder="Image source / photographer..."
                className="w-full border border-[#e2beba] p-3 outline-none focus:border-[#8f000d]"
              />
            </div>

            {/* MESSAGE */}

            {message && (
              <div className="mt-6 break-words rounded border border-[#e2beba] bg-[#f9f9f9] p-4 text-sm text-[#5a403e]">
                {message}
              </div>
            )}
          </main>

          {/* ================= RIGHT SIDEBAR ================= */}

          <aside className="bg-[#f9f9f9]">

            {/* METADATA */}

            <div className="border-b border-[#e2beba] px-5 py-5">
              <h2 className="text-xl font-bold text-[#8f000d]">
                Metadata
              </h2>

              <p className="mt-1 text-sm text-[#5a403e]">
                Article Details
              </p>
            </div>

            <div className="space-y-6 px-5 py-6">

              {/* CATEGORY */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#5a403e]">
                  Category
                </label>

                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  disabled={loadingCategories}
                  className="w-full rounded border border-[#e2beba] bg-white p-3 outline-none focus:border-[#8f000d] disabled:bg-[#eeeeee]"
                >
                  <option value="">
                    {loadingCategories
                      ? "Loading categories..."
                      : "Select category"}
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* TAGS */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#5a403e]">
                  Tags
                </label>

                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Add tags..."
                  className="w-full border border-[#e2beba] bg-white p-3 outline-none focus:border-[#8f000d]"
                />
              </div>

              <div className="border-t border-[#e2beba]" />

              {/* FEATURED IMAGE */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#5a403e]">
                  Featured Image
                </label>

                <label className="flex h-[115px] cursor-pointer flex-col items-center justify-center border border-dashed border-[#8e706d] bg-[#eeeeee] text-sm text-[#5a403e] transition hover:bg-[#e8e8e8]">

                  {image ? (
                    <>
                      <span className="max-w-[230px] truncate font-medium">
                        {image.name}
                      </span>

                      <span className="mt-1 text-xs">
                        {(image.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mb-1 text-2xl">↑</span>
                      <span>Click to upload</span>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* SLUG */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#5a403e]">
                  URL Slug
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-slug"
                  className="w-full border border-[#e2beba] bg-white p-3 outline-none focus:border-[#8f000d]"
                />
              </div>

              {/* META DESCRIPTION */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#5a403e]">
                  Meta Description
                </label>

                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Brief description for search engines..."
                  rows={4}
                  className="w-full resize-none border border-[#e2beba] bg-white p-3 outline-none focus:border-[#8f000d]"
                />
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}