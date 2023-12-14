"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { signIn, setActive } = useSignIn();

  const router = useRouter();

  const signInWithDemoAccount = async () => {
    try {
      const result = await signIn?.create({
        identifier: "test@acc.com",
        password: "test",
      });

      if (result?.status === "complete") {
        await setActive?.({ session: result.createdSessionId });
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (e) {
      console.log(e)
    }

    router.push("/");
  };

  useEffect(() => {
    signInWithDemoAccount();
  });
  return (
    <div>
      <button
        type="button"
        className="bg-indigo-500 text-white px-4 py-4 rounded-md items-center flex"
        disabled
      >
        <svg
          className="animate-spin -ml-1 mr-2 h-7 w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Signing in with a demo account...
      </button>
    </div>
  );
}
