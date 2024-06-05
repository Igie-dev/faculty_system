import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
import { createDepartmentSchema } from "@/server/db/schema";
import { useFormState } from "react-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDepartment } from "@/server/actions/departments";
import { useToast } from "@/components/ui/use-toast";
import { Pencil } from "lucide-react";
type Props = {
  id: number;
  acronym: string;
  name: string;
};
export default function UpdateDepartment({ id, acronym, name }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(updateDepartment, {
    message: "",
  });

  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      acronym: acronym,
      name: name,
      ...(state?.fields ?? {}),
    },
  });

  useEffect(() => {
    if (state.message || state.error) {
      toast({
        variant: state.error ? "destructive" : "default",
        title: state.message
          ? "Update department success!"
          : state.error
          ? "Update department failed!"
          : "",
        description: state.message ?? state.error ?? "",
      });
      if (state.message) {
        form.reset();
      }
    }
  }, [state, toast, form]);
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost" className="text-muted-foreground">
          <Pencil size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full top-0 right-0 left-auto mt-0 w-full p-2  md:max-w-[30rem] rounded-lg md:px-4">
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={(evt) => {
              evt.preventDefault();
              form.handleSubmit(() => {
                const formData = new FormData(formRef.current!);
                formData.append("id", JSON.stringify(id));
                formAction(formData);
              })(evt);
            }}
            action={(form: FormData) => {
              const formData = form;
              formData.append("id", JSON.stringify(id));
              formAction(formData);
            }}
            className="flex flex-col space-y-4"
          >
            <DrawerHeader>
              <DrawerTitle>Update department</DrawerTitle>
              <DrawerDescription>
                Use this form to update the details of an existing department.
                Please modify the necessary information and click{" "}
                <strong>Update</strong> to save the changes.
              </DrawerDescription>
            </DrawerHeader>
            <span className="text-sm text-destructive  h-5 w-fit font-semibold flex">
              {state?.error ? (
                <p className="font-normal">Error: {` ${state?.error}`}</p>
              ) : null}
            </span>
            <div className="flex flex-col gap-3">
              <div className="w-full flex flex-col">
                <FormField
                  control={form.control}
                  name="acronym"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Acronym</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter acronym"
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter department"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DrawerFooter className="flex-row gap-4 px-0">
              <DrawerClose asChild className="w-[50%]">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
              <Button type="submit" className="w-[50%]">
                Update
              </Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
