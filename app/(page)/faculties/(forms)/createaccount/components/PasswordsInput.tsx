"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function PasswordsInput() {
  const [inputType, setInputType] = useState("password");

  const handleCheck = (checked: boolean) => {
    if (checked) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  return (
    <>
      <div className="w-full flex flex-col space-y-2 !mt-10">
        <Label htmlFor="password">Create Password</Label>
        <Input
          type={inputType}
          id="password"
          name="password"
          required
          placeholder="Create password"
        />
      </div>
      <div className="w-full flex flex-col space-y-2 ">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type={inputType}
          id="confirmPassword"
          name="confirmPassword"
          required
          placeholder="Confirm password"
        />
        <div className="flex gap-2 ml-2 !mt-4 items-center">
          <Checkbox className="rounded-md" onCheckedChange={handleCheck} />
          <span className="text-sm text-muted-foreground">Show password</span>
        </div>
      </div>
    </>
  );
}
