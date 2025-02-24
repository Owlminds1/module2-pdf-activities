"use client";
import jsPDF from "jspdf";
import React from "react";
import { useForm, Controller } from "react-hook-form";

type formData = {
  first: string;
  sec: string;
  third: string;
  four: string;
  five: string;
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
    const title = "Complete the sentence";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (210 - titleWidth) / 2, 20); // Center align title

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Function to add text with line break
    const addTextWithLineBreak = (label: string, value: string) => {
      const wrappedLabel = doc.splitTextToSize(label, maxWidth);
      const wrappedAnswer = doc.splitTextToSize(value || "N/A", maxWidth);

      // Check if text exceeds page limit
      if (
        yPosition +
          wrappedLabel.length * lineSpacing +
          wrappedAnswer.length * lineSpacing >
        280
      ) {
        doc.addPage();
        yPosition = 30; // Reset Y position for new page
      }

      // Add label
      doc.text(wrappedLabel, 20, yPosition);
      yPosition += wrappedLabel.length * lineSpacing;

      // Add answer below label
      doc.text(wrappedAnswer, 20, yPosition);
      yPosition += wrappedAnswer.length * lineSpacing + 3; // Adjusted space
    };

    doc.setFontSize(12);
    addTextWithLineBreak("1. I have been told, I have pretty:", data.first);
    addTextWithLineBreak("2. I'm loved by:", data.sec);
    addTextWithLineBreak("3. I'm good at:", data.third);
    addTextWithLineBreak("4. I have so much fun when:", data.four);
    addTextWithLineBreak("5. I'm proud of myself because:", data.five);

    doc.save("Complete-the-sentence.pdf");
  };

  return (
    <div className="bg-slate-400 p-5 min-h-screen text-black flex flex-col justify-center items-center">
      <h3 className="text-white text-2xl font-bold py-5 pb-[30px]">
        Complete the sentence
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center flex-col gap-8 bg-[#D1D5DB] shadow-lg p-5 py-8 rounded-lg"
      >
        <ul className="list-disc space-y-8 p-4">
          <li>
            {" "}
            <label
              className="w-[500px] flex items-center gap-1 text-lg"
              htmlFor="first"
            >
              I have been told, I have pretty
              <Controller
                name="first"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="first"
                    className="bg-transparent text-white border-b border-black outline-none px-5"
                    {...field}
                  />
                )}
              />
            </label>
          </li>

          <li>
            <label
              htmlFor="sec"
              className="w-[500px] flex items-center gap-1 text-lg"
            >
              I’m loved by
              <Controller
                name="sec"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="sec"
                    className="bg-transparent text-white border-b border-black outline-none px-5"
                    {...field}
                  />
                )}
              />
            </label>
          </li>

          <li>
            {" "}
            <label
              htmlFor="third"
              className="w-[500px] flex items-center gap-1 text-lg"
            >
              I’m good at
              <Controller
                name="third"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="third"
                    className="bg-transparent text-white border-b border-black outline-none px-5"
                    {...field}
                  />
                )}
              />
            </label>
          </li>

          <li>
            {" "}
            <label
              htmlFor="four"
              className="w-[500px] flex items-center gap-1 text-lg"
            >
              I’ve so much fun when
              <Controller
                name="four"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="four"
                    className="bg-transparent text-white border-b border-black outline-none px-5"
                    {...field}
                  />
                )}
              />
            </label>
          </li>

          <li>
            <label
              htmlFor="five"
              className="w-[500px] flex items-center gap-1 text-lg"
            >
              I’m proud of myself because
              <Controller
                name="five"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="five"
                    className="bg-transparent text-white border-b border-black outline-none px-5"
                    {...field}
                  />
                )}
              />
            </label>
          </li>
        </ul>

        <div>
          <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg text-white">
            Submit My Response
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
