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
import { createFileCategorySchema } from "@/server/db/schema";
import { useFormState } from "react-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileCategory } from "@/server/actions";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function CreateFileCategory() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(createFileCategory, {
    message: "",
  });

  const form = useForm<z.infer<typeof createFileCategorySchema>>({
    resolver: zodResolver(createFileCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      ...(state?.fields ?? {}),
    },
  });

  useEffect(() => {
    if (state.message || state.error) {
      toast({
        variant: state.error ? "destructive" : "default",
        title: state.message
          ? "Create file category success!"
          : state.error
          ? "Create file category failed!"
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
        <Button>Create</Button>
      </DrawerTrigger>
      <DrawerContent className="h-full top-0 right-0 left-auto mt-0 w-full p-2  md:max-w-[30rem] rounded-lg md:px-4">
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={(evt) => {
              evt.preventDefault();
              form.handleSubmit(() => {
                const formData = new FormData(formRef.current!);
                formAction(formData);
              })(evt);
            }}
            action={formAction}
            className="flex flex-col space-y-4"
          >
            <DrawerHeader>
              <DrawerTitle>Create new file category</DrawerTitle>
              <DrawerDescription>
                Use this form to create a new department. Please provide the
                necessary information and click <strong>Create</strong> to add
                new file category.
              </DrawerDescription>
            </DrawerHeader>
            <span className="text-sm text-destructive h-5 w-fit font-semibold flex">
              {state?.error ? (
                <p className="font-normal">Error: {` ${state?.error}`}</p>
              ) : null}
            </span>
            <div className="flex flex-col gap-3">
              <div className="w-full flex flex-col">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter name"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Enter description" />
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
                Create
              </Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
