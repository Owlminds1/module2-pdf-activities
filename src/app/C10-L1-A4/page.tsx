"use client";
import Image from "next/image";
import jsPDF from "jspdf";
import React from "react";
import { useForm, Controller } from "react-hook-form";
type formData = {
  first: string;
  sec: string;
  third: string;
  four: string;
  five: string;
  six: string;
};
const Page = () => {
  const { handleSubmit, control } = useForm<formData>();

  const onSubmit = (data: formData) => {
    const doc = new jsPDF();
    const maxWidth = 160; // Max width before text wraps
    const lineSpacing = 7; // Reduced space between lines
    let yPosition = 30; // Initial Y position for content

    // **Title Centering**
    doc.setFontSize(16);
    const title = "Your Feeling ";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (210 - titleWidth) / 2, 20); // Center align title
    doc.setFontSize(12);

    // Function to add text with line break
    const addTextWithLineBreak = (value: string) => {
      const wrappedAnswer = doc.splitTextToSize(value || "N/A", maxWidth);

      // Check if text exceeds page limit
      if (yPosition + wrappedAnswer.length * lineSpacing > 280) {
        doc.addPage();
        yPosition = 30; // Reset Y position for new page
      }

      // Add label

      // Add answer below label
      doc.text(wrappedAnswer, 20, yPosition);
      yPosition += wrappedAnswer.length * lineSpacing + 3; // Adjusted space
    };

    doc.setFontSize(12);
    addTextWithLineBreak(data.first);
    addTextWithLineBreak(data.sec);
    addTextWithLineBreak(data.third);
    addTextWithLineBreak(data.four);
    addTextWithLineBreak(data.five);
    addTextWithLineBreak(data.six);
    doc.save("your-feeling.pdf");
  };
  return (
    <div className="min-h-screen bg-slate-400 flex justify-center items-center">
      <div className="grid grid-cols-12 w-full p-5">
        <div className="col-span-6 w-full  flex items-center justify-center">
          <div className="w-[300px] h-[500px] relative">
            <Image src="/images/jarImage.png" layout="fill" alt="jar image" />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="absolute  w-full top-[30%] flex flex-col justify-center items-center gap-4 px-5"
            >
              <Controller
                control={control}
                name="first"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                    className="border-b border-black bg-transparent outline-none text-black"
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="sec"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                    className="border-b border-black bg-transparent outline-none text-black"
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="third"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                    className="border-b border-black bg-transparent outline-none text-black"
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="four"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                    className="border-b border-black bg-transparent outline-none text-black"
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="five"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                    className="border-b border-black bg-transparent outline-none text-black"
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="six"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                    className="border-b border-black bg-transparent outline-none text-black"
                    {...field}
                  />
                )}
              />

              <div>
                <button className="bg-[#F6FAFD] px-3 py-1 rounded-lg border border-black text-black hover:bg-red-500 hover:text-white">
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-6 w-full bg-[#F8CA95] rounded-lg shadow-lg">
          <div className="py-2 px-5">
            <h3 className="text-2xl font-bold text-center text-black">
              What makes you feel brave?
            </h3>
            <p className="text-lg px-5  py-2 text-black">
              Use ingredients of your choice, decide how much you would want and
              the action required. Remember to arrange the steps correctly to
              write instructions for the recipe.
            </p>
          </div>

          <div className="py-2 px-5">
            <h3 className="text-2xl font-bold text-center text-black">
              Here is a Word bank to help you:
            </h3>

            <div className=" px-5 grid grid-cols-12 pt-2 justify-center items-center ">
              {["Ingredients", "How much", "action", "step"].map(
                (item, index) => (
                    <span
                    key={index}
                    className="col-span-3 font-bold border min-w-[100px] border-black  px-5 py-2 text-black"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className=" px-5 pb-2 grid grid-cols-12 pt-2 justify-center items-center ">
              {["Friends", "A pinch of..", "Mix", "Mix","Mom", "A cup of..", "Pour", "Next","Next","Handful of..","Put","After that","Book","A spoon of…","Slice","Then","Toy","Two spoons of…","","Finally","Blanket","Two cups of.."].map(
                (item, index) => (
                  <span
                    key={index}
                    className="col-span-3  border min-h-[65px] min-w-[100px] border-black  px-5 py-2 text-black"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
