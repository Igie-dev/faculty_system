import React, { useRef } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/_components/ui/drawer";

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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/app/_components/ui/use-toast";
import { Pencil } from "lucide-react";
import { Textarea } from "@/app/_components/ui/textarea";
import { createFileCategorySchema } from "@/utils/zodSchema";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import BtnLoader from "@/app/_components/BtnLoader";
type Props = {
  id: number;
  name: string;
  description: string;
};

export default function UpdateFileCategory({ id, name, description }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending, error } = api.fileCategory.update.useMutation({
    onSuccess: (context) => {
      toast({
        variant: "default",
        title: "Update file category success!",
        description: context?.message ?? "Update file category cuccess",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Update file category failed!",
        description:
          error.data?.zodError?.formErrors[0] ??
          error?.message ??
          "Update file category failed",
      });
    },
  });

  const form = useForm<z.infer<typeof createFileCategorySchema>>({
    resolver: zodResolver(createFileCategorySchema),
    defaultValues: {
      name: name,
      description: description,
    },
  });

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
                const name = formData.get("name") as string;
                const description = formData.get("description") as string;
                mutate({ id, name, description });
              })(evt);
            }}
            className="flex flex-col space-y-4"
          >
            <DrawerHeader>
              <DrawerTitle>Update Category</DrawerTitle>
              <DrawerDescription>
                Use this form to update the details of an existing file
                category. Please modify the necessary information and click{" "}
                <strong>Update</strong> to save the changes.
              </DrawerDescription>
            </DrawerHeader>
            <span className="text-sm text-destructive  h-5 w-fit font-semibold flex">
              {error?.message ? (
                <p className="font-normal">
                  <strong>Error:</strong>
                  {` ${error.data?.zodError?.formErrors[0] ?? error?.message}`}
                </p>
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
                <Button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    form.reset();
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </DrawerClose>
              {isPending ? (
                <BtnLoader classNames="flex-1" />
              ) : (
                <Button disabled={isPending} type="submit" className="w-[50%]">
                  Update
                </Button>
              )}
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
