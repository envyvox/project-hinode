"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user-store";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const regex =
  // Negative lookahead to disallow consecutive underscores, dots, or spaces
  "^(?!.*[_\\.\\s]{2})" +
  // First character can be any letter from the Latin or Cyrillic alphabet
  "[a-zA-Zа-яА-ЯёЁіІїЇєЄ]" +
  // Remaining characters can be letters, numbers, underscores, dots, or spaces
  "[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9_\\.\\s]*$";

const FormSchema = z.object({
  displayName: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(16, {
      message: "Username must be less than 16 characters.",
    })
    .regex(new RegExp(regex), {
      message:
        "Username can only contain letters, spaces, dot, underscore, and numbers (but cannot start with a space, dot, or underscore).",
    }),
});

const WelcomePage = () => {
  const { push } = useRouter();
  const setUserDisplayName = useUserStore((state) => state.setUserDisplayName);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      displayName: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    setUserDisplayName(data.displayName);
    push("/dashboard");
  };

  return (
    <div className="container flex flex-col items-center gap-5 py-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-1/4 space-y-6"
        >
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your cool name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default WelcomePage;
