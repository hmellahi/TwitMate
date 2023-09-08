import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
import AppHeader from "@/components/shared/AppHeader";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar/RightSidebar";
import BottomBar from "@/components/shared/BottomBar";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Threads",
};

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AppHeader />
        <main className="flex">
          <LeftSidebar currentUser={user} />
          <section className="main-container">
            <div className="w-full">{children}</div>
          </section>
          <RightSidebar />
        </main>
        <BottomBar />
      </body>
    </ClerkProvider>
  );
}
