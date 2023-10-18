import { appName, sidebarLinks } from "@/constants";
import { User } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SidebarLink } from "../SidebarLink";
import LogoImg from "../logoImg";

const LeftSidebarBottom = dynamic(() => import("./LeftSidebarBottom").then((module) => module), {
  ssr: false,
});

export default function LeftSidebar({ currentUser }: { currentUser: User }) {
  if (!currentUser) {
    return null;
  }

  return (
    <div className="custom-scrollbar leftsidebar text-white h-[calc(100vh)] py-10 lg:w-[17rem]">
      <div className="flex flex-col gap-4 px-5">
        <Link href="/" className="hidden sm:flex items-center gap-3 px-3 mb-4">
          <LogoImg />
          <span className="max-lg:hidden">{appName}</span>
        </Link>
        {sidebarLinks.map((sidebarLink, index) => {
          if (sidebarLink.route == "/profile") sidebarLink.route += `/${currentUser.id}`;
          return <SidebarLink sidebarLink={sidebarLink} key={index}></SidebarLink>;
        })}
      </div>
      <LeftSidebarBottom></LeftSidebarBottom>
    </div>
  );
}
