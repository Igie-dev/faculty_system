"use client";
import { Button } from "@/app/_components/ui/button";
import { ChevronRight, EllipsisVertical } from "lucide-react";
import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
export default function Aside({ children }: { children: React.ReactNode }) {
  const asideRef = useRef<HTMLElement | null>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!portalTarget) {
      setPortalTarget(document?.getElementById("announcement_header"));
    }
  }, [portalTarget]);

  const handleAside = () => {
    if (asideRef?.current) {
      if (asideRef.current.classList.contains("translate-x-full")) {
        asideRef.current.classList.remove("translate-x-full");
      } else {
        asideRef.current.classList.add("translate-x-full");
      }
    }
  };

  return (
    <aside
      ref={asideRef}
      className="flex flex-col h-full transition-all w-full bg-secondary translate-x-full absolute py-4 top-0 left-0 lg:w-[25rem] lg:sticky lg:top-0 lg:translate-x-0 xl:w-[40%]"
    >
      <div className="flex items-center justify-end lg:hidden px-2">
        {portalTarget
          ? createPortal(
              <Button
                size="icon"
                variant="outline"
                className="lg:hidden"
                onClick={handleAside}
              >
                <EllipsisVertical absoluteStrokeWidth size={22} />
              </Button>,
              portalTarget
            )
          : null}
        <Button size="icon" variant="outline" onClick={handleAside}>
          <ChevronRight absoluteStrokeWidth size={22} />
        </Button>
      </div>

      {children}
    </aside>
  );
}
