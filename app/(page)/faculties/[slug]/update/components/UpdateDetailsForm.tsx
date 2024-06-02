"use client";
import React, { useRef, useEffect } from "react";
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
import { updateFacultySchema } from "@/server/db/schema";
import { z } from "zod";
import { useFormState } from "react-dom";
import { updateFaculty } from "@/server/actions/faculties";
import FormButtons from "@/components/FormButtons";
import FacultyDepartments from "./FacultyDepartments";
import { useToast } from "@/components/ui/use-toast";

export default function UpdateDetailsForm({ faculty }: Props) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
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
  useEffect(() => {
    if (state.message || state.error) {
      toast({
        variant: state.error ? "destructive" : "default",
        title: state.message
          ? "Update account success!"
          : state.error
          ? "Create account failed!"
          : "",
        description: state.message ?? state.error ?? "",
      });
    }
  }, [state, toast]);

  return (
    <Form {...form}>
      <span className="text-sm text-destructive my-5 w-full  h-5 justify-start font-semibold flex">
        {state?.error ? (
          <p className="font-normal">Error: {` ${state?.error}`}</p>
        ) : null}
      </span>
      <form
        ref={formRef}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            const formData = new FormData(formRef.current!);
            formData.append("faculty_id", faculty.faculty_id);
            formAction(formData);
          })(evt);
        }}
        action={(form: FormData) => {
          const formData = form;
          formData.append("faculty_id", faculty.faculty_id);
          formAction(formData);
        }}
        className="w-full flex flex-col space-y-4 mt-5"
      >
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
        <FacultyDepartments faculty_id={faculty?.faculty_id} />
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
