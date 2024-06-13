"use client";
import React, { useRef } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FacultyDepartments from "./FacultyDepartments";
import { useToast } from "@/app/_components/ui/use-toast";
import { api } from "@/trpc/react";
import BtnLoader from "@/app/_components/BtnLoader";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { createFacultySchema } from "@/utils/zodSchema";

const updateSchema = createFacultySchema
  .pick({
    email: true,
    contact: true,
    role: true,
  })
  .extend({ name: z.string() });

type Props = {
  faculty: any;
};

export default function UpdateDetailsForm({ faculty }: Props) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { mutate, isPending, error } = api.faculty.update.useMutation({
    onSuccess: (context) => {
      toast({
        variant: "default",
        title: "Update faculty account success!",
        description: context.message ?? "Update faculty account cuccess",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Update faculty account failed!",
        description:
          error.data?.zodError?.formErrors[0] ??
          error?.message ??
          "Update faculty account failed",
      });
    },
  });

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: faculty?.name,
      email: faculty?.email,
      contact: faculty?.contact,
      role: faculty?.role,
    },
  });

  return (
    <Form {...form}>
      <header className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-semibold">Update account</span>
          <span className="text-sm text-muted-foreground md:max-w-[40rem]">
            Use this form to update the details of an existing faculty account.
            Please modify the necessary information and click{" "}
            <strong>Update</strong> to save the changes.
          </span>
        </div>
      </header>
      <span className="text-sm text-destructive my-5 w-full  h-5 justify-start font-semibold flex">
        {error?.message ? (
          <p className="font-normal">
            <strong>Error:</strong>
            {` ${error.data?.zodError?.formErrors[0] ?? error?.message}`}
          </p>
        ) : null}
      </span>
      <form
        ref={formRef}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            const formData = new FormData(formRef.current!);
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const contact = formData.get("contact") as string;
            const role = formData.get("role") as string;
            mutate({
              facultyId: faculty.faculty_id,
              name,
              email,
              contact,
              role,
            });
          })(evt);
        }}
        className="w-full flex flex-col space-y-4 mt-5"
      >
        <span className="text-sm font-semibold text-muted-foreground">
          Details
        </span>
        <div className="w-full flex flex-col  space-y-4">
          <div className="flex flex-col gap-3  md:items-start md:flex-row md:justify-between">
            <div className="flex flex-col  md:w-[48%] ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Enter name" />
                    </FormControl>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col  md:w-[48%] ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Enter email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4  md:flex-row md:justify-between md:items-start">
            <div className="flex flex-col md:w-[48%] ">
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
            <div className="flex flex-col  md:w-[48%]">
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
          </div>
        </div>
        <FacultyDepartments faculty_id={faculty?.faculty_id} />
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
