import EmptyBox from '@/components/EmptyBox';
import React from 'react'
import SemesterCard from './SemesterCard';
type Props ={
  semesters:TSemesterData[]
}
export default function SemesterList({semesters}:Props) {
  if (semesters.length <= 0) return <EmptyBox classNames="mt-10" />;
  return semesters.length >= 1 ? (
    <ul className="flex flex-wrap w-full h-fit py-1 gap-1 md:p-1">
      {semesters?.map((sem) => {
        return <SemesterCard key={sem.id} semester={sem}/>
      })}
    </ul>
  ) : (
    <p className="mt-10 text-sm font-semibold text-muted-foreground">
      No result!
    </p>
  );
}
