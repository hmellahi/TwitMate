import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "Threads",
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
        <div className="flex justify-center items-center bg-dark-1 w-full h-[100vh] overflow-y-auto">
          {children}
        </div>
      </body>
    </ClerkProvider>
  );
}
