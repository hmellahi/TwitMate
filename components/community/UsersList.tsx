import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { classNames } from "uploadthing/client";

export function UsersList({
  users,
  className = "",
}: {
  users: User[];
  className?: string;
}) {
  if (!users) {
    return null;
  }
  return (
    <div className={`inline-flex row-reverse ${className}`}>
      {users?.map((user, index) => (
        <Link
          href={`/profile/${user.id}`}
          key={index}
          className={`w-7 h-7 relative rounded-full overflow-hidden  avatar -ml-[.6rem] border-2 border-dark-2
          `}
        >
          <Image
            src={user.image}
            alt={`Avatar ${index + 1}`}
            className="w-full h-full object-cover block"
            fill
          />
        </Link>
      ))}
    </div>
  );
}
