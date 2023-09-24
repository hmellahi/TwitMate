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
import Image from "next/image";
import MediaViewerWrapper from "../shared/Thread/MediaViewerWrapper";
import { useToast } from "../ui/Toast/use-toast";
import { cn } from "@/lib/utils";
import Compressor from "compressorjs";
import { compressImage } from "@/lib/compressImage";
import uploadImages from "@/lib/uploadImages";

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
  const { toast } = useToast();

  const { organization } = useOrganization();
  const [threadImages, setThreadImages] = useState<Array<File>>([]);
  const { startUpload } = useUploadThing("media");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

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
    setIsCreatingPost(true);
    try {
      let uploadedImagesUrls = await uploadImages(threadImages);

      await createThreadHandler({
        userId,
        ...values,
        path: "/",
        communityId: organization?.id,
        images: uploadedImagesUrls,
        parentId: parentThreadId,
      });

      form.setValue("text", "");
      setThreadImages([]);
      if (redirectUrl) {
        router.push("/");
      }

      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[20rem] md:top-4 md:right-4 py-4"
        ),
        title: "Thread created successfully!",
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsCreatingPost(false);
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
            <Button
              type="submit"
              className={`${postBtnClass} !py-1`}
              disabled={isCreatingPost}
            >
              {btnTitle}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
