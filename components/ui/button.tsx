import React, { ButtonHTMLAttributes } from "react";

export function Button({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className: string;
  props?: ButtonHTMLAttributes<string>;
}) {
  if (!props) props = {};
  return (
    <button
      className={`rounded-md bg-dark-1 border-white border-[1px] text-white px-6 py-2  hover:bg-white hover:text-dark-1 ${className}`}
    >
      {children}
    </button>
  );
}
