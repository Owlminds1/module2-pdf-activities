"use client";
import jsPDF from "jspdf";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";

type formData = {
  first: string;
  secound: string;
};

type myProps = {
  setIsFirstScreen: (value: string) => void;
};
export default function SlideFirst({ setIsFirstScreen }: myProps) {
  const { control, handleSubmit } = useForm<formData>();

  const onSubmit = (data: formData) => {
    const doc = new jsPDF();
    const title = "School Helper";
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = doc.getTextWidth(title);
    const center = (pageWidth - textWidth) / 2;
    doc.text(title, center, 20); // Title Center mein

    // Image Add (Center mein)
    const imgData = "/images/LIBRARY.jpg"; // Image Path
    const imgWidth = 40; // Image Width
    const imgHeight = 50; // Image Height
    const imgX = (pageWidth - imgWidth) / 2; // Image Center X Axis
    const imgY = 30; // Image Y Axis (Title ke niche)

    doc.addImage(imgData, "JPEG", imgX, imgY, imgWidth, imgHeight);

    let y = imgY + imgHeight + 20; // Image ke niche se text start hoga

    const addTextWithPageBreak = (label: string, content: string) => {
      doc.text(label, 10, y);
      y += 10;
      const contentText = doc.splitTextToSize(content, pageWidth - 20);

      contentText.forEach((line: string) => {
        if (y + 10 > pageHeight - 20) {
          doc.addPage(); // Page Break
          y = 20; // Reset Y Position
        }
        doc.text(line, 10, y);
        y += 10;
      });

      y += 10; // Extra Gap
    };
    doc.setFontSize(12);
    // Sab Fields ko Dynamically Add karna
    addTextWithPageBreak("Alternate solutions", data.first);
    addTextWithPageBreak("Plan of Action", data.secound);
    // Page Numbers Add karna

    doc.save("School_Helper.pdf");
  };
  return (
    <div className="bg-white min-h-screen flex items-center flex-col gap-8 justify-center p-5 ">
      <h3 className="text-4xl text-black min-h-[70px]">School Helper</h3>
      <div className="grid grid-cols-12 w-full place-items-center ">
        <div className="col-span-6">
          <Image
            src="/images/PLAYGROUND.jpg"
            width={300}
            height={100}
            alt="image"
          />
        </div>
        <div className="col-span-6 w-full h-full flex justify-center items-center gap-3 border rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-black flex justify-center  gap-3 flex-col w-[500px] p-5 "
          >
            <div>
              {" "}
              <label className="text-left text-xl" htmlFor="first">
                Alternate solutions
              </label>
              <Controller
                control={control}
                name="first"
                render={({ field }) => (
                  <textarea
                    id="first"
                    className="w-full rounded-lg p-3  border border-black"
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <label className="text-left text-xl" htmlFor="first">
                Plan of Action
              </label>
              <Controller
                control={control}
                name="secound"
                render={({ field }) => (
                  <textarea
                    id="secound"
                    className="w-full rounded-lg p-3  border border-black"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="text-center ">
              {" "}
              <button className="bg-violet-600 w-full rounded-lg px-5 py-2 text-white ">
                Save as PDF
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="border z-20 border-black rounded-lg px-8 py-1 shadow shadow-[#000000b9] bg-yellow-400 hover:scale-90">
        <h3
          className="text-[30px]  cursor-pointer text-black"
          onClick={() => setIsFirstScreen("secound")}
        >
          <FaArrowRight />
        </h3>
      </div>
    </div>
  );
}
