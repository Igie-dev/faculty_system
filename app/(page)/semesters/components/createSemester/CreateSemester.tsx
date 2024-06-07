import React, { useRef, useEffect, useState } from "react";
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
import { createSemesterSchema } from "@/server/db/schema";
import { useFormState } from "react-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSemester } from "@/server/actions";
import { useToast } from "@/components/ui/use-toast";
const ordinalIndicators = ["st", "nd", "rd", "th"];
export default function CreateSemester() {
  const [ordinal, setOrdinal] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(createSemester, {
    message: "",
  });

  const form = useForm<z.infer<typeof createSemesterSchema>>({
    resolver: zodResolver(createSemesterSchema),
    defaultValues: {
      semester: "",
      ...(state?.fields ?? {}),
    },
  });

  useEffect(() => {
    if (state.message || state.error) {
      toast({
        variant: state.error ? "destructive" : "default",
        title: state.message
          ? "Create semester success!"
          : state.error
          ? "Create semester failed!"
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
              <DrawerTitle>Create new semester</DrawerTitle>
              <DrawerDescription>
                Use this form to create a new semester. Please provide the
                necessary information and click <strong>Create</strong> to add
                the category.
              </DrawerDescription>
            </DrawerHeader>
            <span className="text-sm text-destructive h-5 w-fit font-semibold flex">
              {state?.error ? (
                <p className="font-normal">Error: {` ${state?.error}`}</p>
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
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => {
                              if (e.currentTarget.value) {
                                const value = e.currentTarget.value;
                                form.setValue("semester", value);
                                if (Number(value) >= 4) {
                                  setOrdinal("th");
                                } else {
                                  setOrdinal(
                                    ordinalIndicators[Number(value) - 1]
                                  );
                                }
                              }
                            }}
                            className="w-20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span className="h-10 border rounded-md flex items-center justify-center w-16">
                    {ordinal}
                  </span>
                </div>
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
