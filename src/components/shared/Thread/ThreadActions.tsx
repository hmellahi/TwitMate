import { Delete } from "@/components/svgs";
import { PostDeletedToast } from "@/lib/toasts/showPostDeletedToast";
import { deleteThread } from "@/server-actions/thread/thread.actions";
import { useRouter } from "next/navigation";
import React from "react";
import { useToast } from "../../ui/Toast/use-toast";
import { ToastAction } from "../../ui/Toast/toast";
import { cn } from "@/lib/utils";

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
  const { toast } = useToast();

  const removeThread = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.({ path, authorId, threadId });
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[20rem] md:top-4 md:right-4 py-4"
      ),
      title: "The thread is deleted",
      // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
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
