import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import BtnsLoaderSpinner, {
  BtnLoaderClassEnum,
} from "@/components/loader/BtnLoaderSpinner";
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
      <Button type="submit" disabled={status.pending}>
        {status.pending ? (
          <div className="h-full flex items-center justify-center px-4">
            <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.WHITE_RING} />
          </div>
        ) : (
          `${submitText}`
        )}
      </Button>
    </div>
  );
}
