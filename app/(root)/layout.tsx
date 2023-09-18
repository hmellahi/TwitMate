import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
import AppHeader from "@/components/shared/AppHeader";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar/RightSidebar";
import BottomBar from "@/components/shared/BottomBar";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import useFeedStore from "@/state/feedsStore";
import useUserStore from "@/state/userStore";

export const metadata = {
  title: "Threads",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) return null;
  const userInfos = await fetchUser(user.id);
  if (!userInfos) return null;

  if (!userInfos.onboarded) {
    redirect("/onboarding");
  }

  return (
    <ClerkProvider>
      <div
        className={`sm:px-[2rem] md:px-[2rem] xl:px-[6rem] 2xl:px-[13rem] bg-dark-1`}
      >
        <AppHeader />
        <main className="flex items-start justify-center">
          <LeftSidebar currentUser={user} />
          <section className="main-container">
            <div className="w-full">{children}</div>
          </section>
          <RightSidebar />
        </main>
        <BottomBar />
      </div>
    </ClerkProvider>
  );
}
