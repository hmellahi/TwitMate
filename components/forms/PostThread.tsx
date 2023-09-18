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
import { CreateThreadValidation } from "@/lib/validations/thread";
import { useOrganization } from "@clerk/nextjs";
import MediaUploader from "../shared/Thread/MediaUploader";
import { UploadFileResponse } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadThing";
import useAutosizeTextArea from "@/lib/hooks/useAutosizeTextArea";
import Image from "next/image";
import MediaViewerWrapper from "../shared/Thread/MediaViewerWrapper";

export default function PostThread({
  userId,
  postBtnClass = "",
  redirectUrl,
  btnTitle = "Post",
  parentThreadId,
  userImage,
  className = "",
  createThreadHandler,
}: {
  userId: string;
  userImage: string;
  postBtnClass?: string;
  redirectUrl?: string;
  btnTitle?: string;
  parentThreadId?: string;
  className?: string;
  createThreadHandler: Function;
}) {
  const router = useRouter();

  const { organization } = useOrganization();
  const [threadImages, setThreadImages] = useState<Array<File>>([]);
  const { startUpload } = useUploadThing("media");

  const form = useForm({
    // resolver: (data) => {
    //   // const result = zodResolver(CreateThreadValidation)(data);
    //   // Custom validation logic
    //   if (
    //     threadImages.length <= 0 &&
    //     (!result.text || result.text.length < 3)
    //   ) {
    //     return {
    //       values: {},
    //       errors: {
    //         // text: "Please upload at least one image or enter text with a length of at least 3 characters.",
    //       },
    //     };
    //   }

    //   return result;
    // },
    resolver: zodResolver(CreateThreadValidation),
    defaultValues: {
      text: "",
      community: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof CreateThreadValidation>) {
    try {
      let uploadedImages = await startUpload(threadImages);
      let uploadedImagesUrls: Array<string> = [];
      if (uploadedImages) {
        uploadedImagesUrls = uploadedImages.map(
          (uploadedImage: UploadFileResponse) => uploadedImage.url
        );
      }
      const startTime = performance.now();

      await createThreadHandler({
        userId,
        ...values,
        path: "/",
        communityId: organization?.id,
        images: uploadedImagesUrls,
        parentId: parentThreadId,
      });

      const endTime = performance.now();
      const elapsedTime = endTime - startTime;

      console.log(`Time taken: ${elapsedTime} milliseconds`);

      if (redirectUrl) {
        router.push("/");
      }
      form.setValue("text", "");
      setThreadImages([]);
      console.log({ redirectUrl });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-full ${className}`}
      >
        <div className={`flex justify-cdenter gap-3 items-end`}>
          <div className="relative h-10 w-10">
            <Image
              src={organization?.imageUrl || userImage}
              alt="avatar"
              fill
              className="cursor-pointer rounded-full object-cover"
            ></Image>
          </div>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 mt-4 w-full">
                <FormControl className="text-gray-200 text-base-semibold flex-1">
                  <Textarea
                    rows={3}
                    placeholder="Say Something..."
                    className="account-form_input no-focus text-body1-normal"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pl-12">
          <MediaViewerWrapper
            className="mb-2 mt-5"
            images={threadImages}
          ></MediaViewerWrapper>
          <div className="flex justify-between items-center mt-6">
            <MediaUploader images={threadImages} setImages={setThreadImages} />
            <Button type="submit" className={`${postBtnClass} !py-1`}>
              {btnTitle}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
