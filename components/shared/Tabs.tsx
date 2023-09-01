"use client";

import { Tab } from "@/types/Tab";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const isActive = (tab: Tab) => tab.link == usePathname();
  return (
    <div className="w-full flex justify-center items-center">
      {tabs.map((tab) => (
        <Link href={tab.label} className={isActive(tab) ? "active tab" : "tab"}>
          <Image
            src={tab.icon}
            width={30}
            height={30}
            alt="tab"
            className="object-contain"
          />
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
