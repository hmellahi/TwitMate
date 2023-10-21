import Activity from "@/app/(root)/activity/_components/Activity";
import { getCurrentUserId } from "@/lib/get-current-user";
import { getUserActivity } from "@/server-actions/activity/activity.actions";

export default async function page() {
  const userId = getCurrentUserId();
  if (!userId) return null;

  let userActivity = await getUserActivity({ userId });

  return (
    <div className="text-white">
      <h3 className="text-heading1-bold text-[40px] mb-10">Activity</h3>
      <div className=" flex flex-col gap-4">
        {userActivity.map((activity, index) => {
          return (
            <Activity
              key={index}
              activity={activity}
              className="border-b-2 border-light-gray pb-3"
            ></Activity>
          );
        })}
      </div>
    </div>
  );
}
