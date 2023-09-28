"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { compressImage } from "@/lib/compressImage";
import uploadImages from "@/lib/uploadImages";
import { isBase64Image } from "@/lib/utils";
import { UserValidation } from "@/lib/validations/user";
import { updateUser } from "@/server-actions/user/user.actions";
import { UserData } from "@/types/User";
import { useSessionList } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "../ui/label";

const updateProfileImageInClerk = async (newUserImage: File) => {
  const compressedProfileImg = await compressImage(newUserImage);
  const sessions = useSessionList();

  const formData = new FormData();
  formData.append("file", compressedProfileImg);

  await axios.post(
    "https://bold-mole-6.clerk.accounts.dev/v1/me/profile_image?_clerk_js_version=4.58.2&_clerk_session_id=sess_2VrK95eOzTEVBsoILsZw20FWvwC&__dev_session=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkdmJfMlVhalZCdzRZMjlMSTVjOFlBNHk0d3VTTlpOIiwiaWQiOiJjbGllbnRfMlZySzh5alBQbDZZVE8xT2c2SDRVR0tQV2NpIiwicm90YXRpbmdfdG9rZW4iOiJjOHlheWh0NmVqbzcyYzM4dzU2N2dzeGo1ODF5MThsbTF3N2VnNmcxIn0.Gts094WyZr24MKZ3j3uBc3JStULoNT6iTw03sVcofCjg8fmVyD_bynMZReKKQbgjxw-8K3mUtGDWLqolte3znRNRPdUblY1OggwhyIwy7vhXyfo16XlM_VDN5hW7fyDptqGypv-Rmjdeysjk1zRWtn_d1aP9CTnDEOjLfZMoBsT-MW2Fb8G2fZHkJUBJbVRYcT9dV_CZzSYsv_at4eU9YwloxW71-JdGKRNKGUowz1LKAn7EDBmAPu7LRzpifJTKOD7AIy6qims77abPqCwYxLf80LyHpoomYqGEzdoiqK-gHDbq946-bwj2M7qg1SakKqAfREgy_GdoYOvdEbdNLg",
    formData,
    { withCredentials: true }
  );
};

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
  const [isLoading, setIsLoading] = useState(false);
  const { sessions } = useSessionList();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: profilePhoto || user.image,
      name: user.name,
      bio: user.bio,
      username: user.username,
    },
  });

  useEffect(() => {
    let l = async () => {
      // const s = User

      let token = null;
      if (sessions?.length) token = await sessions[0].getToken();
    };
    l();
  }, []);

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    setIsLoading(true);
    const blob = values.profile_photo;

    let updateProfileImageInClerkPromise = null;
    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged && profilePhoto) {
      updateProfileImageInClerkPromise =
        updateProfileImageInClerk(profilePhoto);
      let uploadedImagesUrls = await uploadImages([profilePhoto]);

      if (uploadedImagesUrls?.length) {
        values.profile_photo = uploadedImagesUrls[0];
      }
    }

    await updateUser(
      {
        id: user.id,
        image: values.profile_photo,
        ...values,
      },
      `/profile/${user.id}`
    );

    await updateProfileImageInClerkPromise;

    if (pathname !== "/settings") {
      router.back();
    } else {
      // First Time
      router.push("/");
    }
    setIsLoading(false);
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
        <Button
          type="submit"
          className={` w-full ${isLoading && "!py-2"}`}
          disabled={isLoading}
          spinnerClass="mx-auto h-5 w-5"
        >
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
}
