import { Loader2 } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";

export function Button({
  children,
  className = "",
  spinnerClass = "",
  ...props
}: {
  children: React.ReactNode;
  className: string;
  spinnerClass: string;
  props?: ButtonHTMLAttributes<string>;
}) {
  if (!props) props = {};
  const { disabled } = props;

  return (
    <button
      className={`rounded-md border-white border-[1px] px-6 py-2 bg-white text-dark-1 ${className} ${
        disabled && "!py-2 !px-8"
      } transition-all duration-300 hover:bg-dark-1 hover:text-white`}
      {...props}
    >
      {disabled ? (
        <Loader2 className={`cursor-pointer h-4 w-4 animate-spin ${spinnerClass}`} />
      ) : (
        children
      )}
    </button>
  );
}
