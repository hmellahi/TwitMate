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
      className={`rounded-md hover:bg-dark-1 border-white  border-[1px] hover:text-white px-6 py-2  bg-white text-dark-1 ${className}`}
    >
      {children}
    </button>
  );
}
