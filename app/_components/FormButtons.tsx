import { Button } from "@/app/_components/ui/button";
import React from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import BtnLoader from "./BtnLoader";
type Props = {
  cancelLink: string;
  cancelText: string;
  submitText: string;
};
export default function FormButton({
  cancelLink,
  cancelText,
  submitText,
}: Props) {
  const status = useFormStatus();
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" asChild disabled={status.pending}>
        <Link href={cancelLink}>{cancelText}</Link>
      </Button>
      {status.pending ? (
        <BtnLoader />
      ) : (
        <Button type="submit" disabled={status.pending}>
          `${submitText}`
        </Button>
      )}
    </div>
  );
}
