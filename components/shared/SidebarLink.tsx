"use client";

import { sidebarLink } from "@/types/SidebarLink";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "../svgs";

export function SidebarLink({ sidebarLink }: { sidebarLink: sidebarLink }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    pathname === sidebarLink.route ||
    (pathname.includes(sidebarLink.route) && sidebarLink.route != "/");

  return (
    <Link
      href={sidebarLink.route}
      className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
    >
      {sidebarLink.imgURL.includes("search") ? (
        <Search width="20" height="20"></Search>
      ) : (
        <Image
          src={sidebarLink.imgURL}
          alt="img"
          width="24"
          height="20"
        ></Image>
      )}
      <p className="max-lg:hidden">{sidebarLink.label}</p>
    </Link>
  );
}
