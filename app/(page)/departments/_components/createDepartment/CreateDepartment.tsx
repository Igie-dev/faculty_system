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
import { api } from "@/trpc/react";
import BtnLoader from "@/app/_components/BtnLoader";
import { useRouter } from "next/navigation";
import { createDepartmentSchema } from "@/utils/zodSchema";

export default function CreateDepartment() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const { mutate, isPending, error } = api.department.create.useMutation({
    onSuccess: (context) => {
      toast({
        variant: "default",
        title: "Create department success!",
        description: context.message ?? "Create department cuccess",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Create department failed!",
        description:
          error.data?.zodError?.formErrors[0] ??
          error?.message ??
          "Create department failed",
      });
    },
  });
  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      acronym: "",
      name: "",
    },
  });
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button> Create</Button>
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
                const acronym = formData.get("acronym") as string;
                mutate({ name, acronym });
              })(evt);
            }}
            className="flex flex-col space-y-4 w-full h-full"
          >
            <DrawerHeader>
              <DrawerTitle>Create new department</DrawerTitle>
              <DrawerDescription>
                Use this form to create a new department. Please provide the
                necessary information and click <strong>Create</strong> to add
                new department.
              </DrawerDescription>
            </DrawerHeader>
            <span className="text-sm text-destructive h-5 w-fit font-semibold flex">
              {error?.message ? (
                <p className="font-normal">
                  <strong>Error:</strong>
                  {` ${error.data?.zodError?.formErrors[0] ?? error?.message}`}
                </p>
              ) : null}
            </span>
            <div className="flex flex-col gap-4">
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
                  Create
                </Button>
              )}
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
