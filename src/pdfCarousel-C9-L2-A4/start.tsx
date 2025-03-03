import Image from 'next/image'
import React from 'react'

type myProps ={
    setIsFirstScreen:(value:string)=>void
}

const Start = ({setIsFirstScreen}:myProps) => {
  return (
    <div className="min-h-screen p-5 bg-[#F8FAFC] flex flex-col gap-6 justify-start items-center">
    <h3 className="text-4xl text-black ">School Helper</h3>
    <div className=" grid grid-cols-12 p-2 w-full place-items-center shadow-black   rounded-lg ">
      <div className="col-span-6">
        <Image
          src="/images/school_image.jpg"
          width={400}
          height={100}
          alt="soda shaker"
        />
      </div>
      <div className="col-span-6 w-full p-3 text-black">
        <ul className="list-disc space-y-3 text-2xl text-black">
          <li>
            <strong>Identify the problem:</strong>What is the issue?
          </li>
          <li>
            <strong>Brainstorm solutions:</strong>Come up with creative
            ideas to solve the problem.
          </li>
          <li>
            <strong>Choose a solution:</strong>Decide on the best solution
            as a group.
          </li>
          <li>
            <strong>Plan the action:</strong> Determine how to implement
            the solution (e.g., write a letter to the principal, organize
            a fundraiser, create a student committee)
          </li>
        </ul>
      </div>
    </div>
    <div className="border border-black rounded-lg px-8 py-1 shadow shadow-[#000000b9] bg-yellow-400 hover:scale-90">
      <h3
        className="text-[30px]  cursor-pointer text-black"
        onClick={() => setIsFirstScreen("first")}
      >
        Start
      </h3>
    </div>
  </div>
  )
}

export default Start
