"use client";
import jsPDF from "jspdf";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type formData = {
  first: string;
  secound: string;
  third: string;
  four: string;
  five: string;
};

const Page = () => {
  const { control, handleSubmit } = useForm<formData>();

  const onSubmit = (data: formData) => {
    const doc = new jsPDF();
    const title = "Story reading and Reflection";
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = doc.getTextWidth(title);
    const center = (pageWidth - textWidth) / 2;

    doc.text(title, center, 20); // Title center me

    let y = 40; // Text start position

    const addTextWithPageBreak = (label: string, content: string, suggestion: string) => {
      doc.text(label, 10, y);
      y += 10;

      const contentText = doc.splitTextToSize(content, pageWidth - 20);
      contentText.forEach((line: string) => {
        if (y + 10 > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 10, y);
        y += 10;
      });

      y += 5; // Extra gap before suggestion

      doc.setFont("helvetica", "italic"); // Suggestion ko italic me dikhane ke liye
      doc.text("Suggestive Response:", 10, y);
      y += 10;

      const suggestionText = doc.splitTextToSize(suggestion, pageWidth - 20);
      suggestionText.forEach((line: string) => {
        if (y + 10 > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 10, y);
        y += 10;
      });

      doc.setFont("helvetica", "normal"); // Normal font wapas karna
      y += 10; // Extra gap before next question
    };

    doc.setFontSize(12);

    addTextWithPageBreak(
      "Question - How does failure help us become more determined?",
      data.first,
      "When we fail, we learn about ourselves, the steps we took that led to failure, and the qualities we needed to incorporate. This helps us become more determined because we review the steps, exercise the qualities that help, and ensure success the next time."
    );

    addTextWithPageBreak(
      "Question -Why is it important to look forward to what we don’t know – the magical yet – in a positive way?",
      data.secound,
      "So much of our lives are about the unknown. There are many things that are yet to happen which are good for us but we don’t know about them in the present. Therefore it’s important to look forward to them in a way that makes us feel positive and elated."
    );

    addTextWithPageBreak(
      "Question - In what ways does making something that isn’t perfect teach us to make the most magnificent thing?",
      data.third,
      "Everything we make has in it the ideas, strategies, hard work, and thought processes that we put in place. So when we do make the most magnificent thing, it will include all the wonderful ingredients of the preceding creations which is what makes it magnificent!"
    );

    addTextWithPageBreak(
      "Question - Why is it crucial to look at the utility of everything that we make? What kind of quality does it demonstrate?",
      data.four,
      "Seeing the utility in every object we make shows us our own capabilities and levels of determination that helped us to keep going despite every object being imperfect. It shows us that we are determined and persevering, and that we are able to learn from every experience."
    );

    addTextWithPageBreak(
      "Question -What are some personal examples of when you made something that wasn’t perfect and yet it showed you the way to make the most magnificent thing?",
      data.five,
      "Many times, the first version of what we make is not perfect, but it teaches us how to refine and improve it until we create something magnificent."
    );

    doc.save("reading_and_Reflection.pdf");
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5 bg-[#F8FAFC]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[800px] border p-3 rounded-lg text-black flex flex-col gap-3 justify-center items-center"
      >
        <h3 className="text-2xl text-black text-center">
          Read The Magical Yet by Angela DiTerlizzi and The Most Magnificent Thing by Ashley Spires to get inspired about determination. Think about the following questions:
        </h3>

        <iframe width="800" height="315" src="https://www.youtube.com/embed/slnUIaKRsXo?si=9k_P8dE_kz86EPrE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        {[
          { name: "first", label: "How does failure help us become more determined?", bg: "bg-blue-300" },
          { name: "secound", label: "Why is it important to look forward to what we don’t know – the magical yet – in a positive way?", bg: "bg-yellow-300" },
          { name: "third", label: "In what ways does making something that isn’t perfect teach us to make the most magnificent thing?", bg: "bg-blue-300" },
          { name: "four", label: "Why is it crucial to look at the utility of everything that we make? What kind of quality does it demonstrate?", bg: "bg-yellow-300" },
          { name: "five", label: "What are some personal examples of when you made something that wasn’t perfect and yet it showed you the way to make the most magnificent thing?", bg: "bg-blue-300" },
        ].map(({ name, label, bg }) => (
          <div key={name} className={`flex flex-col justify-center w-full min-h-[200px] p-3 ${bg} rounded-lg`}>
            <label htmlFor={name} className="text-2xl text-black py-2">{label}</label>
            <Controller
              control={control}
              name={name as keyof formData}
              render={({ field }) => (
                <textarea id={name} className="border border-black rounded-lg p-2" placeholder="Enter your thought" {...field} />
              )}
            />
          </div>
        ))}

        <button className="bg-violet-600 w-full py-2 rounded-lg text-white">Save as PDF</button>
      </form>
    </div>
  );
};

export default Page;
