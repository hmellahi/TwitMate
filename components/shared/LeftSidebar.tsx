"use client";

import { sidebarLinks } from "@/constants";
import { SidebarLink } from "./SidebarLink";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LeftSidebar() {
  const router = useRouter();

  return (
    <div className="custom-scrollbar leftsidebar text-white">
      <div className="flex flex-col gap-4 px-5">
        {sidebarLinks.map((sidebarLink, index) => (
          <SidebarLink sidebarLink={sidebarLink} key={index}></SidebarLink>
        ))}
      </div>
      <div>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex px-10 gap-4 cursor-pointer">
              <Image
                className="cursor-pointer"
                src="/assets/logout.svg"
                width="23"
                height="23"
                alt="logout"
              ></Image>
              <p className="max-lg:hidden"> Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
}
