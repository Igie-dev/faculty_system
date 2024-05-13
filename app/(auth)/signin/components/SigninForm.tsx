"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import { signIn } from "next-auth/react";
import Image from "next/image";
import googleIcon from "@/assets/icons8-google-48.png";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This in not a valid email."),
  password: z.string().min(1, { message: "This field has to be filled." }),
});
export default function SigninForm() {
  const [isShowPass, setIsShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/dashboard");
        return;
      }
      setErrorMsg(`${res?.error}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full py-10 h-fit md:max-w-[30rem] border bg-background rounded-md  flex flex-col justify-center space-y-2 p-2 sm:px-4  md:p-10"
      >
        <h1 className="text-4xl font-extrabold mb-16">Sign In</h1>
        <p className="tex-xs text-destructive">{errorMsg}</p>
        <div className="w-full flex flex-col gap-6 mt-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative  w-full h-fit space-y-0">
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
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
                <FormControl className="relative border border-blue-200">
                  <>
                    <Input
                      placeholder="******"
                      type={isShowPass ? "text" : "password"}
                      autoComplete="false"
                      className="peer outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md ring-0 border pr-12  focus:border-primary "
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => setIsShowPass((prev) => !prev)}
                      className="absolute top-1 h-8 right-1 text-accent-foreground"
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
        <a
          href=""
          className="text-xs hover:underline hover:text-blue-500 !mt-5"
        >
          Forgot password
        </a>
        <Button size="lg" type="submit" className="!mt-5">
          Sign In
        </Button>
        <div className="w-full flex flex-col items-center gap-5 relative border-t !mt-10">
          <span className="bg-background px-6 text-sm text-muted-foreground font-semibold absolute -top-3">
            or
          </span>
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={() => signIn("google")}
            className="w-full h-14 flex items-center gap-4  border bg-background rounded-md mt-5"
          >
            <Image
              style={{
                height: "2.5rem",
                width: "2.5rem",
                pointerEvents: "none",
              }}
              alt="googlesvg"
              src={googleIcon}
            />
            <span className="pointer-events-none">Sign in with Google</span>
          </Button>
          <span className="text-sm mt-5">
            Don&apos;t have an account?{" "}
            <a href="" className="text-blue-500 underline">
              Contact to your admin!
            </a>
          </span>
        </div>
      </form>
    </Form>
  );
}
