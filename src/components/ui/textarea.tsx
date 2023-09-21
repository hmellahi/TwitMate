import * as React from "react";

import { cn } from "@/src/lib/utils";
import useAutosizeTextArea from "@/src/lib/hooks/useAutosizeTextArea";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    // console.log(textAreaRef.current?.value);
    useAutosizeTextArea(textAreaRef.current, textAreaRef?.current?.value);

    return (
      <textarea
        className={cn(
          "resize-none block h-audto  min-h-[80] w-full rounded-md border border-slate-200  bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800  dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        )}
        ref={textAreaRef}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
