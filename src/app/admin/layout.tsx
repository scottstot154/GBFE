import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-[220px_1fr]">
      <aside className="space-y-3">
        <h2 className="text-sm font-medium text-foreground/60">Admin</h2>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className="block rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/collections"
            className="block rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition"
          >
            Collections
          </Link>
          <Link
            href="/admin/orders"
            className="block rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition"
          >
            Orders
          </Link>
          <Link
            href="/admin/items"
            className="block rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition"
          >
            Items
          </Link>
        </nav>
      </aside>

      <section>{children}</section>
    </div>
  );
}
