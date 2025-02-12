"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import jsPDF from "jspdf";

const questions = [
  {
    key: "step_1",
    question:
      "Describe the situation. Where are you when this happens? Who all are around you?",
  },
  {
    keys: ["step_2", "step_3"],
    question: "Is it real or do I imagine it?",
    options: [
      { key: "step_2", label: "This has really happened" },
      { key: "step_3", label: "I think it might happen" },
    ],
  },
  {
    key: "step_4",
    question: "What are you worried about? What did you imagine will happen?",
  },
  { key: "step_5", question: "What really happened?" },
  {
    keys: ["step_6", "step_7"],
    question: "Is it possible to actually come true?",
    options: [
      { key: "step_6", label: "Very Likely" },
      { key: "step_7", label: "Not Likely" },
    ],
  },
  {
    key: "step_8",
    question: "What's the worst that can happen if it comes true?",
  },
  {
    key: "step_9",
    question: "If your worry does come true, what is most likely to happen?",
  },
];

const Page = () => {
  const { handleSubmit, control } = useForm();

  // ✅ Handles form submission and triggers PDF creation
  const onsubmit = (data: Record<string, string | boolean>) => {
    createPdf(data);
  };

  // ✅ PDF Generation Function
  const createPdf = (data: Record<string, string | boolean>) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    const marginLeft = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - marginLeft * 2 - 10;
    const pageHeight = doc.internal.pageSize.getHeight();
    let currentY = 20;

    // ✅ Title
    const title = "Difficult Situation Analysis";
    doc.setFontSize(16);
    doc.text(title, pageWidth / 2, currentY, { align: "center" });
    currentY += 10;

    // ✅ Helper Function for Adding Text
    const addMultilineText = (
      label: string,
      text: string,
      yOffset: number,
      lineSpacing = 6
    ) => {
      const lines = doc.splitTextToSize(text, contentWidth);
      if (yOffset + lines.length * lineSpacing + 10 > pageHeight) {
        doc.addPage();
        yOffset = 20;
      }

      doc.setFontSize(12);
      doc.text(label, marginLeft, yOffset, {
        align: "left",
        maxWidth: contentWidth,
      });
      lines.forEach((line: string, index: number) => {
        doc.text(line, marginLeft + 5, yOffset + (index + 1) * lineSpacing, {
          align: "left",
        });
      });

      return yOffset + lines.length * lineSpacing + 4;
    };

    // ✅ Questions and Answers
    questions.forEach(({ key, keys, question, options }, index) => {
      const fieldKey = key ?? keys?.join("_") ?? `question_${index}`;
      currentY = addMultilineText(`Q: ${question}`, "", currentY + 6, 6);

      if (options) {
        options.forEach(({ key, label }) => {
          const isChecked = data[key] ? "Yes" : "No";
          currentY = addMultilineText(
            `   - ${label}: ${isChecked}`,
            "",
            currentY + 3,
            4
          );
        });
      } else {
        currentY = addMultilineText(
          "",
          String(data[fieldKey] || "N/A"),
          currentY + 3,
          4
        );
      }
    });

    // ✅ New Fields (Week, Month, Year)
    currentY = addMultilineText(
      "Chances that you will be okay:",
      "",
      currentY + 8,
      6
    );
    currentY = addMultilineText(
      `   - In a week: ${data.week || "N/A"}%`,
      "",
      currentY + 3,
      4
    );
    currentY = addMultilineText(
      `   - In a month: ${data.month || "N/A"}%`,
      "",
      currentY + 3,
      4
    );
    currentY = addMultilineText(
      `   - In a year: ${data.year || "N/A"}%`,
      "",
      currentY + 3,
      4
    );

    doc.save("Difficult_Situation_Analysis.pdf");
  };

  return (
    <div className="min-h-screen w-full text-black bg-[#94A3B8]">
      <div className="p-10 font-bold">
        <h1 className="text-center text-[25px]">
          Think of a difficult situation in which you got nervous or scared.
        </h1>
      </div>
      <div className="flex items-center justify-center mt-5 p-5">
        <div className="bg-[#FFEB3B] shadow-xl text-black p-5 rounded-lg">
          <form onSubmit={handleSubmit(onsubmit)} className="min-w-[800px]">
            {questions.map(({ key, keys, question, options }, index) => {
              const fieldKey = key ?? keys?.join("_") ?? `question_${index}`;

              return (
                <div key={fieldKey} className="mb-4">
                  <label htmlFor={fieldKey} className="block font-bold">
                    {question}
                  </label>

                  {options ? (
                    options.map(({ key, label }) => (
                      <label
                        key={key}
                        className="flex gap-1 items-center px-5 py-3"
                      >
                        <Controller
                          control={control}
                          name={key}
                          defaultValue={false}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="checkbox"
                              checked={field.value ?? false}
                              className="min-h-[25px] rounded-md border border-[#3DCCC7] bg-white"
                            />
                          )}
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    ))
                  ) : (
                    <Controller
                      control={control}
                      name={fieldKey}
                      defaultValue=""
                      render={({ field }) => (
                        <textarea
                          {...field}
                          placeholder="Type your answer here..."
                          className="min-h-[60px] rounded-md p-2 border border-[#3DCCC7] bg-white placeholder:text-slate-600 w-full"
                        />
                      )}
                    />
                  )}
                </div>
              );
            })}

            {/* Week, Month, Year Fields */}
            <div className="p-5">
              <h2 className="font-bold">
                If your worry does come true, what are the chances that you will
                be ok?
              </h2>

              <div className="flex w-full justify-between items-center gap-3">
                {["week", "month", "year"].map((timeframe) => (
                  <label key={timeframe} htmlFor={timeframe}>
                    In a {timeframe}
                    <Controller
                      control={control}
                      name={timeframe}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          min="10"
                          max="100"
                          step="10"
                          className="w-[60px] pl-3 bg-transparent border-b border-black outline-none"
                        />
                      )}
                    />
                    %
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-5">
              <button
                type="submit"
                className="bg-blue-800 rounded-lg p-2 text-white w-full hover:bg-blue-600"
              >
                Save my responses
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
