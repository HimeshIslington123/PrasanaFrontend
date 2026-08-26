"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import AdminHeader from "./components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;


    if (!user) {
      router.replace("/login");
      return;
    }

 
    if (user.role !== "Admin" && user.role !== "admin") {
      router.replace("/");
      return;
    }
  }, [user, loading, router]);


  if (loading) {
    return null;
  }


  if (!user) {
    return null;
  }

  // Don't render admin page for Reader/normal users
  if (user.role !== "Admin" && user.role !== "admin") {
    return null;
  }

  // User is an Admin
  return (
    <div className="admin-layout">
      <AdminHeader />

      <main>
        {children}
      </main>
    </div>
  );
}