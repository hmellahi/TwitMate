import { Button } from "@/components/ui/Button";
import { camelToSnakeCase } from "@/lib/utils";
import { Community } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { UsersList } from "../../../../components/shared/Thread/UsersList";

export default function CommunityCard({
  community,
  className,
}: {
  community: Community;
  className: string;
}) {
  return (
    <div
      className={`border-[1px] border-white text-white bg-dark-3 pt-7 pb-3 px-4 rounded-md ${className}`}
    >
      <div className="flex gap-4 items-center ">
        <Link href={`/community/${community.id}`} className="w-14 h-14 relative">
          <Image
            width={60}
            height={60}
            alt="avatar"
            src={community.image || ""}
            className="cursor-pointer object-cover rounded-full"
          />
        </Link>
        <div>
          <p>{community.name}</p>
          <p className="text-gray-300 text-small-medium">@{camelToSnakeCase(community.name)}</p>
          <p className="mt-2">{community.bio}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <Link href={`/community/${community.id}`}>
          <Button className={" px-5 !py-1"}>View</Button>
        </Link>
        <UsersList users={community.members}></UsersList>
      </div>
    </div>
  );
}
