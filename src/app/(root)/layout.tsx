import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
import AppHeader from "@/components/shared/AppHeader";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar/RightSidebar";
import BottomBar from "@/components/shared/BottomBar";
import { fetchUser } from "@/server-actions/user/user.actions";
import { redirect } from "next/navigation";
import useFeedStore from "@/app/(root)/(feed)/_store/feedsStore";
import useUserStore from "@/store/userStore";

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
        className={`sm:px-[2rem] md:px-[2rem] xl:px-[6rem] 2xl:px-[13rem] h-screen`}
      >
        <AppHeader />
        <main className="flex items-start justify-center overflow-hiddden">
          <LeftSidebar currentUser={user} />
          <section className="main-container sm:pyd-0">
            <div className="w-full py-20 sm:py-16">{children}</div>
          </section>
          <RightSidebar/>
        </main>
        <BottomBar />
      </div>
    </ClerkProvider>
  );
}
