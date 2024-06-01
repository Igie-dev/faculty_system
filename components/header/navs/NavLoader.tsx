"use client";
import React from "react";
import BtnsLoaderSpinner, {
  BtnLoaderClassEnum,
} from "@/components/loader/BtnLoaderSpinner";

export default function NavLoader() {
  return (
    <nav className="w-full h-full flex flex-col space-y-1 pt-5   lg:pt-8">
      <div className="flex items-center w-full h-12 justify-center *:opacity-60">
        <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
      </div>

      <div className="flex items-center w-full h-12 justify-center *:opacity-60">
        <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
      </div>

      <div className="flex items-center w-full h-12 justify-center *:opacity-60">
        <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
      </div>

      <div className="flex items-center w-full h-12 justify-center *:opacity-60">
        <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
      </div>

      <div className="flex items-center w-full h-12 justify-center *:opacity-60">
        <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
      </div>

      <div className="flex flex-col gap-2 pt-5 mt-5-t h-fit ">
        <div className="flex items-center w-full h-12 justify-center *:opacity-60">
          <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
        </div>

        <div className="flex items-center w-full h-12 justify-center *:opacity-60">
          <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
        </div>

        <div className="flex items-center w-full h-12 justify-center *:opacity-60">
          <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
        </div>
      </div>
      <div className="flex flex-col gap-2  w-full flex-1 justify-end">
        <div className="flex items-center w-full h-12 justify-center *:opacity-60">
          <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
        </div>
      </div>
    </nav>
  );
}
