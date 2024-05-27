import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import BtnsLoaderSpinner, {
  BtnLoaderClassEnum,
} from "@/components/loader/BtnLoaderSpinner";
export default function FormButtons() {
  const status = useFormStatus();
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild disabled={status.pending}>
        <Link href="/faculties">Cancel</Link>
      </Button>
      <Button type="submit" disabled={status.pending}>
        {status.pending ? (
          <div className="h-full flex items-center justify-center px-4">
            <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.WHITE_RING} />
          </div>
        ) : (
          "Create"
        )}
      </Button>
    </div>
  );
}
