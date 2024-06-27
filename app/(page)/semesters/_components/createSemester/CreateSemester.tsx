import React, { useRef, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/app/_components/ui/use-toast";
import { api } from "@/trpc/react";
import BtnLoader from "@/app/_components/BtnLoader";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createSemesterSchema } from "@/utils/zodSchema";
const ordinalIndicators = ["st", "nd", "rd", "th"];

export default function CreateSemester() {
  const router = useRouter();
  const [ordinal, setOrdinal] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const { mutate, isPending, error } = api.semester.create.useMutation({
    onSuccess: (context) => {
      toast({
        variant: "default",
        title: "Create semester success!",
        description: context?.message ?? "Create semester cuccess",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Create semester failed!",
        description:
          error.data?.zodError?.formErrors[0] ??
          error?.message ??
          "Create semester failed",
      });
    },
  });
  const form = useForm<z.infer<typeof createSemesterSchema>>({
    resolver: zodResolver(createSemesterSchema),
    defaultValues: {
      semester: "",
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
                const semester = formData.get("semester") as string;
                mutate({ semester });
              })(evt);
            }}
            className="flex flex-col space-y-4"
          >
            <DrawerHeader>
              <DrawerTitle>Create new semester</DrawerTitle>
              <DrawerDescription>
                Use this form to create a new semester. Please provide the
                necessary information and click <strong>Create</strong> to add
                new semester.
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
                <div className="w-fit h-fit flex items-end gap-2">
                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester</FormLabel>
                        <FormControl>
                          <div className="flex flex-row gap-1 items-center">
                            <Input
                              {...field}
                              type="text"
                              onChange={(e) => {
                                const value = e.currentTarget.value;
                                form.setValue("semester", value);
                                if (Number(value) >= 4) {
                                  setOrdinal("th");
                                } else {
                                  setOrdinal(
                                    ordinalIndicators[Number(value) - 1]
                                  );
                                }
                              }}
                              className="w-20"
                            />
                            <span className="h-10 border rounded-md flex items-center justify-center w-16">
                              {ordinal}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DrawerFooter className="flex-row gap-4 px-0">
              <DrawerClose asChild className="w-[50%]">
                <Button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    form.reset();
                    setOrdinal("");
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
