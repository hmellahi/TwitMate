"use client";

import { useStore } from "zustand";
import useCommunityStore from "../_store/community-store";

export default function TotalThreadsCount() {
  let { totalCount } = useStore(useCommunityStore);

  return totalCount;
}
