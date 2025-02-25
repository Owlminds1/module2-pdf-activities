"use client"
import jsPDF from "jspdf";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [isSelect, setIsSelect] = useState<number[]>([]);



  const handleSelect = (index :number)=>{
    setIsSelect((prev)=>
        prev.includes(index) ? 
        prev.filter((i)=> i != index):[...prev,index]
    )
  }
  const symptoms = [
    "Butterflies in the tummy",
    "Heart beats fast",
    "Weak or jelly legs",
    "Jittery teeth",
    "Clenched fists",
    "Headache",
    "Chest pain",
    "Sweaty palm",
  ];



  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("Your physical symptoms you experience.", 20, 20);
    pdf.setFontSize(12);

    let y = 40; // Starting Y position
    isSelect.forEach((index, i) => {
      pdf.text(`${i + 1}. ${symptoms[index]}`, 20, y);
      y += 10; // Move Y position down for next line
    });

    pdf.save("selected-symptoms.pdf");
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <h3 className="text-xl text-black text-center py-5 ">
        Getting constantly worried or anxious can cause physical symptoms. Think
        about a time when you felt anxious. <br /> Select what physical symptoms you
        experience.
      </h3>
      <div className="grid grid-cols-12 p-5">
        <div className="col-span-7  flex items-center justify-center">
          <Image
            src="/images/L3C10-activity1.jpeg"
            width={500}
            height={200}
            alt="image"
            className="rounded-lg shadow-md shadow-black"
          />
        </div>
        <form onSubmit={generatePDF}  className="col-span-5   h-full  flex flex-col  justify-center gap-9 items-center px-3">
          <div className="  flex justify-center items-center gap-2 flex-wrap">
            {[
              "Butterflies in the tummy ",
              "Heart beats fast",
              "Weak or jelly legs ",
              "Jittery teeth",
              "Clenched fists",
              "Headache",
              "Chest pain",
              "Sweaty palm",
            ].map((btnItem, index) => (
              <div key={index} onClick={()=>handleSelect(index)} className={`${isSelect.includes(index) ? "bg-green-600":"bg-[#640D5F]"}  border border-white cursor-pointer px-5 py-2 rounded-lg active:bg-green-500 `}>
                {btnItem}
              </div>
            ))}


          </div>
            <button className="bg-blue-600 px-8 py-2 rounded-lg ">submit</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
