"use client";

import { sidebarLink } from "@/types/sidebar-link";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "../svgs";

export function SidebarLink({
  sidebarLink,
  currentUserId,
}: {
  sidebarLink: sidebarLink;
  currentUserId: string;
}) {
  const { route } = sidebarLink;
  const pathname = usePathname();
  const isActive =
    pathname === route ||
    (route.startsWith("/profile") && pathname === `/profile/${currentUserId}`);

  return (
    <Link
      href={sidebarLink.route}
      className={`leftsidebar_link hover_effect ${isActive && "bg-primary-500"}`}
    >
      {sidebarLink.imgURL.includes("search") ? (
        <Search width="20" height="20"></Search>
      ) : (
        <Image src={sidebarLink.imgURL} alt="img" width="24" height="20"></Image>
      )}
      <p className="max-lg:hidden text-base-regular">{sidebarLink.label}</p>
    </Link>
  );
}
