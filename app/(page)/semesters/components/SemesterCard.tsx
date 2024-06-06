import React from 'react'
import DeleteSemester from './deleteSemester/DeleteSemester'
type Props = {
    semester:TSemesterData
}
export default function SemesterCard({semester}:Props) {
    return (
        <li className="w-full bg-background px-4 h-14 flex items-center justify-between border rounded-sm md:max-w-[49%]">
         <span className="text-lg">{semester.semester + " "} Semester</span>
          <DeleteSemester id={semester.id} semester={semester.semester}/>
        </li>
       )
}
