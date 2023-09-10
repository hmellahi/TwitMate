"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
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
import { useOrganization } from "@clerk/nextjs";
import MediaUploader from "../shared/Thread/MediaUploader";
import { UploadFileResponse } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadThing";
import useAutosizeTextArea from "@/lib/hooks/useAutosizeTextArea";

export default function PostThread({
  userId,
  postBtnClass = "",
}: {
  userId: string;
  postBtnClass: string;
}) {
  const router = useRouter();
  // const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { organization } = useOrganization();
  const [threadImages, setThreadImages] = useState<Array<File>>([]);
  const { startUpload } = useUploadThing("media");

  const form = useForm({
    resolver: zodResolver(CreateThreadValidation),
    defaultValues: {
      text: "",
      community: undefined,
    },
  });

  // console.log(form.getValues("text"), textAreaRef.current);

  async function onSubmit(values: z.infer<typeof CreateThreadValidation>) {
    try {
      let uploadedImages = await startUpload(threadImages);
      let uploadedImagesUrls: Array<string> = [];
      if (uploadedImages) {
        uploadedImagesUrls = uploadedImages.map(
          (uploadedImage: UploadFileResponse) => uploadedImage.url
        );
      }
      await createThread({
        userId,
        ...values,
        pathToRevalidate: "/",
        communityId: organization?.id,
        images: uploadedImagesUrls,
      });

      form.setValue("text", "");
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 mt-4">
              <FormControl className="text-gray-200 text-base-semibold flex-1">
                <Textarea
                  rows={4}
                  placeholder="Say Something..."
                  className="account-form_input no-focus text-body1-normal"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MediaUploader images={threadImages} setImages={setThreadImages} />
        <Button type="submit" className={`${postBtnClass}`}>
          Post
        </Button>
      </form>
    </Form>
  );
}
