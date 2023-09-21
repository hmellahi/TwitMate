import { Delete } from "@/src/components/svgs";
import { deleteThread } from "@/src/lib/actions/thread.actions";
import { useRouter } from "next/navigation";
import React from "react";

export default function ThreadActions({
  authorId,
  threadId,
  path,
  onDelete,
}: {
  path: string;
  authorId: string;
  threadId: string;
  onDelete?: Function;
}) {
  const removeThread = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.({ path, authorId, threadId });
  };

  return (
    <div className="icon-hover">
      <Delete
        width={19}
        height={19}
        className="text-red-500"
        onClick={removeThread}
      />
    </div>
  );
}
