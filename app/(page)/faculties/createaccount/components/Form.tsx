"use client";
import React, { useState, useRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import DepartmentsList from "./DepartmentsList";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { useToast } from "@/app/_components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import BtnLoader from "@/app/_components/BtnLoader";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { createFacultySchema } from "@/utils/zodSchema";

const schema = createFacultySchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwordm don't match!",
    path: ["confirmPassword"],
  }
);
export default function CreateForm() {
  const [facultyDep, setFacultyDep] = useState<TCreateFacultyDep[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [inputPassType, setInputPassType] = useState("password");
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending, error } = api.faculty.create.useMutation({
    onSuccess: (context) => {
      toast({
        variant: "default",
        title: "Create faculty account success!",
        description: context.message ?? "Create faculty account cuccess",
      });
      router.push("/faculties");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Create faculty account failed!",
        description:
          error.data?.zodError?.formErrors[0] ??
          error?.message ??
          "Create faculty account failed",
      });
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
      role: "",
    },
  });

  const handleShowPassword = (checked: boolean) => {
    if (checked) {
      setInputPassType("text");
    } else {
      setInputPassType("password");
    }
  };

  return (
    <Form {...form}>
      <header className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-semibold">Create new account</span>
          <span className="text-sm text-muted-foreground md:max-w-[30rem]">
            Use this form to create a new faculty account. Please provide the
            necessary information and click <strong>Submit</strong> to add the
            new faculty member.
          </span>
        </div>
      </header>
      <form
        ref={formRef}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            const formData = new FormData(formRef.current!);
            const first_name = formData.get("first_name") as string;
            const last_name = formData.get("last_name") as string;
            const email = formData.get("email") as string;
            const contact = formData.get("contact") as string;
            const role = formData.get("role") as string;
            const password = formData.get("password") as string;
            const confirmPassword = formData.get("confirmPassword") as string;
            mutate({
              first_name,
              last_name,
              email,
              contact,
              role,
              password,
              confirmPassword,
              departments: facultyDep,
            });
          })(evt);
        }}
        className="flex flex-col w-full h-fit"
      >
        <span className="text-sm text-destructive my-5  h-5 w-fit font-semibold flex">
          {error?.message ? (
            <p className="font-normal">
              <strong>Error:</strong>
              {` ${error.data?.zodError?.formErrors[0] ?? error?.message}`}
            </p>
          ) : null}
        </span>
        <div className="flex flex-col w-full h-fit md:flex-row justify-between md:gap-4">
          <div className="w-full flex flex-col md:h-full md:w-[45%] space-y-3">
            <div className="w-full flex flex-col">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter first name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-col ">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter last name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-col ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-col">
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter contact number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-col">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name="role"
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Dean">Dean</SelectItem>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-col ">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create Password</FormLabel>
                    <FormControl>
                      <Input
                        type={inputPassType}
                        {...field}
                        placeholder="Create password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-col">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={inputPassType}
                        {...field}
                        placeholder="Confirm password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 ml-2  items-center">
              <Checkbox onCheckedChange={handleShowPassword} />
              <span className="text-sm text-muted-foreground">
                Show password
              </span>
            </div>
          </div>
          {/* Departments */}
          <div className="w-full flex flex-col md:h-full md:w-[45%]  mt-10 md:mt-0">
            <div className="w-full flex flex-col">
              <span className="text-lg font-semibold">Departments</span>
              <span className="text-xs text-muted-foreground">
                Include faculty departments
              </span>
              <span className="text-sm text-destructive mt-5  h-5 w-fit font-semibold flex">
                {error &&
                error?.message.includes("Must include department!") ? (
                  <>
                    <p className="font-normal">Error: {` ${error?.message}`}</p>
                  </>
                ) : null}
              </span>
            </div>
            <DepartmentsList
              setFacultyDep={setFacultyDep}
              facultyDep={facultyDep}
            />
          </div>
        </div>
        <div className="flex items-center !mt-10 flex-row-reverse">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              disabled={isPending}
              onClick={() => {
                router.push("/faculties");
              }}
              variant="outline"
            >
              Cancel
            </Button>

            {isPending ? (
              <BtnLoader classNames="flex-1" />
            ) : (
              <Button disabled={isPending} type="submit" className="w-[50%]">
                Save
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
