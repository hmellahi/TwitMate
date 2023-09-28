"use client";

import { sidebarLinks } from "@/constants";
import { User } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SidebarLink } from "./SidebarLink";
import LogoImg from "./logoImg";

const OrganizationSwitcher = dynamic(
  () => import("@clerk/nextjs").then((module) => module.OrganizationSwitcher),
  {
    ssr: false,
  }
);

const SignOutButton = dynamic(
  () => import("@clerk/nextjs").then((module) => module.SignOutButton),
  {
    ssr: true,
  }
);

const SignedIn = dynamic(
  () => import("@clerk/nextjs").then((module) => module.SignedIn),
  {
    ssr: true,
  }
);

export default function LeftSidebar({ currentUser }: { currentUser: User }) {
  const router = useRouter();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="custom-scrollbar leftsidebar text-white h-[calc(100vh)] py-10 lg:w-[17rem]">
      <div className="flex flex-col gap-4 px-5">
        <Link href="/" className="hidden sm:flex items-center gap-3 px-3 mb-4">
          <LogoImg />
          <span className="max-lg:hidden">Threads</span>
        </Link>
        {sidebarLinks.map((sidebarLink, index) => {
          if (sidebarLink.route == "/profile")
            sidebarLink.route += `/${currentUser.id}`;
          return (
            <SidebarLink sidebarLink={sidebarLink} key={index}></SidebarLink>
          );
        })}
      </div>
      <div className="flex flex-col gap-y-4">
        <OrganizationSwitcher
          currentUser={currentUser}
          organizationProfileUrl="/"
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: "py-2 px-8 w-[17rem] max-lg:w-[1rem]",
              organizationSwitcherTriggerIcon: "max-lg:hidden",
              userPreviewTextContainer: "max-lg:hidden",
            },
          }}
        />
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
