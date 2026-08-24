"use client";

import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  news: unknown[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // GET ALL
  // =========================
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

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
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================
  // CREATE
  // =========================
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setSaving(true);
      setError("");

      const response = await fetch(`${API_URL}/Category`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const newCategory = await response.json();

      setCategories((prev) => [...prev, newCategory]);
      setName("");
    } catch (error) {
      console.error(error);
      setError("Failed to create category.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // START EDIT
  // =========================
  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  // =========================
  // UPDATE
  // =========================
  const handleUpdate = async (id: number) => {
    if (!editingName.trim()) return;

    try {
      setSaving(true);
      setError("");

      const response = await fetch(`${API_URL}/Category/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingName.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      setCategories((prev) =>
        prev.map((category) =>
          category.id === id
            ? {
                ...category,
                name: editingName.trim(),
              }
            : category
        )
      );

      cancelEdit();
    } catch (error) {
      console.error(error);
      setError("Failed to update category.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      setSaving(true);
      setError("");

      const response = await fetch(`${API_URL}/Category/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories((prev) =>
        prev.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete category.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 text-[var(--foreground)]">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
            Manage your news categories
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-4 py-3 text-sm text-[var(--error)]">
            {error}
          </div>
        )}

        {/* CREATE */}
        <div className="mb-8 rounded-2xl bg-[var(--surface-container-lowest)] p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Add Category
          </h2>

          <form
            onSubmit={handleCreate}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="flex-1 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--outline-variant)]"
            />

            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="rounded-xl bg-[var(--primary)] px-6 py-3 font-medium text-[var(--on-primary)] transition hover:bg-[var(--primary-container)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Add Category"}
            </button>
          </form>
        </div>

        {/* CATEGORY TABLE */}
        <div className="overflow-hidden rounded-2xl bg-[var(--surface-container-lowest)] shadow-sm">

          <div className="border-b border-[var(--surface-container)] px-6 py-5">
            <h2 className="text-lg font-semibold">
              All Categories
            </h2>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-[var(--on-surface-variant)]">
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="px-6 py-12 text-center text-[var(--on-surface-variant)]">
              No categories found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--surface-container-low)] text-left text-sm">
                    <th className="px-6 py-4 font-semibold">
                      ID
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Category
                    </th>

                    <th className="px-6 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-t border-[var(--surface-container)]"
                    >
                      {/* ID */}
                      <td className="px-6 py-4 text-sm text-[var(--on-surface-variant)]">
                        #{category.id}
                      </td>

                      {/* CATEGORY */}
                      <td className="px-6 py-4">
                        {editingId === category.id ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) =>
                              setEditingName(e.target.value)
                            }
                            autoFocus
                            className="w-full max-w-md rounded-lg border border-[var(--primary)] bg-[var(--surface)] px-3 py-2 outline-none"
                          />
                        ) : (
                          <span className="font-medium">
                            {category.name}
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">

                          {editingId === category.id ? (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdate(category.id)
                                }
                                disabled={saving}
                                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--on-primary)] hover:bg-[var(--primary-container)] disabled:opacity-50"
                              >
                                Save
                              </button>

                              <button
                                onClick={cancelEdit}
                                disabled={saving}
                                className="rounded-lg bg-[var(--surface-container)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-container-high)]"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(category)}
                                className="rounded-lg border border-[var(--outline-variant)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-container-low)]"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() =>
                                  handleDelete(category.id)
                                }
                                disabled={saving}
                                className="rounded-lg bg-[var(--error)] px-4 py-2 text-sm font-medium text-[var(--on-error)] hover:opacity-90 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}