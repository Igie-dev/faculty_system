import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

export default function SchoolYearLoader() {
  const count = [];

  for (let i = 0; i < 10; i++) {
    count.push(i);
  }
  return (
    <section className="flex flex-col items-center w-full h-full">
    <header className="flex flex-col items-start justify-between w-full p-2 pb-5 md:px-4  bg-background">
    <span className="text-xl font-extrabold fancy_font md:text-2xl">
     School Year
    </span>
    <div className="flex w-full items-center justify-end">
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
               className="w-full bg-background px-4 h-14 flex items-center justify-between border rounded-sm md:max-w-[49%]"
              >
                <Skeleton className="h-4 w-20" />
              </li>
            );
          })}
        </ul>
    </div>
  </section>
  )
}
