import React from "react";
import { Members, Reply, Request } from "../svgs";

// Use unique and capitalized enum values
enum IconNames {
  Threads,
  Replies,
}

// Define the mapping between enum values and SVG components
const svgIcons = {
  threads: Reply,
  replies: Members,
  members: Members,
  requests: Request,
};

export default function SvgIcon({
  iconName,
  ...props
}: {
  iconName: IconNames;
  props: any;
}) {
  const Icon = svgIcons[iconName];
  if (!Icon) return null;
  return <Icon {...props} />;
}
