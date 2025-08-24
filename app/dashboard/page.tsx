"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, FolderGit2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", slug: undefined, icon: LayoutDashboard },
  { name: "Blogs", href: "/dashboard/blogs", slug: "blogs", icon: FileText },
  { name: "Projects", href: "/dashboard/projects", slug: "projects", icon: FolderGit2 },
  { name: "Tutorials", href: "/dashboard/tutorials", slug: "tutorials", icon: BookOpen },
];

export default function DashboardSlugPage() {
  const params = useParams();
  const pathname = usePathname();

  // Get slug (undefined if /dashboard)
  const slug = params?.slug as string | undefined;

  // Find the active item
  const activeItem =
    sidebarItems.find((item) =>
      slug ? item.slug === slug : item.slug === undefined
    ) || sidebarItems[0];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 flex flex-col">
        <div className="text-2xl font-bold mb-6">My Dashboard</div>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-base font-medium transition hover:bg-accent",
                  pathname === item.href ? "bg-accent" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Container */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-4">{activeItem.name}</h1>

        {/* Render based on slug */}
        {activeItem.slug === undefined && (
          <p className="text-muted-foreground">Welcome to your Dashboard overview 🚀</p>
        )}

        {activeItem.slug === "blogs" && (
          <div className="space-y-2">
            <p className="text-muted-foreground">Here are your latest blogs ✍️</p>
            {/* Blog component goes here */}
          </div>
        )}

        {activeItem.slug === "projects" && (
          <div className="space-y-2">
            <p className="text-muted-foreground">Manage your projects 🛠️</p>
            {/* Projects component goes here */}
          </div>
        )}

        {activeItem.slug === "tutorials" && (
          <div className="space-y-2">
            <p className="text-muted-foreground">Browse tutorials 📚</p>
            {/* Tutorials component goes here */}
          </div>
        )}
      </main>
    </div>
  );
}
