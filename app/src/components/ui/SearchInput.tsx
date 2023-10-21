"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "../svgs";
import { Input } from "./Input";

export function SearchInput({
  keyword,
  route,
  className,
  placeholder,
}: {
  keyword: string;
  route: string;
  className?: string;
  placeholder: string;
}) {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    const searchUsersDebounce = setTimeout(() => {
      clearTimeout(searchUsersDebounce);
      if (searchKeyword) {
        router.push(`/${route}?query=${searchKeyword}`);
      } else {
        router.push(`/${route}`);
      }
    }, 300);

    return () => clearTimeout(searchUsersDebounce);
  }, [searchKeyword]);

  return (
    <div className={`${className} relative w-full rounded-md border-0`}>
      <Search
        width="30"
        height="30"
        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-2 left-5"
      />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-16 pr-4 py-6 text-white no-focus bg-gray-3 border-0 !placeholder-gray-2"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  );
}
