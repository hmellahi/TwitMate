"use client";

import { SignOutButton, SignedIn } from "@clerk/clerk-react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LeftSidebarBottom() {
  const router = useRouter();

  const onLogout = async () => {
    router.push("/sign-in");
  };

  return (
    <div className="flex flex-col gap-y-4">
      <OrganizationSwitcher
        organizationProfileUrl="/"
        appearance={{
          baseTheme: dark,
          elements: {
            rootBox: "py-2 px-8 w-[10rem] max-lg:w-[1rem]",
            organizationSwitcherTriggerIcon: "max-lg:hidden",
            userPreviewTextContainer: "max-lg:hidden",
            organizationPreviewMainIdentifier__organizationSwitcher: "max-lg:hidden",
          },
        }}
      />
      <SignedIn>
        <SignOutButton signOutCallback={onLogout}>
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
  );
}
