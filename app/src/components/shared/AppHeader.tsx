import {
  OrganizationProfile,
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "./logoImg";
import { appName } from "@/constants";

export default function AppHeader() {
  return (
    <div className="topbar text-white flex flex-between md:hidden sm:pr-14">
      <Link href="/" className="flex items-center gap-4">
        <LogoImg />
        {appName}
      </Link>

      <div className="flex gap-5 items-center lg:mr-[25rem]">
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <Image
                className="cursor-pointer"
                src="/assets/logout.svg"
                width="20"
                height="20"
                alt="logout"
              ></Image>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
