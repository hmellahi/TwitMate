import { appName, sidebarLinks } from "@/constants";
import dynamic from "next/dynamic";
import Link from "next/link";
import LogoImg from "../LogoImg";
import { SidebarLink } from "../SidebarLink";

const LeftSidebarBottom = dynamic(() => import("./LeftSidebarBottom").then((module) => module), {
  ssr: false,
});

export default function LeftSidebar({ currentUserId }) {
  return (
    <div className="custom-scrollbar leftsidebar text-white h-[calc(100vh)] py-10 lg:w-[17rem]">
      <div className="flex flex-col gap-4 px-5">
        <Link href="/" className="hidden sm:flex items-center gap-3 px-3 mb-4">
          <LogoImg />
          <span className="max-lg:hidden">{appName}</span>
        </Link>
        {sidebarLinks.map((sidebarLink, index) => (
          <SidebarLink
            key={index}
            sidebarLink={sidebarLink}
            currentUserId={currentUserId}
          ></SidebarLink>
        ))}
      </div>
      <LeftSidebarBottom></LeftSidebarBottom>
    </div>
  );
}
