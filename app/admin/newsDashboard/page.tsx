"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Newspaper,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Loader2,
  Calendar,
  Tag,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ==========================================
// TYPES
// ==========================================

type News = {
  id: number;
  title: string;
  content: string;
  categoryname: string;
  created: string;
  image?: string | null;
  comments?: unknown[] | null;
  pullQuote?: string | null;
  heroImageSrc?: string | null;
};

type Category = {
  id: number;
  name: string;
};

type NewsResponse = {
  data: News[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PAGE_SIZE = 10;

// ==========================================
// COMPONENT
// ==========================================

export default function AdminNewsPage() {
  // ==========================================
  // DATA STATES
  // ==========================================

  const [news, setNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  // ==========================================
  // PAGINATION STATES
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // ==========================================
  // UI STATES
  // ==========================================

  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // CREATE FORM STATES
  // ==========================================

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [pullQuote, setPullQuote] = useState("");
  const [heroImageSrc, setHeroImageSrc] = useState("");

  // ==========================================
  // EDIT STATES
  // ==========================================

  const [editingNews, setEditingNews] = useState<News | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editPullQuote, setEditPullQuote] = useState("");
  const [editHeroImageSrc, setEditHeroImageSrc] = useState("");

  // ==========================================
  // FETCH NEWS
  // ==========================================

  const fetchNews = async (page = currentPage) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/News?page=${page}&pageSize=${PAGE_SIZE}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const result: NewsResponse = await response.json();

      // IMPORTANT:
      // Your API returns:
      // {
      //   data: [...],
      //   currentPage: 1,
      //   totalPages: 1
      // }

      setNews(result.data);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
      setTotalItems(result.totalItems);

    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch news"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/Category`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();

      setCategories(data);

    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    fetchNews(1);
    fetchCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==========================================
  // RESET CREATE FORM
  // ==========================================

  const resetCreateForm = () => {
    setTitle("");
    setContent("");
    setCategoryId("");
    setImage(null);
    setPullQuote("");
    setHeroImageSrc("");
  };

  // ==========================================
  // CREATE NEWS
  // ==========================================

  const handleCreate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!content.trim()) {
      setError("Content is required.");
      return;
    }

    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();

      formData.append("Title", title.trim());
      formData.append("Content", content.trim());
      formData.append("CategoryId", categoryId);

      if (pullQuote.trim()) {
        formData.append(
          "PullQuote",
          pullQuote.trim()
        );
      }

      if (heroImageSrc.trim()) {
        formData.append(
          "HeroImageSrc",
          heroImageSrc.trim()
        );
      }

      if (image) {
        formData.append("Image", image);
      }

      const response = await fetch(`${API_URL}/News`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Failed to create news"
        );
      }

      await fetchNews(1);

      resetCreateForm();
      setShowCreate(false);

    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create news"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // OPEN EDIT
  // ==========================================

  const openEdit = (item: News) => {
    setEditingNews(item);

    setEditTitle(item.title);
    setEditContent(item.content);
    setEditCategoryName(item.categoryname);
    setEditPullQuote(item.pullQuote || "");
    setEditHeroImageSrc(item.heroImageSrc || "");

    setShowEdit(true);
  };

  // ==========================================
  // UPDATE NEWS
  // ==========================================

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!editingNews) return;

    if (!editTitle.trim()) {
      setError("Title is required.");
      return;
    }

    if (!editContent.trim()) {
      setError("Content is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `${API_URL}/News/${editingNews.id}`,
        {
          method: "PATCH",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: editTitle.trim(),
            content: editContent.trim(),
            pullQuote: editPullQuote.trim() || null,
            heroImageSrc: editHeroImageSrc.trim() || null,
          }),
        }
      );

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Failed to update news"
        );
      }

      await fetchNews(currentPage);

      setShowEdit(false);
      setEditingNews(null);

    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update news"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE NEWS
  // ==========================================

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(
        `${API_URL}/News/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Failed to delete news"
        );
      }

      // If we deleted the last item on a page,
      // go to the previous page if necessary

      const newTotalItems = totalItems - 1;

      const newTotalPages = Math.max(
        1,
        Math.ceil(newTotalItems / PAGE_SIZE)
      );

      const pageToFetch =
        currentPage > newTotalPages
          ? newTotalPages
          : currentPage;

      await fetchNews(pageToFetch);

    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete news"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredNews = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return news;

    return news.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.categoryname.toLowerCase().includes(query)
      );
    });
  }, [news, search]);

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

    fetchNews(currentPage - 1);
  };

  // ==========================================
  // NEXT PAGE
  // ==========================================

  const handleNextPage = () => {
    if (currentPage >= totalPages) return;

    fetchNews(currentPage + 1);
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

              <Newspaper size={24} />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                News Management
              </h1>

              <p className="text-sm text-[var(--on-surface-variant)]">
                Create, edit and manage news articles
              </p>

            </div>

          </div>

          <button
            onClick={() => {
              resetCreateForm();
              setShowCreate(true);
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 font-medium text-white transition hover:opacity-90"
          >
            <Plus size={20} />
            Add News
          </button>

        </div>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (

          <div className="mb-6 flex items-center justify-between rounded-xl border border-[var(--error)] bg-[var(--surface-container-low)] px-4 py-3 text-[var(--error)]">

            <span>{error}</span>

            <button
              onClick={() => setError("")}
              type="button"
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news by title, content or category..."
              className="w-full rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] py-3 pl-12 pr-4 outline-none focus:border-[var(--primary)]"
            />

          </div>

        </div>

        {/* ======================================
            NEWS TABLE
        ====================================== */}

        <div className="overflow-hidden rounded-2xl bg-[var(--surface-container-lowest)] shadow-sm">

          <div className="border-b border-[var(--surface-container)] px-6 py-5">

            <h2 className="font-semibold">
              All News
            </h2>

            <p className="mt-1 text-sm text-[var(--on-surface-variant)]">

              Showing {filteredNews.length} of {totalItems} articles

            </p>

          </div>

          {loading ? (

            <div className="flex items-center justify-center gap-3 py-20">

              <Loader2
                size={24}
                className="animate-spin"
              />

              Loading news...

            </div>

          ) : filteredNews.length === 0 ? (

            <div className="py-20 text-center">

              <Newspaper
                size={45}
                className="mx-auto mb-4 text-[var(--outline)]"
              />

              <p>No news found</p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead>

                  <tr className="bg-[var(--surface-container-low)] text-left text-sm">

                    <th className="px-6 py-4">
                      ID
                    </th>

                    <th className="px-6 py-4">
                      News
                    </th>

                    <th className="px-6 py-4">
                      Category
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

                  {filteredNews.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-[var(--surface-container)] transition hover:bg-[var(--surface-container-low)]"
                    >

                      <td className="px-6 py-5">

                        <span className="font-medium">
                          #{item.id}
                        </span>

                      </td>

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

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <Tag
                            size={16}
                            className="text-[var(--primary)]"
                          />

                          {item.categoryname}

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm">

                          <Calendar size={16} />

                          {formatDate(item.created)}

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface-container)] transition hover:opacity-80"
                            title="Edit"
                          >

                            <Pencil size={17} />

                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
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

          {!loading && totalItems > 0 && (

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

                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 || loading}
                  className="flex items-center gap-2 rounded-xl bg-[var(--surface-container)] px-4 py-2.5 text-sm font-medium transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  <ChevronLeft size={18} />

                  Previous

                </button>

                {/* NEXT */}

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || loading}
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

      {/* ======================================
          CREATE MODAL
      ====================================== */}

      {showCreate && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <form
            onSubmit={handleCreate}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[var(--surface-container-lowest)] p-6"
          >

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Create News
              </h2>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
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
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3 outline-none focus:border-[var(--primary)]"
                placeholder="News title"
              />

            </div>

            {/* CATEGORY */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Category
              </label>

              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              >

                <option value="">
                  Select category
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

            {/* CONTENT */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Content
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3 outline-none focus:border-[var(--primary)]"
                placeholder="Write your news content..."
              />

            </div>

            {/* IMAGE */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files?.[0] || null)
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

            </div>

            {/* PULL QUOTE */}

            <div className="mb-4">

              <label className="mb-2 block font-medium">
                Pull Quote (Optional)
              </label>

              <input
                value={pullQuote}
                onChange={(e) => setPullQuote(e.target.value)}
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

            </div>

            {/* HERO IMAGE */}

            <div className="mb-6">

              <label className="mb-2 block font-medium">
                Hero Image Source (Optional)
              </label>

              <input
                value={heroImageSrc}
                onChange={(e) => setHeroImageSrc(e.target.value)}
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
                placeholder="https://example.com/image.jpg"
              />

            </div>

            {/* BUTTONS */}

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setShowCreate(false)}
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
                  : "Create News"}

              </button>

            </div>

          </form>

        </div>

      )}

      {/* ======================================
          EDIT MODAL
      ====================================== */}

      {showEdit && editingNews && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <form
            onSubmit={handleUpdate}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[var(--surface-container-lowest)] p-6"
          >

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Edit News
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowEdit(false);
                  setEditingNews(null);
                }}
              >
                <X />
              </button>

            </div>

            {/* TITLE */}

            <div className="mb-4">

              <label className="mb-2 block">
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

            {/* CATEGORY */}

            <div className="mb-4">

              <label className="mb-2 block">
                Current Category
              </label>

              <input
                value={editCategoryName}
                disabled
                className="w-full rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container)] p-3"
              />

            </div>

            {/* CONTENT */}

            <div className="mb-4">

              <label className="mb-2 block">
                Content
              </label>

              <textarea
                value={editContent}
                onChange={(e) =>
                  setEditContent(e.target.value)
                }
                rows={6}
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

            </div>

            {/* PULL QUOTE */}

            <div className="mb-4">

              <label className="mb-2 block">
                Pull Quote
              </label>

              <input
                value={editPullQuote}
                onChange={(e) =>
                  setEditPullQuote(e.target.value)
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
              />

            </div>

            {/* HERO IMAGE */}

            <div className="mb-6">

              <label className="mb-2 block">
                Hero Image Source
              </label>

              <input
                value={editHeroImageSrc}
                onChange={(e) =>
                  setEditHeroImageSrc(e.target.value)
                }
                className="w-full rounded-xl border border-[var(--outline-variant)] p-3"
                placeholder="https://example.com/image.jpg"
              />

            </div>

            {/* BUTTONS */}

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() => {
                  setShowEdit(false);
                  setEditingNews(null);
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
                  : "Update News"}

              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}