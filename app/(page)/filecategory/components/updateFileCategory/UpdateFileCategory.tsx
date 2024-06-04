import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useToast } from "@/components/ui/use-toast";
import { Pencil } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { updateFileCategory } from "@/server/actions/filecategory";

type Props = {
  id: number;
  name: string;
  description: string;
};

export default function UpdateFileCategory({ id, name, description }: Props) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(updateFileCategory, {
    message: "",
  });

  const form = useForm<z.infer<typeof createFileCategorySchema>>({
    resolver: zodResolver(createFileCategorySchema),
    defaultValues: {
      name: name,
      description: description,
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
          <Button size="icon" variant="ghost">
            <Pencil size={16} />
          </Button>
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
              <DialogTitle>Update Category</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Use this form to update the details of an existing file
                category. Please modify the necessary information and click{" "}
                <strong>Update</strong> to save the changes.
              </DialogDescription>
            </DialogHeader>
            <span className="text-sm text-destructive  h-5 w-fit font-semibold flex">
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
                  formData.append("id", JSON.stringify(id));
                  formAction(formData);
                }}
              >
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
