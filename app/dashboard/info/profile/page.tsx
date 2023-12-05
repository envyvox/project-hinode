"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profileScheme } from "@/lib/zod-schemes";
import { updateUserInfo } from "@/actions/update-user-info";
import SubmitButton from "./submit-btn";
import { useUserStore } from "@/store/user-store";
import { useDictionaryStore } from "@/store/dictionary-store";

export default function () {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const user = useUserStore((state) => state.user);

  const form = useForm<z.infer<typeof profileScheme>>({
    resolver: zodResolver(profileScheme),
    defaultValues: {
      about: "",
    },
    values: {
      about: user.about ?? "",
    },
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {dictionary.dashboard["info.profile.username"]}
        </label>
        <Input id="username" disabled value={user.name ?? ""} />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {dictionary.dashboard["info.profile.email"]}
        </label>
        <Input id="email" disabled value={user.email ?? ""} />
      </div>
      <Form {...form}>
        <form
          action={(formData) => updateUserInfo(user?.id!, formData)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {dictionary.dashboard["info.profile.about"]}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={
                      dictionary.dashboard["info.profile.about-placeholder"]
                    }
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
}
