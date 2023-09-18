"use client";
import React from "react";
import { User } from "@prisma/client";
import VirtualizedThreadsList from "./Thread/VirtualizedThreadsList";
import VirtualAndInfiniteScroll from "../VirtualAndInfiniteScroll";

export default function VirtualizedThreadsList({
  user,
  threads,
}: {
  user: User;
}) {
  return <VirtualAndInfiniteScroll />;
}
