import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { createFileCategory } from "@/server/actions/filecategory";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function CreateFileCategory() {
  const [open, setOpen] = useState(false);
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
        setOpen((prev) => !prev);
      }
    }
  }, [state, toast]);

  return (
    <Form {...form}>
      <Dialog
        open={open}
        onOpenChange={() => {
          form.reset();
          setOpen((prev) => !prev);
        }}
      >
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[40rem]">
          <form
            ref={formRef}
            onSubmit={(evt) => {
              evt.preventDefault();
            }}
            className="flex flex-col space-y-4"
          >
            <DialogHeader>
              <DialogTitle>Create new file category</DialogTitle>
              <DialogDescription>
                Use this form to create a new department. Please provide the
                necessary information and click <strong>Create</strong> to add
                the category.
              </DialogDescription>
            </DialogHeader>
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
                      <FormMessage className="text-xs text-destructive  absolute left-0 -bottom-5" />
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
                      <FormMessage className="text-xs text-destructive  absolute left-0 -bottom-5" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={async (evt) => {
                  evt.preventDefault();
                  const formData = new FormData(formRef.current!);
                  formAction(formData);
                }}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>{" "}
    </Form>
  );
}
