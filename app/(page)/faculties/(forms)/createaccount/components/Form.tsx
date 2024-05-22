"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormButton from "./FormButton";
import DepartmentsList from "./DepartmentsList";
import { createFaculty } from "@/actions/faculties";
import { useFormState } from "react-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const initialState = {
  message: "",
};

type Props = {
  departmentsData: TDepartmentData[];
};

export default function Form({ departmentsData }: Props) {
  const [facultyDep, setFacultyDep] = useState<TCreateFacultyDep[]>([]);
  const [inputType, setInputType] = useState("password");
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useFormState(createFaculty, initialState);
  const handleCheck = (checked: boolean) => {
    if (checked) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const validationError = (state as { errors: Record<string, string[]> })
    ?.errors;
  const error = (state as { error: string })?.error;

  useEffect(() => {
    const message = (state as { message: string })?.message;
    if (!message) return;
    toast({
      title: "Create account",
      description: message,
    });
    const timer = setTimeout(() => {
      router.push("/faculties");
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [state, toast, router]);
  return (
    <form
      action={(formData: FormData) => {
        const data = formData;
        data.append("departments", JSON.stringify(facultyDep));
        formAction(data);
      }}
      className="flex flex-col w-full h-fit"
    >
      <span className="text-sm text-destructive my-5  h-5 w-fit font-semibold flex">
        {error ? (
          <>
            <p>Error:</p>
            <p className="ml-1 font-normal">{error}</p>
          </>
        ) : null}
      </span>
      <div className="flex flex-col w-full h-fit md:flex-row  gap-2 md:gap-4">
        <div className="w-full flex flex-col md:h-full md:w-[50%] space-y-7">
          <div className="w-full flex flex-col space-y-2 relative">
            <Label htmlFor="last_name">First Name</Label>
            <Input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter First Name"
              className={
                validationError?.first_name ? "border-destructive" : ""
              }
            />
            <span className="text-xs text-destructive  absolute left-0 -bottom-5">
              {validationError?.first_name
                ? validationError?.first_name[0]
                : ""}
            </span>
          </div>
          <div className="w-full flex flex-col space-y-2 relative ">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Enter Last Name"
              className={validationError?.last_name ? "border-destructive" : ""}
            />
            <span className="text-xs text-destructive  absolute left-0 -bottom-5">
              {validationError?.last_name ? validationError?.last_name[0] : ""}
            </span>
          </div>
          <div className="w-full flex flex-col space-y-2 relative ">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Email"
              className={validationError?.email ? "border-destructive" : ""}
            />
            <span className="text-xs text-destructive  absolute left-0 -bottom-5">
              {validationError?.email ? validationError?.email[0] : ""}
            </span>
          </div>
          <div className="w-full flex flex-col space-y-2 relative ">
            <Label htmlFor="contact">Contact</Label>
            <Input
              type="text"
              id="contact"
              name="contact"
              maxLength={10}
              minLength={10}
              placeholder="Enter Phone"
              className={validationError?.contact ? "border-destructive" : ""}
            />
            <span className="text-xs text-destructive  absolute left-0 -bottom-5">
              {validationError?.contact ? validationError?.contact[0] : ""}
            </span>
          </div>
          <div className="w-full flex flex-col space-y-2 relative ">
            <Label htmlFor="role">Role</Label>
            <Select name="role">
              <SelectTrigger
                className={`w-[10rem] ${
                  validationError?.role ? "border-destructive" : ""
                }
                `}
              >
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent id="role" className="!px-2">
                <SelectGroup>
                  <SelectLabel className="px-2">Roles</SelectLabel>
                  <SelectItem value="Dean" className="px-2">
                    Dean
                  </SelectItem>
                  <SelectItem value="Teacher" className="px-2">
                    Teacher
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-xs text-destructive  absolute left-0 -bottom-5">
              {validationError?.role ? validationError?.role[0] : ""}
            </span>
          </div>
          <div className="w-full flex flex-col space-y-2 relative !mt-10">
            <Label htmlFor="password">Create Password</Label>
            <Input
              type={inputType}
              id="password"
              name="password"
              placeholder="Create password"
              className={validationError?.password ? "border-destructive" : ""}
            />
            <span className="text-xs text-destructive  absolute left-0 -bottom-5">
              {validationError?.password ? validationError?.password[0] : ""}
            </span>
          </div>
          <div className="w-full flex flex-col space-y-2 relative ">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type={inputType}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              className={
                validationError?.confirmPassword ? "border-destructive" : ""
              }
            />
            <span className="text-xs text-destructive  absolute left-0 -bottom-5">
              {validationError?.confirmPassword
                ? validationError?.confirmPassword[0]
                : ""}
            </span>
          </div>
          <div className="flex gap-2 ml-2  items-center">
            <Checkbox className="rounded-md" onCheckedChange={handleCheck} />
            <span className="text-sm text-muted-foreground">Show password</span>
          </div>
        </div>
        {/* Departments */}
        <div className="w-full flex flex-col md:h-full md:w-[50%]  mt-10 md:mt-0">
          <div className="w-full flex flex-col">
            <span className="text-lg font-semibold">Departments</span>
            <span className="text-xs text-muted-foreground">
              Include faculty departments
            </span>
            <span className="text-sm text-destructive mt-5  h-5 w-fit font-semibold flex">
              {validationError?.departments ||
              (error && error?.includes("Must include department!")) ? (
                <>
                  <p>Error:</p>
                  <p className="ml-1 font-normal">
                    {validationError?.departments[0] || error}
                  </p>
                </>
              ) : null}
            </span>
          </div>
          <DepartmentsList
            departmentsData={departmentsData}
            setFacultyDep={setFacultyDep}
          />
        </div>
      </div>
      <div className="flex items-center !mt-10 flex-row-reverse">
        <FormButton />
      </div>
    </form>
  );
}
