import AccountProfile from "@/src/components/forms/AccountProfile";
import { fetchUser } from "@/src/lib/actions/user.actions";
import { UserData } from "@/src/types/User";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export default async function Home() {
  const user: User | null = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  const userData: UserData = {
    id: user?.id,
    objectId: userInfo?.id,
    username: userInfo?.username || user?.username || "",
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <div className="h-full w-12/12 sm:w-11/12 md:w-8/12 lg:w-6/12">
      <main className="px-10 py-20 text-white ">
        <div className="head-text">Onboarding</div>
        <p className="mt-4 mb-10">Complete your profile to use Threads</p>
        <div className="bg-dark-2 p-10 mt-4 w-full">
          <AccountProfile btnTitle="Submit" user={userData} />
        </div>
      </main>
    </div>
  );
}
