"use client";

import { sidebarLink } from "@/types/SidebarLink";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function SidebarLink({ sidebarLink }: { sidebarLink: sidebarLink }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    pathname === sidebarLink.route ||
    (pathname.includes(sidebarLink.route) && sidebarLink.route != "/");

  return (
    <Link
      href={sidebarLink.route}
      className={`leftsidebar_link dlg:flex jdustify-center ${
        isActive && "bg-primary-500"
      }`}
    >
      <Image src={sidebarLink.imgURL} alt="img" width="20" height="20"></Image>
      <p className="max-lg:hidden">{sidebarLink.label}</p>
    </Link>
  );
}
