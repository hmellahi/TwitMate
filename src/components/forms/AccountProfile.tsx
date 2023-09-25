"use client";

import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import Image from "next/image";
import { UserData } from "@/types/User";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/server-actions/user/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { useUser } from "@clerk/nextjs";
import uploadImages from "@/lib/uploadImages";

export default function AccountProfile({
  user,
  btnTitle,
}: {
  user: UserData;
  btnTitle: string;
}) {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: profilePhoto || user.image,
      name: user.name,
      bio: user.bio,
      username: user.username,
    },
  });

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged && profilePhoto) {
      let uploadedImagesUrls = await uploadImages([profilePhoto]);

      if (uploadedImagesUrls?.length) {
        values.profile_photo = uploadedImagesUrls[0];
      }
    }

    // currentUser?.setProfileImage({ file: values.profile_photo });
    await updateUser(
      {
        id: user.id,
        image: values.profile_photo,
        ...values,
      },
      "/"
    );

    if (pathname === "/settings") {
      router.back();
    } else {
      // First Time
      router.push("/");
    }
  }

  function updateProfilePhoto(
    e: ChangeEvent<HTMLInputElement>,
    changeFile: (fileContent: string) => void
  ) {
    e.preventDefault();

    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setProfilePhoto(file);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      changeFile(reader.result?.toString() || "");
    };
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-white "
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5">
              <FormLabel className="account-form_image-label rounded-full">
                <div className="w-24 h-24 relative">
                  <Image
                    src={field.value}
                    alt="avatar"
                    className="object-cover rounded-full"
                    fill
                  />
                </div>
              </FormLabel>
              <FormControl className="text-gray-200 text-base-semibold flex-1">
                <>
                  <Label htmlFor="picture">Upload Profile Image</Label>
                  <Input
                    id="picture"
                    type="file"
                    placeholder="upload a photo"
                    className="account-form_image-input hidden"
                    onChange={(e) => updateProfilePhoto(e, field.onChange)}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Name</FormLabel>
              <FormControl className="text-gray-200 text-base-semibold flex-1">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Username</FormLabel>
              <FormControl className="text-gray-200 text-base-semibold flex-1">
                <Input
                  type="text"
                  placeholder="Enter your username"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Bio</FormLabel>
              <FormControl className="text-gray-200 text-base-semibold flex-1">
                <Textarea
                  rows={7}
                  placeholder="Enter your bio"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" w-full">
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
}
