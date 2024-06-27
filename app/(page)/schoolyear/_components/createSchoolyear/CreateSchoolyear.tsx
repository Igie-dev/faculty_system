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
import { createSchoolYearSchema } from "@/utils/zodSchema";
export default function CreateSchoolyear() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isPending, error } = api.schoolYear.create.useMutation({
    onSuccess: (context) => {
      toast({
        variant: "default",
        title: "Create schoolyear success!",
        description: context?.message ?? "Create schoolyear cuccess",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Create schoolyear failed!",
        description:
          error.data?.zodError?.formErrors[0] ??
          error?.message ??
          "Create schoolyear failed",
      });
    },
  });

  const form = useForm<z.infer<typeof createSchoolYearSchema>>({
    resolver: zodResolver(createSchoolYearSchema),
    defaultValues: {
      schoolyear: "",
    },
  });

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Create</Button>
      </DrawerTrigger>
      <DrawerContent className="h-full top-0 right-0 left-auto mt-0 w-full p-2  md:max-w-[30rem] rounded-lg md:px-4">
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={async (evt) => {
              evt.preventDefault();
              form.handleSubmit(() => {
                const formData = new FormData(formRef.current!);
                const schoolyear = formData.get("schoolyear") as string;
                mutate({ schoolyear });
              })(evt);
            }}
            className="flex flex-col space-y-4"
          >
            <DrawerHeader>
              <DrawerTitle>Create new school year</DrawerTitle>
              <DrawerDescription>
                Use this form to create a new school year. Please provide the
                necessary information and click <strong>Create</strong> to add
                new school year.
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
            <div className="flex flex-col gap-3">
              <div className="w-full flex flex-col">
                <FormField
                  control={form.control}
                  name="schoolyear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter a year"
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
