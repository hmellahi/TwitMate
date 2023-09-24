import SuggestedCommunities from "./SuggestedCommunities";
import SuggestedUsers from "./SuggestedUsers";

export default function RightSidebar() {
  return (
    <section className="custom-scrollbar rightsidebar py-0 sm:py-10">
      <div className="flex flex-1 flex-col justify-start">
        <SuggestedCommunities />
      </div>
      <div className="flex flex-1 flex-col justify-start ">
        <SuggestedUsers />
      </div>
    </section>
  );
}
