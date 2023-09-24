"use client";

import { sidebarLinks } from "@/constants";
import { MobileSidebarLink } from "./MobileSidebarLink";

export default function BottomBar() {
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((sidebarLink, index) => (
          <MobileSidebarLink
            sidebarLink={sidebarLink}
            key={index}
          ></MobileSidebarLink>
        ))}
      </div>
    </section>
  );
}
