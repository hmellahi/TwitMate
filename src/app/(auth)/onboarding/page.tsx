import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/server-actions/user/user.actions";
import { UserData } from "@/types/user";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user: User | null = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
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
        <p className="mt-4 mb-10">Complete your profile to use Threads</p>
        <div className=" mt-4 w-full rounded-md ">
          <AccountProfile btnTitle="Submit" user={userData} />
        </div>
      </main>
    </div>
  );
}
