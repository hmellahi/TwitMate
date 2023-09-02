"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/Textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.actions";
import { CreateThreadValidation } from "@/lib/validations/thread";

export default function PostThread({ userId }: { userId: string }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CreateThreadValidation),
    defaultValues: {
      text: "",
      community: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof CreateThreadValidation>) {
    await createThread({ userId, ...values });
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Bio</FormLabel>
              <FormControl className="text-gray-200 text-base-semibold flex-1">
                <Textarea
                  rows={7}
                  placeholder="Enter your bio"
                  className="account-form_input no-focus text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500 w-full">
          Post
        </Button>
      </form>
    </Form>
  );
}
