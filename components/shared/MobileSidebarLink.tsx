"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileSidebarLink({ sidebarLink }) {
  const pathname = usePathname();
  const isActive =
    pathname === sidebarLink.route ||
    (pathname.includes(sidebarLink.route) && sidebarLink.route !== "/");

  return (
    <Link
      key={sidebarLink.route}
      href={sidebarLink.route}
      className={`bottombar_link ${isActive && "bg-primary-500"}`}
    >
      <Image src={sidebarLink.imgURL} alt="img" width="23" height="23"></Image>{" "}
      <p className="max-sm:hidden text-white text-subtle-medium">
        {sidebarLink.label.split(" ")[0]}
      </p>
    </Link>
  );
}
