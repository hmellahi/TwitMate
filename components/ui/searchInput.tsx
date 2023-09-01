"use client";

import Image from "next/image";
import { Input } from "./input";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

export function SearchInput({ keyword }: { keyword: string }) {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    const searchUsersDebounce = setTimeout(() => {
      clearTimeout(searchUsersDebounce);
      if (searchKeyword) router.push('/search' + "?query=" + searchKeyword);
      else router.push('/search');
    }, 700);

    return () => clearTimeout(searchUsersDebounce);
  }, [searchKeyword]);

  return (
    <div className="relative w-full">
      <Image
        src="/assets/search.svg"
        alt="logo"
        width="30"
        height="30"
        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-5"
      />
      <Input
        type="text"
        placeholder="Type the person username or name"
        className="pl-16 pr-4 bg-transparent py-6 text-white no-focus"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  );
}
