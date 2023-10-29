import AppHeader from "@/components/shared/AppHeader";
import BottomBar from "@/components/shared/bottom-bar/BottomBar";
import LeftSidebar from "@/components/shared/left-sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/right-sidebar/RightSidebar";
import Toaster from "@/components/ui/toast/Toaster";
import { appName } from "@/constants";
import { getCurrentUser } from "@/lib/get-current-user";
import { ClerkProvider } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import "../globals.css";

export const metadata = {
  title: appName,
};

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <ClerkProvider>
      <Toaster />
      <div className={`sm:px-[2rem] md:px-[2rem] xl:px-[6rem] 2xl:px-[4rem] h-screen`}>
        <AppHeader />
        <main className="flex items-start justify-center overflow-hiddden">
          <LeftSidebar/>
          <section className="main-container">
            <div className="w-full py-20 md:py-16">{children}</div>
          </section>
          <RightSidebar currentUserId={user.id} />
        </main>
        <BottomBar />
      </div>
    </ClerkProvider>
  );
}
