"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/Textarea";
import { z } from "zod";
import { CreateThreadValidation } from "@/lib/validations/thread";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { createComment } from "@/lib/actions/thread.actions";

export default function UserReplyInput({
  user,
  parentThreadId,
}: {
  user: User;
  parentThreadId: string;
}) {
  console.log({ user });
  // const router = useRouter();
  // const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CreateThreadValidation),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(thread: z.infer<typeof CreateThreadValidation>) {
    await createComment({ userId, parentThreadId, thread });
    console.log(thread);
  }

  return (
    // <div className="p-4 flex justify-between w-full mt-10">
    //   <div className="flex grow gap-2">
    //     {/* {user.image} */}
    //     <Image
    //       src={user.image}
    //       width="46"
    //       height="46"
    //       alt="avatar"
    //       className="rounded-full object-contain"
    //     />
    //     {/* placeholder="say something" */}
    //     <Input
    //       type="text"
    //       placeholder="What's on your mind"
    //       className=" no-focus bg-transparent border-0 text-white"
    //     />
    //   </div>
    //   <div className="">
    //     <Button className="bg-primary-500 rounded-full px-10">Reply</Button>
    //   </div>
    // </div>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 flex justify-between w-full mt-9 items-center"
      >
        <Image
          src={user.image}
          width="46"
          height="46"
          alt="avatar"
          className="rounded-full object-contain mt-8"
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full px-7">
              <FormControl className="text-gray-200 text-base-semibold flex-1">
                {/* <Textarea
                  rows={1}
                  placeholder="Enter your bio"
                  className=" no-focus bg-transparent bg-white border-0 text-white"
                  {...field}
                /> */}
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
