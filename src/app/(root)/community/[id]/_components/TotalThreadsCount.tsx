"use client";

import { useStore } from "zustand";
import useCommunityStore from "../_store/communityStore";

export default function TotalThreadsCount() {
  let { totalCount } = useStore(useCommunityStore);

  return totalCount;
}
