import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          card: "!w-[100%] sm:w-full p-10",
          socialButtonsBlockButtonText:
            "text-subtle-semibold sm:text-small-regular",
        },
      }}
    />
  );
}
