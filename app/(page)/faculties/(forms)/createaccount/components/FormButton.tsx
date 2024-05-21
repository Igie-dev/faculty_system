import { Button } from "@/components/ui/button";
import React from "react";
import FormSubmitButton from "@/components/FormSubmitButton";
import Link from "next/link";
export default function FormButton() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/faculties">Cancel</Link>
      </Button>
      <FormSubmitButton type="submit">Submit</FormSubmitButton>
    </div>
  );
}
