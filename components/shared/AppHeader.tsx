import {
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

      <div className="flex gap-5 items-center">
        {/* <UserButton afterSignOutUrl="/" /> */}
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
