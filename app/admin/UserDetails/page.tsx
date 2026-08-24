"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  Trash2,
  Mail,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
} from "lucide-react";

type UserDetail = {
  name: string;
  email: string;
  isEmailVerify: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // =============================
  // GET USERS
  // =============================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/Authencation/getusers`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =============================
  // SEARCH
  // =============================
  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return users;

    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
    );
  }, [users, search]);

  // =============================
  // DELETE USER
  // =============================
  const handleDelete = async (email: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${email}?`
    );

    if (!confirmed) return;

    try {
      setDeletingEmail(email);
      setError("");

      const response = await fetch(
        `${API_URL}/Authencation/deleteuser/${encodeURIComponent(email)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove user immediately from UI
      setUsers((previous) =>
        previous.filter((user) => user.email !== email)
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete user.");
    } finally {
      setDeletingEmail(null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--on-primary)]">
            <Users size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Users
            </h1>

            <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
              Manage registered readers
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-4 py-3 text-sm text-[var(--error)]">
            <span>{error}</span>

            <button
              onClick={() => setError("")}
              className="p-1"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* SEARCH */}
        <div className="mb-6 rounded-2xl bg-[var(--surface-container-lowest)] p-4 shadow-sm">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] py-3 pl-12 pr-4 outline-none transition focus:border-[var(--primary)]"
            />
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="overflow-hidden rounded-2xl bg-[var(--surface-container-lowest)] shadow-sm">

          {/* TABLE HEADER */}
          <div className="border-b border-[var(--surface-container)] px-6 py-5">
            <h2 className="font-semibold">
              All Readers
            </h2>

            <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
              {filteredUsers.length} user
              {filteredUsers.length !== 1 ? "s" : ""}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 px-6 py-16 text-[var(--on-surface-variant)]">
              <Loader2
                size={20}
                className="animate-spin"
              />

              Loading users...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Users
                size={40}
                className="mx-auto mb-3 text-[var(--outline)]"
              />

              <p className="font-medium">
                No users found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="bg-[var(--surface-container-low)] text-left text-sm">

                    <th className="px-6 py-4 font-semibold">
                      User
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Email
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Email Status
                    </th>

                    <th className="px-6 py-4 text-right font-semibold">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.email}
                      className="border-t border-[var(--surface-container)] transition hover:bg-[var(--surface-container-low)]"
                    >

                      {/* NAME */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] font-semibold text-[var(--on-primary)]">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>

                          <span className="font-medium">
                            {user.name}
                          </span>

                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-[var(--on-surface-variant)]">
                          <Mail size={16} />
                          {user.email}
                        </div>
                      </td>

                      {/* EMAIL VERIFIED */}
                      <td className="px-6 py-4">

                        {user.isEmailVerify ? (
                          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-container-high)] px-3 py-1 text-sm">
                            <CheckCircle2
                              size={16}
                              className="text-green-600"
                            />
                            Verified
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-container-high)] px-3 py-1 text-sm">
                            <XCircle
                              size={16}
                              className="text-[var(--error)]"
                            />
                            Not Verified
                          </div>
                        )}

                      </td>

                      {/* DELETE */}
                      <td className="px-6 py-4">

                        <div className="flex justify-end">

                          <button
                            onClick={() =>
                              handleDelete(user.email)
                            }
                            disabled={
                              deletingEmail === user.email
                            }
                            className="flex items-center gap-2 rounded-lg bg-[var(--error)] px-4 py-2 text-sm font-medium text-[var(--on-error)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingEmail === user.email ? (
                              <>
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                                Deleting...
                              </>
                            ) : (
                              <>
                                <Trash2 size={16} />
                                Delete
                              </>
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
        </div>
      </div>
    </div>
  );
}