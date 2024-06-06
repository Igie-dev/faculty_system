import React from 'react'
import CreateSemester from './createSemester/CreateSemester'

export default function Header() {
  return (
    <header className="flex flex-col items-start justify-between w-full p-2 pb-5 md:px-4  bg-background">
    <span className="text-xl font-extrabold fancy_font md:text-2xl">
     Semesters
    </span>
    <div className="flex w-full items-center justify-end">
       <CreateSemester/>
    </div>
  </header>
  )
}
