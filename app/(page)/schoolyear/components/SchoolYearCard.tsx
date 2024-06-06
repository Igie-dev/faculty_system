import React from 'react'
import DeleteSchoolYear from './deleteSchoolyear/DeleteSchoolYear'
type Props = {
    schoolyear:TSchoolYearData
}
export default function SchoolYearCard({schoolyear}:Props) {
  return (
   <li className="w-full bg-background px-4 h-14 flex items-center justify-between border rounded-sm md:max-w-[49%]">
    <span className="text-lg">Year {" " + schoolyear.school_year}</span>
        <DeleteSchoolYear id={schoolyear.id} year={schoolyear.school_year}/>
   </li>
  )
}
