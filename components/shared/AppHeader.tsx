import {
  OrganizationProfile,
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";

export default function AppHeader() {
  return (
    <div className="topbar text-white flex flex-between">
      <div className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width="30" height="30" />
        Threads
      </div>

      <div className="flex gap-5 items-center lg:mr-[25rem]">
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
            layout: {
              logoLinkUrl:
                "http://localhost:3000/_next/image?url=https%3A%2F%2Fuploadthing.com%2Ff%2F5734d3d5-f1f5-47be-911a-e9b06b51988a_elon.jpeg&w=2048&q=75",
              logoImageUrl:
                "http://localhost:3000/_next/image?url=https%3A%2F%2Fuploadthing.com%2Ff%2F5734d3d5-f1f5-47be-911a-e9b06b51988a_elon.jpeg&w=2048&q=75",
            },
          }}
        />
        {/* logoLinkUrl */}
        {/* <OrganizationProfile routing="path" path="/" /> */}
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
