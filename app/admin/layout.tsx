import AdminHeader from "./components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <AdminHeader></AdminHeader>

      <main>
        {children}
      </main>
    </div>
  );
}