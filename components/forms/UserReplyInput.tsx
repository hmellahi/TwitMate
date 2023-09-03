"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { z } from "zod";
import { CreateThreadValidation } from "@/lib/validations/thread";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { createThread } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";

export default function UserReplyInput({
  user,
  parentThreadId,
}: {
  user: User;
  parentThreadId: string;
}) {
  const form = useForm({
    resolver: zodResolver(CreateThreadValidation),
    defaultValues: {
      text: "",
    },
  });

  const pathname = usePathname();

  async function onSubmit(thread: z.infer<typeof CreateThreadValidation>) {
    await createThread({
      ...thread,
      userId: user.id,
      parentId: parentThreadId,
      pathToRevalidate: pathname,
    });
    form.setValue("text", "");
  }

  const userImage = user?.image || "";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 flex justify-between w-full mt-9 items-center"
      >
        <div className="">
          <div className="relative h-14 w-14 mt-8">
            <Image
              src={userImage}
              fill
              alt="avatar"
              className="rounded-full object-contain"
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full px-7">
              <FormControl className="text-gray-200 text-base-semibold flex-1">
                <Input
                  type="text"
                  placeholder="Comment...."
                  className=" no-focus bg-transparent border-0 text-white py-4"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500 rounded-full px-10">
          Reply
        </Button>
      </form>
    </Form>
  );
}
