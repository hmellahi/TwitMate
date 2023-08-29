import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
import AppHeader from "@/components/shared/AppHeader";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import BottomBar from "@/components/shared/BottomBar";

export const metadata = {
  title: "Layout",
};

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <body className={inter.className}>
        <AppHeader />
        <main className="flex">
          <LeftSidebar />
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
