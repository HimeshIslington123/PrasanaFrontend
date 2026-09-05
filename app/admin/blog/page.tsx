
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Loader2,
  Calendar,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  Eye,
  Share2,
  MessageCircle,
} from "lucide-react";

// ==========================================
// TYPES
// ==========================================

type Blog = {
  id: number;
  title: string;
  content: string;
  date: string;
  userId: string;
  image?: string | null;
  pullQuote?: string | null;
  heroImageSrc?: string | null;
  slug: string;
  shareCount: number;
  viewCount: number;
  commentCount: number;
};

// ==========================================
// CONSTANTS
// ==========================================

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PAGE_SIZE = 10;

// ==========================================
// COMPONENT
// ==========================================

export default function AdminBlogPage() {
  // ==========================================
  // DATA STATES
  // ==========================================

  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  // ==========================================
  // PAGINATION
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  

  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // CREATE FORM
  // ==========================================

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [heroImage, setHeroImage] = useState<File | null>(null);

  const [pullQuote, setPullQuote] = useState("");

  // ==========================================
  // EDIT STATES
  // ==========================================

  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editSlug, setEditSlug] = useState("");

  const [editImage, setEditImage] = useState<File | null>(null);
  const [editHeroImage, setEditHeroImage] =
    useState<File | null>(null);

  const [editPullQuote, setEditPullQuote] = useState("");

  // ==========================================
  // FETCH BLOGS
  // ==========================================

  const fetchBlogs = async (page = currentPage) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/Blog`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const result: Blog[] = await response.json();

      setBlogs(result);

      const calculatedTotalPages = Math.max(
        1,
        Math.ceil(result.length / PAGE_SIZE)
      );

      setTotalPages(calculatedTotalPages);

      /*
       * If the current page no longer exists
       * after deletion, move back one page.
       */
      if (page > calculatedTotalPages) {
        setCurrentPage(calculatedTotalPages);
      } else {
        setCurrentPage(page);
      }
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    fetchBlogs(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==========================================
  // RESET CREATE FORM
  // ==========================================

  const resetCreateForm = () => {
    setTitle("");
    setContent("");
    setSlug("");
    setImage(null);
    setHeroImage(null);
    setPullQuote("");
  };

  // ==========================================
  // CREATE BLOG
  // ==========================================

  const handleCreate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!content.trim()) {
      setError("Content is required.");
      return;
    }

    if (!slug.trim()) {
      setError("URL Slug is required.");
      return;
    }

    if (!image) {
      setError("Image is required.");
      return;
    }

    // ------------------------------------------
    // CLEAN SLUG
    // ------------------------------------------

    const cleanSlug = slug
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanSlug)) {
      setError(
        "Slug can only contain lowercase English letters, numbers and hyphens."
      );
      return;
    }

    try {
      setSaving(true);

      // ------------------------------------------
      // FORM DATA
      // ------------------------------------------

      const formData = new FormData();

      formData.append("Title", title.trim());
      formData.append("Content", content.trim());
      formData.append("Slug", cleanSlug);

      formData.append("Image", image);

      if (heroImage) {
        formData.append("HeroImage", heroImage);
      }

      if (pullQuote.trim()) {
        formData.append(
          "PullQuote",
          pullQuote.trim()
        );
      }

      // ------------------------------------------
      // API REQUEST
      // ------------------------------------------

      const response = await fetch(`${API_URL}/Blog`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        let message = "Failed to create blog";

        try {
          const data = await response.json();

          message =
            data?.message ||
            data?.title ||
            data ||
            message;

          if (typeof message !== "string") {
            message = "Failed to create blog";
          }
        } catch {
          const text = await response.text();

          if (text) {
            message = text;
          }
        }

        throw new Error(message);
      }

      // ------------------------------------------
      // REFRESH
      // ------------------------------------------

      await fetchBlogs(1);

      resetCreateForm();
      setShowCreate(false);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create blog"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // OPEN EDIT
  // ==========================================

  const openEdit = (item: Blog) => {
    setEditingBlog(item);

    setEditTitle(item.title);
    setEditContent(item.content);
    setEditSlug(item.slug);
    setEditPullQuote(item.pullQuote || "");

    setEditImage(null);
    setEditHeroImage(null);

    setShowEdit(true);
    setError("");
  };

  // ==========================================
  // UPDATE BLOG
  // ==========================================

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!editingBlog) return;

    setError("");

    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (!editTitle.trim()) {
      setError("Title is required.");
      return;
    }

    if (!editContent.trim()) {
      setError("Content is required.");
      return;
    }

    if (!editSlug.trim()) {
      setError("URL Slug is required.");
      return;
    }

    // ------------------------------------------
    // CLEAN SLUG
    // ------------------------------------------

    const cleanSlug = editSlug
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanSlug)) {
      setError(
        "Slug can only contain lowercase English letters, numbers and hyphens."
      );
      return;
    }

    try {
      setSaving(true);

      // ------------------------------------------
      // FORM DATA
      // ------------------------------------------

      const formData = new FormData();

      formData.append("Title", editTitle.trim());
      formData.append("Content", editContent.trim());
      formData.append("Slug", cleanSlug);

      if (editImage) {
        formData.append("Image", editImage);
      }

      if (editHeroImage) {
        formData.append(
          "HeroImage",
          editHeroImage
        );
      }

      if (editPullQuote.trim()) {
        formData.append(
          "PullQuote",
          editPullQuote.trim()
        );
      }

      // ------------------------------------------
      // API REQUEST
      // ------------------------------------------

      const response = await fetch(
        `${API_URL}/Blog/${editingBlog.id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        let message = "Failed to update blog";

        try {
          const data = await response.json();

          message =
            data?.message ||
            data?.title ||
            data ||
            message;

          if (typeof message !== "string") {
            message = "Failed to update blog";
          }
        } catch {
          const text = await response.text();

          if (text) {
            message = text;
          }
        }

        throw new Error(message);
      }

      // ------------------------------------------
      // REFRESH
      // ------------------------------------------

      await fetchBlogs(currentPage);

      setShowEdit(false);
      setEditingBlog(null);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update blog"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE BLOG
  // ==========================================

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(
        `${API_URL}/Blog/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        let message = "Failed to delete blog";

        try {
          const data = await response.json();

          message =
            data?.message ||
            data?.title ||
            data ||
            message;

          if (typeof message !== "string") {
            message = "Failed to delete blog";
          }
        } catch {
          const text = await response.text();

          if (text) {
            message = text;
          }
        }

        throw new Error(message);
      }

      // ------------------------------------------
      // REFRESH
      // ------------------------------------------

      const remainingBlogs = blogs.filter(
        (item) => item.id !== id
      );

      const newTotalPages = Math.max(
        1,
        Math.ceil(
          remainingBlogs.length / PAGE_SIZE
        )
      );

      const pageToFetch =
        currentPage > newTotalPages
          ? newTotalPages
          : currentPage;

      await fetchBlogs(pageToFetch);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete blog"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredBlogs = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return blogs;

    return blogs.filter((item) => {
      return (
        item.title
          .toLowerCase()
          .includes(query) ||
        item.content
          .toLowerCase()
          .includes(query) ||
        item.slug
          .toLowerCase()
          .includes(query)
      );
    });
  }, [blogs, search]);

  // ==========================================
  // PAGINATED BLOGS
  // ==========================================

  const paginatedBlogs = useMemo(() => {
    const startIndex =
      (currentPage - 1) * PAGE_SIZE;

    return filteredBlogs.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
  }, [filteredBlogs, currentPage]);

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  // ==========================================
  // PREVIOUS PAGE
  // ==========================================

  const handlePreviousPage = () => {
    if (currentPage <= 1) return;

    setCurrentPage((previous) => previous - 1);
  };

  // ==========================================
  // NEXT PAGE
  // ==========================================

  const handleNextPage = () => {
    if (currentPage >= totalPages) return;

    setCurrentPage((previous) => previous + 1);
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl">

        {/* ======================================
            PAGE HEADER
        ====================================== */}

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
              <BookOpen size={24} />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Blog Management
              </h1>

              <p className="text-sm text-[var(--on-surface-variant)]">
                Create, edit and manage blog articles
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => {
              resetCreateForm();
              setError("");
              setShowCreate(true);
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 font-medium text-white transition hover:opacity-90"
          >
            <Plus size={20} />
            Add Blog
          </button>

        </div>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-[var(--error)] bg-[var(--surface-container-low)] px-4 py-3 text-[var(--error)]">

            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
            >
              <X size={18} />
            </button>

          </div>
        )}

        {/* ======================================
            SEARCH
        ====================================== */}

        <div className="mb-6 rounded-2xl bg-[var(--surface-container-lowest)] p-4 shadow-sm">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]"
            />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search blogs by title, content or slug..."
              className="w-full rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] py-3 pl-12 pr-4 outline-none focus:border-[var(--primary)]"
            />

          </div>

        </div>

        {/* ======================================
            BLOG TABLE
        ====================================== */}

        <div className="overflow-hidden rounded-2xl bg-[var(--surface-container-lowest)] shadow-sm">

          <div className="border-b border-[var(--surface-container)] px-6 py-5">

            <h2 className="font-semibold">
              All Blogs
            </h2>

            <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
              Showing {paginatedBlogs.length} of{" "}
              {filteredBlogs.length} blogs
            </p>

          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 py-20">

              <Loader2
                size={24}
                className="animate-spin"
              />

              Loading blogs...

            </div>
          ) : paginatedBlogs.length === 0 ? (
            <div className="py-20 text-center">

              <BookOpen
                size={45}
                className="mx-auto mb-4 text-[var(--outline)]"
              />

              <p>No blogs found</p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1250px]">

                <thead>

                  <tr className="bg-[var(--surface-container-low)] text-left text-sm">

                    <th className="px-6 py-4">
                      ID
                    </th>

                    <th className="px-6 py-4">
                      Blog
                    </th>

                    <th className="px-6 py-4">
                      URL Slug
                    </th>

                    <th className="px-6 py-4">
                      Statistics
                    </th>

                    <th className="px-6 py-4">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {paginatedBlogs.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-[var(--surface-container)] transition hover:bg-[var(--surface-container-low)]"
                    >

                      {/* ID */}

                      <td className="px-6 py-5">

                        <span className="font-medium">
                          #{item.id}
                        </span>

                      </td>

                      {/* BLOG */}

                      <td className="max-w-md px-6 py-5">

                        <div className="flex items-center gap-3">

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-14 w-20 shrink-0 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-container)]">
                              <ImageIcon size={20} />
                            </div>
                          )}

                          <div className="min-w-0">

                            <h3 className="truncate font-semibold">
                              {item.title}
                            </h3>

                            <p className="mt-1 line-clamp-1 text-sm text-[var(--on-surface-variant)]">
                              {item.content}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* SLUG */}

                      <td className="max-w-xs px-6 py-5">

                        <div className="flex items-center gap-2">

                          <LinkIcon
                            size={16}
                            className="shrink-0 text-[var(--primary)]"
                          />

                          <span
                            className="truncate text-sm text-[var(--on-surface-variant)]"
                            title={item.slug}
                          >
                            /blog/{item.slug}
                          </span>

                        </div>

                      </td>

                      {/* STATISTICS */}

                      <td className="px-6 py-5">

                        <div className="flex flex-col gap-2 text-sm">

                          <div className="flex items-center gap-2">

                            <Eye size={15} />

                            <span>
                              {item.viewCount} views
                            </span>

                          </div>

                          <div className="flex items-center gap-2">

                            <Share2 size={15} />

                            <span>
                              {item.shareCount} shares
                            </span>

                          </div>

                          <div className="flex items-center gap-2">

                            <MessageCircle size={15} />

                            <span>
                              {item.commentCount} comments
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* DATE */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm">

                          <Calendar size={16} />

                          {formatDate(item.date)}

                        </div>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              openEdit(item)
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface-container)] transition hover:opacity-80"
                            title="Edit"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            disabled={
                              deletingId === item.id
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--error)] text-white transition hover:opacity-90 disabled:opacity-50"
                            title="Delete"
                          >

                            {deletingId === item.id ? (
                              <Loader2
                                size={17}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={17} />
                            )}

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

          {/* ======================================
              PAGINATION
          ====================================== */}

          {!loading && filteredBlogs.length > 0 && (

            <div className="flex flex-col gap-4 border-t border-[var(--surface-container)] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-[var(--on-surface-variant)]">

                Page{" "}

                <span className="font-semibold text-[var(--foreground)]">
                  {currentPage}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-[var(--foreground)]">
                  {totalPages}
                </span>

              </p>

              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={
                    currentPage === 1 ||
                    loading
                  }
                  className="flex items-center gap-2 rounded-xl bg-[var(--surface-container)] px-4 py-2.5 text-sm font-medium transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={
                    currentPage === totalPages ||
                    loading
                  }
                  className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={18} />
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* ==========================================
          CREATE MODAL
      ========================================== */}

      {showCreate && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <form
            onSubmit={handleCreate}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[var(--surface-container-lowest)] p-6"
          >

            {/* HEADER */}

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Create Blog
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowCreate(false)
                }
              >
                <X />
              </button>

            </div>

            {/* TITLE */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Title
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3 outline-none focus:border-[var(--primary)]"
                placeholder="Blog title"
              />

            </div>

            {/* SLUG */}

            <div className="mb-4">

              <label className="mb-2 flex items-center gap-2 font-medium">

                <LinkIcon size={16} />

                URL Slug

              </label>

              <input
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value)
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3 outline-none focus:border-[var(--primary)]"
                placeholder="how-to-start-a-successful-business"
              />

              <p className="mt-2 text-xs text-[var(--on-surface-variant)]">
                Use lowercase English letters,
                numbers and hyphens.
              </p>

              {slug.trim() && (

                <div className="mt-2 rounded-lg bg-[var(--surface-container-low)] p-2 text-xs text-[var(--on-surface-variant)]">

                  URL: /blog/
                  {slug
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "-")}

                </div>

              )}

            </div>

            {/* CONTENT */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Content
              </label>

              <textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                rows={8}
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3 outline-none focus:border-[var(--primary)]"
                placeholder="Write your blog content..."
              />

            </div>

            {/* IMAGE */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Blog Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target.files?.[0] || null
                  )
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

              <p className="mt-2 text-xs text-[var(--on-surface-variant)]">
                Main image displayed with the blog.
              </p>

            </div>

            {/* HERO IMAGE */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Hero Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setHeroImage(
                    e.target.files?.[0] || null
                  )
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

              <p className="mt-2 text-xs text-[var(--on-surface-variant)]">
                Optional large hero image for the
                blog article.
              </p>

            </div>

            {/* PULL QUOTE */}

            <div className="mb-6">

              <label className="mb-2 block font-medium">
                Pull Quote (Optional)
              </label>

              <textarea
                value={pullQuote}
                onChange={(e) =>
                  setPullQuote(e.target.value)
                }
                rows={3}
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
                placeholder="Important quote from the article..."
              />

            </div>

            {/* BUTTONS */}

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowCreate(false)
                }
                disabled={saving}
                className="rounded-xl bg-[var(--surface-container)] px-5 py-3 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-white disabled:opacity-50"
              >

                {saving && (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                )}

                {saving
                  ? "Creating..."
                  : "Create Blog"}

              </button>

            </div>

          </form>

        </div>

      )}

      {/* ==========================================
          EDIT MODAL
      ========================================== */}

      {showEdit && editingBlog && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <form
            onSubmit={handleUpdate}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[var(--surface-container-lowest)] p-6"
          >

            {/* HEADER */}

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Edit Blog
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowEdit(false);
                  setEditingBlog(null);
                }}
              >
                <X />
              </button>

            </div>

            {/* TITLE */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Title
              </label>

              <input
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

            </div>

            {/* SLUG */}

            <div className="mb-4">

              <label className="mb-2 flex items-center gap-2 font-medium">

                <LinkIcon size={16} />

                URL Slug

              </label>

              <input
                value={editSlug}
                onChange={(e) =>
                  setEditSlug(e.target.value)
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

              <div className="mt-2 rounded-lg bg-[var(--surface-container-low)] p-2 text-xs text-[var(--on-surface-variant)]">

                URL: /blog/
                {editSlug
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, "-")}

              </div>

            </div>

            {/* CONTENT */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Content
              </label>

              <textarea
                value={editContent}
                onChange={(e) =>
                  setEditContent(e.target.value)
                }
                rows={8}
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

            </div>

            {/* CURRENT IMAGE */}

            {editingBlog.image && (

              <div className="mb-4">

                <label className="mb-2 block font-medium">
                  Current Blog Image
                </label>

                <img
                  src={editingBlog.image}
                  alt={editingBlog.title}
                  className="h-40 w-full rounded-xl object-cover"
                />

              </div>

            )}

            {/* NEW IMAGE */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Replace Blog Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditImage(
                    e.target.files?.[0] || null
                  )
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

            </div>

            {/* CURRENT HERO IMAGE */}

            {editingBlog.heroImageSrc && (

              <div className="mb-4">

                <label className="mb-2 block font-medium">
                  Current Hero Image
                </label>

                <img
                  src={editingBlog.heroImageSrc}
                  alt={`${editingBlog.title} hero`}
                  className="h-40 w-full rounded-xl object-cover"
                />

              </div>

            )}

            {/* NEW HERO IMAGE */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Replace Hero Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditHeroImage(
                    e.target.files?.[0] || null
                  )
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

            </div>

            {/* PULL QUOTE */}

            <div className="mb-6">

              <label className="mb-2 block font-medium">
                Pull Quote
              </label>

              <textarea
                value={editPullQuote}
                onChange={(e) =>
                  setEditPullQuote(e.target.value)
                }
                rows={3}
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

            </div>

            {/* BUTTONS */}

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() => {
                  setShowEdit(false);
                  setEditingBlog(null);
                }}
                disabled={saving}
                className="rounded-xl bg-[var(--surface-container)] px-5 py-3 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-white disabled:opacity-50"
              >

                {saving && (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                )}

                {saving
                  ? "Updating..."
                  : "Update Blog"}

              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}

