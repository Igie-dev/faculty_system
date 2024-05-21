import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PasswordsInput from "./components/PasswordsInput";
import FormButton from "./components/FormButton";

export default function page() {
  const handleSubmit = async (e: FormData) => {
    "use server";
    console.log(e.get("role"));
  };
  return (
    <section className="w-full h-full flex  justify-center overflow-y-auto">
      <main className="w-full h-fit px-4 py-8 flex-col md:mt-5 md:w-[95%] lg:max-w-[70rem] bg-background overflow-y-auto flex items-center md:rounded-lg md:border">
        <header className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">Create new account</span>
            <span className="text-sm text-muted-foreground">
              Please provide faculty details
            </span>
          </div>
          <Link href="/faculties" className="rounded-md hover:bg-secondary p-2">
            <X absoluteStrokeWidth size={22} />
          </Link>
        </header>
        <form
          action={handleSubmit}
          className="flex flex-col w-full h-fit  mt-10 "
        >
          <div className="flex flex-col w-full h-fit md:flex-row  gap-2">
            <div className="w-full flex flex-col md:h-full md:w-[50%] space-y-4">
              <div className="w-full flex flex-col space-y-2 ">
                <Label htmlFor="last_name">First Name</Label>
                <Input
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  placeholder="Enter First Name"
                />
              </div>
              <div className="w-full flex flex-col space-y-2 ">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  placeholder="Enter Last Name"
                />
              </div>
              <div className="w-full flex flex-col space-y-2 ">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter Email"
                />
              </div>
              <div className="w-full flex flex-col space-y-2 ">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  type="text"
                  id="contact"
                  name="contact"
                  required
                  placeholder="Enter Phone"
                />
              </div>
              <div className="w-full flex flex-col space-y-2 ">
                <Label htmlFor="role">Role</Label>
                <Select name="role">
                  <SelectTrigger className="w-[10rem]">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent id="role">
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="Dean">Dean</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <PasswordsInput />
            </div>
            {/* Departments */}
            <div className="w-full flex flex-col md:h-full md:w-[50%] border"></div>
          </div>
          <div className="flex items-center !mt-10 flex-row-reverse">
            <FormButton />
          </div>
        </form>
      </main>
    </section>
  );
}
