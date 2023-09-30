"use client";

import { sidebarLink } from "@/types/sidebar-link";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "../svgs";

export function MobileSidebarLink({ sidebarLink }: { sidebarLink: sidebarLink }) {
  const pathname = usePathname();
  const isActive =
    pathname === sidebarLink.route ||
    (pathname.includes(sidebarLink.route) && sidebarLink.route !== "/");

  return (
    <Link
      key={sidebarLink.route}
      href={sidebarLink.route}
      className={`text-white bottombar_link hover_effect ${isActive && "bg-primary-500"}`}
    >
      {sidebarLink.imgURL.includes("search") ? (
        <Search width="20" height="20"></Search>
      ) : (
        <Image src={sidebarLink.imgURL} alt="img" width="20" height="20"></Image>
      )}
      <p className="max-sm:hidden text-white text-subtle-medium">
        {sidebarLink.label.split(" ")[0]}
      </p>
    </Link>
  );
}
