"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { ButtonProps, buttonVariants } from "./ui/button";
import BtnsLoaderSpinner, {
  BtnLoaderClassEnum,
} from "./loader/BtnLoaderSpinner";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const status = useFormStatus();
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={status.pending}
      >
        {status.pending ? (
          <div className={cn(buttonVariants({ size }))}>
            <BtnsLoaderSpinner
              classNames={
                variant && variant === "default"
                  ? BtnLoaderClassEnum.WHITE_RING
                  : BtnLoaderClassEnum.BLACK_RING
              }
            />
          </div>
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export default Button;
