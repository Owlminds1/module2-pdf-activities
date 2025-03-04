"use client";
import jsPDF from "jspdf";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { FormValues } from "@/pdfCarousel-C9-L2-A4/index";
import { useState } from "react";
type SlideThirdProps = {
  formData: FormValues[];
  setIsFirstScreen: (value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormValues[]>>; // Yeh line add karein
};


async function imageToBase64(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

export default function SlideThird({ formData,setIsFirstScreen,setFormData  }: SlideThirdProps) {
  const { control, handleSubmit } = useForm<FormValues>();
  const [table,setTable]=useState<boolean>(false)

  const onSubmit = (data: FormValues) => {
    setTable(true);
    setFormData((prev) => [...prev, data]); // Purane data ko array mein rakh kar naya data push kar raha hai
    console.log("Third Slide Data:", data);
  };
  
  const generatePDF = async (data: FormValues) => {
    onSubmit(data); // Pehle data ko update kar raha hai
    const doc = new jsPDF();
    const images = [
      "/images/PLAYGROUND.jpg",
      "/images/LIBRARY.jpg",
      "/images/hamburger.jpg",
    ];
    const titles = ["Slide 1", "Slide 2", "Slide 3"];
  
    let y = 20;
    const pageHeight = doc.internal.pageSize.height;
  
    for (let i = 0; i < images.length; i++) {
      doc.text(titles[i], 10, y);
      const imgBase64 = await imageToBase64(images[i]);
      doc.addImage(imgBase64, "JPEG", 10, y + 10, 50, 50);
      y += 70;
  
      const alternateText = `Alternate Solutions: ${formData[i]?.first || "No Data"}`;
      const planText = `Plan of Action: ${formData[i]?.secound || "No Data"}`;
  
      const splitAlternate = doc.splitTextToSize(alternateText, 180);
      const splitPlan = doc.splitTextToSize(planText, 180);
  
      if (y + splitAlternate.length * 10 > pageHeight) {
        doc.addPage();
        y = 20;
      }
      doc.text(splitAlternate, 10, y);
      y += splitAlternate.length * 10;
  
      if (y + splitPlan.length * 10 > pageHeight) {
        doc.addPage();
        y = 20;
      }
      doc.text(splitPlan, 10, y);
      y += splitPlan.length * 10 + 10;
    }
  
    doc.save("School_Helper.pdf");
  };
  

  return (
    <div className="bg-white min-h-screen flex items-center flex-col gap-8 justify-center p-5">
      <h3 className="text-4xl text-black min-h-[70px]">School Helper</h3>
      <div className="grid grid-cols-12 w-full place-items-center">
        <div className="col-span-6">
          <Image
            src="/images/hamburger.jpg"
            width={300}
            height={100}
            alt="image"
          />
        </div>
        <div className="col-span-6 w-full h-full flex justify-center  items-center gap-3 border rounded-lg">
          <form
            onSubmit={handleSubmit(generatePDF)}
            className="text-black flex flex-col gap-3 w-[500px] p-5"
          >
            <div>
              <label className="text-left text-xl" htmlFor="first">
                Alternate solutions
              </label>
              <Controller
                control={control}
                name="first"
                defaultValue="" // Yeh zaroori hai
                render={({ field }) => (
                  <textarea
                    className="w-full rounded-lg p-3 border"
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <label className="text-left text-xl" htmlFor="secound">
                Plan of Action
              </label>
              <Controller
                control={control}
                name="secound"
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    className="w-full rounded-lg p-3 border"
                    {...field}
                  />
                )}
              />
            </div>
            <button className="bg-violet-600 text-white px-8 py-2 rounded-lg text-xl">
              Save as PDF
            </button>

          </form>
        </div>
      </div>
            <button className={`${table ? "block":"hidden"} text-lg  bg-green-500 px-5 py-2 rounded-lg`} onClick={()=>setIsFirstScreen("table")}>Solution</button>
    </div>
  );
}
