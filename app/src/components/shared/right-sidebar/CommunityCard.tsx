import { camelToSnakeCase } from "@/lib/utils";
import { Community } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/Button";

export default function CommunityCard({
  community,
  isSmall = false,
}: {
  community: Community;
  isSmall: boolean;
}) {
  return (
    <div className="flex justify-between text-white items-center gap-x-12">
      <div className="flex gap-2 items-center">
        <Link href={`/community/${community.id}`} className="w-12 h-12 relative">
          <Image
            fill
            alt="avatar"
            src={community.image || ""}
            className="cursor-pointer object-cover rounded-full"
            sizes="100px"
          />
        </Link>
        <div>
          <p className={isSmall ? "text-small-medium" : ""}>{community.name}</p>
          <p className="text-gray-300 text-small-medium">@{camelToSnakeCase(community.name)}</p>
        </div>
      </div>

      <Link href={`/community/${community.id}`}>
        <Button className={`text-small-medium`}>View</Button>
      </Link>
    </div>
  );
}
