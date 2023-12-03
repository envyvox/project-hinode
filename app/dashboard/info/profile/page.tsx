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

export default function () {
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
    <div className="space-y-8 py-6 lg:py-8">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Username
        </label>
        <Input disabled value={user.name ?? ""} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email
        </label>
        <Input disabled value={user.email ?? ""} />
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
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea placeholder="I'm cool person ;)" {...field} />
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
