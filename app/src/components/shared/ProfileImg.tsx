"use client";

import { PROFILE_IMG_SIZE } from "@/constants";
import useRedirect from "@/lib/hooks/useRedirect";
import Image from "next/image";

export function ProfileImg({
  user,
  index = 0,
  className = "",
  loading = "lazy",
  size = PROFILE_IMG_SIZE,
}) {
  const { redirectToProfile } = useRedirect();
  const dimentions = {
    width: size,
    height: size,
  };

  return (
    <button
      onClick={(event) => redirectToProfile(event, user.id)}
      // role="link"
      // tabIndex={0}
      // aria-label={`Profile of ${user.name}`}
      className={`${className} w-7 h-7 relative rounded-full overflow-hidden avatar border-2 border-dark-2 transition-opacity group hover:opacity-100 hover:bg-opacity-75`}
    >
      <Image
        src={user.image}
        alt={`Avatar ${index + 1}`}
        className="w-full h-full object-cover block group-hover:scale-105"
        loading={loading}
        {...dimentions}
      />
      <div className="w-full h-full absolute top-0 left-0 opacity-0 bg-gray-800 group-hover:opacity-60 transition-opacity"></div>
    </button>
  );
}
