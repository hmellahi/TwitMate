import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export default async function Home() {
  const user: User | null = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName,
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <div className="bg-dark-1 h-full">
      <main className=" mx-auto px-10 bg-redd-200 max-w-3xl py-20 text-white ">
        <div className="head-text">Onboarding</div>
        <p className="mt-4 mb-10">Complete your profile to use Threads</p>
        <div className="bg-dark-2 p-10 mt-4 w-full">
          <AccountProfile btnTitle="onboarding" user={userData} />
        </div>
      </main>
    </div>
  );
}
