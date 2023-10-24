"use client";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { CreateThreadValidation } from "@/lib/validations/thread";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import MediaUploader from "../shared/Thread/MediaUploader";
import { useToast } from "../ui/toast/use-toast";

const uploadImages = (() => {
  let uploadImagesFun: null | Function = null;

  return async (threadImages: Array<File>) => {
    if (uploadImagesFun) {
      return uploadImagesFun(threadImages);
    }

    const module = await import("@/lib/upload-images");
    uploadImagesFun = module.default;
    return uploadImages(threadImages)
  };
})();

const MediaViewerWrapper = dynamic(
  () => import("../shared/Thread/MediaViewerWrapper").then((module) => module),
  {
    ssr: true,
  }
);

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
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const form = useForm({
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

      let localImageUrl = threadImages?.length ? URL.createObjectURL(threadImages[0]) : null;

      await createThreadHandler({
        userId,
        ...values,
        path: "/",
        communityId: organization?.id,
        images: uploadedImagesUrls,
        parentId: parentThreadId,
        localImageUrl,
      });

      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[20rem] md:top-4 md:right-4 py-4"),
        title: "Thread created successfully!",
      });
    } finally {
      form.setValue("text", "");
      setThreadImages([]);
      setIsCreatingPost(false);
      if (redirectUrl) {
        router.push("/");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`w-full ${className}`}>
        <div className={`flex gap-4 items-start`}>
          <div className="relative h-12 w-12 mt-1">
            <Image
              src={organization?.imageUrl || userImage}
              alt="avatar"
              className="cursor-pointer rounded-full object-cover"
              fill
            />
          </div>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-full">
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
          <MediaViewerWrapper className="mb-2 mt-5" images={threadImages}></MediaViewerWrapper>
          <div className="flex justify-between items-center mt-6">
            <MediaUploader images={threadImages} setImages={setThreadImages} />
            <Button type="submit" className={`${postBtnClass} !py-1`} disabled={isCreatingPost}>
              {btnTitle}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
