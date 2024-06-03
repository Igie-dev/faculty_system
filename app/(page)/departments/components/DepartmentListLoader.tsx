import { Skeleton } from "@/components/ui/skeleton";
export default function DepartmentListLoader() {
  const count = [];

  for (let i = 0; i < 10; i++) {
    count.push(i);
  }
  return (
    <ul className="flex flex-wrap w-full gap-2">
      {count.map((c) => {
        return (
          <li
            key={c}
            className="px-4 py-6 flex flex-col space-y-2 border w-full lg:max-w-[22rem] bg-background rounded-md"
          >
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-[80%]" />
          </li>
        );
      })}
    </ul>
  );
}
