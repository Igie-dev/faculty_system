import EmptyBox from '@/components/EmptyBox';
import React from 'react'
import SchoolYearCard from './SchoolYearCard';

type Props ={
    schoolyear:TSchoolYearData[]
}
export default function SchoolYearList({schoolyear}:Props) {
    if (schoolyear.length <= 0) return <EmptyBox classNames="mt-10" />;
  return schoolyear.length >= 1 ? (
    <ul className="flex flex-wrap w-full h-fit py-1 gap-1 md:p-1">
      {schoolyear?.map((year) => {
        return <SchoolYearCard key={year.id} schoolyear={year}/>
      })}
    </ul>
  ) : (
    <p className="mt-10 text-sm font-semibold text-muted-foreground">
      No result!
    </p>
  );
}
