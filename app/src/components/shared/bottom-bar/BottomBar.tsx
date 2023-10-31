import { sidebarLinks } from "@/constants";
import { MobileSidebarLink } from "./BottomBarLink";

export default function BottomBar({ currentUserId }) {
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((sidebarLink, index) => (
          <MobileSidebarLink
            currentUserId={currentUserId}
            sidebarLink={sidebarLink}
            key={index}
          ></MobileSidebarLink>
        ))}
      </div>
    </section>
  );
}
