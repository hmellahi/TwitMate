import { Delete, ThreeDots } from "@/components/svgs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteThread } from "@/lib/actions/thread.actions";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import React from "react";

export default function ThreadActions({
  authorId,
  threadId,
  path,
}: {
  path: string;
  authorId: string;
  threadId: string;
}) {
  const removeThread = (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteThread({ path, authorId, threadId });
  };
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger>
    //     <div className="icon-hover">
    //       <ThreeDots width={30} height={30} className="no-focus" />
    //     </div>
    //     <DropdownMenuContent className="px-5 py-3 bg-[#181818] rounded-xl mr-20">
    //       <DropdownMenuLabel
    //         className="flex gap-2"
    //         onClick={() => deleteThread({ path, authorId, threadId })}
    //       >
    //         <Delete width={20} height={20} className="text-red-500" />
    //         <span className="text-red-500">Delete</span>
    //       </DropdownMenuLabel>
    //     </DropdownMenuContent>
    //   </DropdownMenuTrigger>
    // </DropdownMenu>
    <div className="icon-hover">
      <Delete
        width={22}
        height={22}
        className="text-red-500"
        onClick={removeThread}
      />
    </div>
  );
}
