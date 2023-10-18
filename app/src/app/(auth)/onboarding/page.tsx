import AccountProfile from "@/components/forms/AccountProfile";
import { appName } from "@/constants";
import { getCurrentUser } from "@/lib/get-current-user";
import { UserData } from "@/types/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const [user, userInfo] = await Promise.all([currentUser(), getCurrentUser()]);

  // console.log({ userInfo });
  if (userInfo?.onboarded) {
    redirect("/");
  }

  const userData: UserData = {
    id: user?.id,
    objectId: userInfo?.id,
    username: userInfo?.username || user?.username || "",
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <div className="h-full w-full fdlex justify-cednter sm:max-w-2xl">
      <main className="px-6 sm:px-10 py-20 text-white ">
        <div className="head-text">Onboarding</div>
        <p className="mt-4 mb-10">Complete your profile to use {appName}</p>
        <div className=" mt-4 w-full rounded-md ">
          <AccountProfile btnTitle="Submit" user={userData} />
        </div>
      </main>
    </div>
  );
}
