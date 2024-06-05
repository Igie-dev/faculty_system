import React from "react";
import UpdateFileCategory from "./updateFileCategory/UpdateFileCategory";
import DeleteFleCategory from "./deleteFileCategory/DeleteFleCategory";

type Props = {
  category: TFileCategoryData;
};
export default function FileCategoryCard({ category }: Props) {
  return (
    <li className="flex flex-col w-full h-fit rounded-sm gap-2 border bg-background p-4 relative">
      <div className="flex items-center  w-fit absolute top-2 right-2">
        <UpdateFileCategory
          id={category.id}
          name={category.name}
          description={category.description}
        />
        <DeleteFleCategory
          id={category.id}
          name={category.name}
          description={category.description}
        />
      </div>

      <h5 className="font-semibold text-lg h-fit w-fit max-w-[80%] break-words text-wrap">
        {category.name}
      </h5>
      <p className="break-words text-wrap text-sm text-muted-foreground w-full">
        {category.description}
      </p>
    </li>
  );
}
