import Activity from "@/app/(root)/profile/[id]/_components/activity/Activity";
import { getUserActivity } from "@/lib/actions/activity.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

export default async function page() {
  const user = await currentUser();
  if (!user) return null;
  let userActivity = await getUserActivity({ userId: user.id });
  console.log({ userActivity });
  return (
    <div className="text-white">
      <h3 className="text-body-normal text-[40px] mb-10">Activity</h3>
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
