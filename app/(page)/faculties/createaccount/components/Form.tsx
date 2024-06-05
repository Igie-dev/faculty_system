"use client";
import React, { useEffect, useState, useRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormButtons from "@/components/FormButtons";
import DepartmentsList from "./DepartmentsList";
import { createFaculty } from "@/server/actions/faculties";
import { useFormState } from "react-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createFacultySchema } from "@/server/db/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export default function CreateForm() {
  const [facultyDep, setFacultyDep] = useState<TCreateFacultyDep[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [inputPassType, setInputPassType] = useState("password");
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useFormState(createFaculty, {
    message: "",
  });

  const form = useForm<z.infer<typeof createFacultySchema>>({
    resolver: zodResolver(createFacultySchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
      role: "",
      ...(state?.fields ?? {}),
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.message || state.error) {
      toast({
        variant: state.error ? "destructive" : "default",
        title: state.message
          ? "Create account success!"
          : state.error
          ? "Create account failed!"
          : "",
        description: state.message ?? state.error ?? "",
      });
    }
    if (state.message) {
      timer = setTimeout(() => {
        router.push("/faculties");
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [state, toast, router]);

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
            formData.append("departments", JSON.stringify(facultyDep));
            formAction(formData);
          })(evt);
        }}
        action={(form: FormData) => {
          const formData = form;
          formData.append("departments", JSON.stringify(facultyDep));
          formAction(formData);
        }}
        className="flex flex-col w-full h-fit"
      >
        <span className="text-sm text-destructive my-5  h-5 w-fit font-semibold flex">
          {state?.error ? (
            <p className="font-normal">Error: {` ${state?.error}`}</p>
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
                {state?.error &&
                state?.error?.includes("Must include department!") ? (
                  <>
                    <p className="font-normal">Error: {` ${state?.error}`}</p>
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
          <FormButtons
            cancelLink="/faculties"
            cancelText="cancel"
            submitText="submit"
          />
        </div>
      </form>
    </Form>
  );
}
