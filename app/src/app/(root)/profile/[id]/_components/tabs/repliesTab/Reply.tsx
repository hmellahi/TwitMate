import { ProfileImg } from "@/components/shared/ProfileImg";
import { Thread, User } from "@prisma/client";
import Link from "next/link";
import { Button } from "../../../../../../../components/ui/Button";

export default function Reply({
  reply,
  author,
  isSmall = false,
  className = "",
}: {
  reply: Thread;
  author?: User;
  isSmall?: boolean;
  className: string;
}) {
  if (!author) author = reply.author;
  return (
    <div className={`flex justify-between text-white items-center ${className}`}>
      <div className="flex gap-3 items-center">
        <ProfileImg user={author} className="!h-12 !w-12" />
        <div>
          <div className="flex items-center">
            <p className={isSmall ? "text-small-medium" : ""}>{author.name} </p>
            <div className="rounded-full w-1 h-1 bg-[#A0A0A0] ml-2"></div>
            <span className="text-gray-4 ml-2">2d</span>
          </div>
          <p className="text-gray-4 text-small-regular sm:text-base-regular">
            Replied to
            <Link href={`/thread/${reply.parentId}`} className="text-primary-500 text-bold">
              {" "}
              thread
            </Link>
          </p>
        </div>
      </div>
      <Link href={`/thread/${reply.parentId}`}>
        <Button className={`px-8 ${isSmall && "text-small-medium"}`}>View</Button>
      </Link>
    </div>
  );
}
