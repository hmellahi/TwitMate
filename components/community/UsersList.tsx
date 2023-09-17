import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function UsersList({
  users,
  className = "",
  children,
}: {
  users: User[];
  className?: string;
  children: React.ReactNode;
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
          className={`w-6 h-6 relative rounded-full overflow-hidden  avatar -ml-[.6rem] border-2 border-dark-2
          `}
        >
          {children}
          <Image
            src={user.image}
            alt={`Avatar ${index + 1}`}
            className="w-full h-full object-cover block"
            fill
            loading="lazy"
          />
        </Link>
      ))}
    </div>
  );
}
