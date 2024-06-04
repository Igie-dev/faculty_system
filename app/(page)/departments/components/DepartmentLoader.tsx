import { Skeleton } from "@/components/ui/skeleton";
export default function DepartmentLoader() {
  const count = [];

  for (let i = 0; i < 10; i++) {
    count.push(i);
  }
  return (
    <section className="flex flex-col items-center w-full h-full">
      <header className="flex flex-col items-start justify-between w-full gap-5 p-2 pb-5 border-b md:p-4 bg-background">
        <span className="text-xl font-extrabold fancy_font md:text-2xl">
          Departments
        </span>
        <div className="flex items-center gap-2 justify-between w-full">
          <span className="flex-1  h-11 max-w-[30rem] rounded-md flex items-center px-2 text-muted-foreground text-sm border bg-primary-foreground">
            Loading...
          </span>
          <div className="px-4 py-2 bg-primary text-sm text-white rounded-md">
            loading...
          </div>
        </div>
      </header>
      <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto">
        <ul className="flex flex-wrap w-full h-fit gap-2 md:p-2">
          {count.map((c) => {
            return (
              <li
                key={c}
                className="px-4 py-6 h-fit flex flex-col space-y-2 border w-full lg:max-w-[22rem] bg-background rounded-md"
              >
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-[80%]" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
