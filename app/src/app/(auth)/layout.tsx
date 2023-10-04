import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";

export const metadata = {
  title: "Threads",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="flex justify-center items-center bg-dark-1 w-full h-[100vh] overflow-y-auto">
        {children}
      </div>
    </ClerkProvider>
  );
}
