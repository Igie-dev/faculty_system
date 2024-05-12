"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This in not a valid email."),
  password: z.string().min(1, { message: "This field has to be filled." }),
});
export default function SigninForm() {
  const [isShowPass, setIsShowPass] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  border h-fit lg:w-1/2 lg:h-[80%] flex flex-col gap-5 p-2 lg:p-4"
      >
        <div>
          <h1>Signin</h1>
          <p>Sometext</p>
        </div>
        <div>
          <p>Error</p>
        </div>
        <div className="w-full flex flex-col gap-6 mt-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative  w-full h-fit space-y-0">
                <FormControl>
                  <Input
                    placeholder="exmaple@gmail.com"
                    type="email"
                    className="peer outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md ring-0 border focus:border-primary "
                    {...field}
                  />
                </FormControl>
                <FormLabel className="absolute px-1 py-1 left-1 -top-3 bg-background peer-focus:-top-5  peer-focus:left-0  peer-focus:px-0 peer-focus:py-0 transition-all">
                  Email
                </FormLabel>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative  w-full h-fit space-y-0">
                <FormControl className="relative border border-red-400">
                  <>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      className="peer outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md ring-0 border pr-12  focus:border-primary "
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-1 h-[80%] right-1"
                    >
                      {isShowPass ? (
                        <EyeOff absoluteStrokeWidth size={20} />
                      ) : (
                        <Eye absoluteStrokeWidth size={20} />
                      )}
                    </Button>
                  </>
                </FormControl>
                <FormLabel className="absolute px-1 py-1 left-1 -top-3 bg-background peer-focus:-top-5  peer-focus:left-0  peer-focus:px-0 peer-focus:py-0 transition-all">
                  Password
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
