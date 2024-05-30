"use client";
import React from "react";
type Props = {
  faculty: TFacultyData;
};
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFacultySchema } from "@/lib/helper";
import { z } from "zod";
import { useFormState } from "react-dom";
import { updateFaculty } from "@/actions/faculties";
import UpdateDepartments from "./UpdateDepartments";
import FormButtons from "./FormButtons";

export default function UpdateDetailsForm({ faculty }: Props) {
  const [state, formAction] = useFormState(updateFaculty, {
    message: "",
  });

  const form = useForm<z.infer<typeof updateFacultySchema>>({
    resolver: zodResolver(updateFacultySchema),
    defaultValues: {
      name: faculty?.name,
      email: faculty?.email,
      contact: faculty?.contact,
      role: faculty?.role,
      ...(state?.fields ?? {}),
    },
  });

  return (
    <Form {...form}>
      <span className="text-sm text-destructive my-5 w-full  h-5 justify-start font-semibold flex">
        {state?.error ? (
          <p className="font-normal">Error: {` ${state?.error}`}</p>
        ) : null}
      </span>

      <form className="w-full flex flex-col space-y-4 mt-5">
        <span className="text-sm font-semibold text-muted-foreground">
          Details
        </span>
        <div className="w-full flex flex-col  space-y-4">
          <div className="flex flex-col gap-4  md:items-center md:flex-row md:justify-between">
            <div className="flex flex-col gap-1 md:w-[48%] ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Enter name" />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive  absolute left-0 -bottom-5" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1 md:w-[48%] ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Enter email" />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive  absolute left-0 -bottom-5" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4  md:items-center md:flex-row md:justify-between">
            <div className="flex flex-col gap-1 md:w-[48%] ">
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
                    <FormMessage className="text-xs text-destructive  absolute left-0 -bottom-5" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1 md:w-[48%]">
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
                    <FormMessage className="text-xs text-destructive  absolute left-0 -bottom-5" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div
          className="w-full flex flex-col border-t pt-5
    !mt-10"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">
              Departments
            </span>

            <UpdateDepartments facultyDepartments={faculty?.departments} />
          </div>
          <ul className="w-full flex flex-col mt-5">
            {faculty?.departments.length >= 1 ? (
              faculty?.departments.map((department: TFacultyDepartments) => {
                return (
                  <li
                    key={department.dep_id}
                    className="flex  items-center space-x-8 w-full h-fit min-h-11   px-3 text-sm"
                  >
                    <span className="font-semibold">
                      {department.department.acronym}
                    </span>
                    <span className="text-muted-foreground !ml-5">
                      {department.department.department}
                    </span>
                  </li>
                );
              })
            ) : (
              <span className="text-sm text-muted-foreground">
                s No departments found!
              </span>
            )}
          </ul>
        </div>
        <div className="flex items-center !mt-10 flex-row-reverse">
          <FormButtons />
        </div>
      </form>
    </Form>
  );
}
