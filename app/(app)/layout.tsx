"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  console.log("User in AppLayout:", user);

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="w-full bg-base-200 border-b">
          <div className="navbar max-w-7xl mx-auto px-4">
            {/* Mobile menu button */}
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost"
              >
                <MenuIcon />
              </label>
            </div>

            {/* Logo */}
            <div className="flex-1">
              <button
                onClick={() => router.push("/")}
                className="btn btn-ghost text-2xl font-bold"
              >
                Cloudinary Showcase
              </button>
            </div>

            {/* User Section */}
            {user && (
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={user.imageUrl}
                      alt={
                        user.username ||
                        user.emailAddresses[0]?.emailAddress
                      }
                    />
                  </div>
                </div>

                <span className="text-sm font-medium hidden sm:block">
                  {user.username ||
                    user.emailAddresses[0]?.emailAddress}
                </span>

                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost btn-circle"
                >
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-base-100">
          {children}
        </main>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label
          htmlFor="sidebar-drawer"
          className="drawer-overlay"
        ></label>

        <aside className="w-64 bg-base-200 min-h-full p-4">
          <ul className="menu space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive ? "active" : ""}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}