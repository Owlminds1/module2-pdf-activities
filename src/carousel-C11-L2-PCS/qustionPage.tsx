"use client";
import jsPDF from "jspdf";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormDataJson  from "@/carousel-C11-L2-PCS/formData.json"
import { FaLightbulb } from "react-icons/fa";


type formData = {
  first: string;
  secound: string;
  third: string;
  four: string;
  five: string;
};
const QustionPage = () => {
  const { control, handleSubmit } = useForm<formData>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      if (file.size > 1024 * 1024) { // 🔥 1MB = 1024 * 1024 bytes
        alert("Image size must be 1MB or less.");
        return; // ❌ Upload cancel
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = (data: formData) => {
    const doc = new jsPDF();
    const title = "AI Explorer Challenge Journal";
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = doc.getTextWidth(title);
    const center = (pageWidth - textWidth) / 2;

    doc.text(title, center, 20); // Title center me

    let y = 40; // Text start position

    const addTextWithPageBreak = (
      label: string,
      content: string,
      suggestion: string
    ) => {
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
      doc.text("", 10, y);
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
      "Step 1 : Name Your AI",
      "Question : What is it called?",
      data.first
    );
    
    addTextWithPageBreak(
     "Step 2: What Problem Does It Solve?",
      "Question : Why is this a problem? Who needs help?",
      data.secound
    );

    addTextWithPageBreak(
      "Step 3: How Does It Work?",
      "Question : Describe how your AI invention would function.",
      data.third
    );

    addTextWithPageBreak(
      "Step 4: Design Your AI!",
      "Question : Draw your invention on paper or a computer, and put here!",
      data.four
    );

    if (selectedImage) {
      doc.addPage();
      doc.text("Step 5: Your AI Design!", 10, 20);
      doc.addImage(selectedImage, "JPEG", 10, 30, 180, 100); // 🖼️ Image Add Karna
    } else {
      addTextWithPageBreak(
        "Step 5: Design Your AI!",
        "Draw your invention on paper or a computer, and put here!",
        "No Image Provided"
      );
    }

    doc.save("AI-Explorer-Challenge-Journal.pdf");
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col gap-8 justify-start items-center p-5">
      <div>
        <div className=" flex justify-center items-center gap-3">
          <FaLightbulb className="text-3xl text-yellow-300"/>
        <h3 className="text-black text-3xl font-bold  text-center">
          My AI Invention!
        </h3>
        </div>
        <p className="text-black text-lg">{`Now, let’s get creative! Imagine you are an AI inventor. Design an AI tool that solves a real problem.`}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[800px] border p-3 rounded-lg text-black flex flex-col gap-3 justify-center items-center"
      >
        {FormDataJson.map((item,index) => (
          <div
            key={item.name}
            className={`flex flex-col justify-center w-full min-h-[200px] p-3  rounded-lg`}
          >
            <h3 className="text-black text-xl">
              <strong>Step {index+1}:</strong> {item.step}
            </h3>

            <label htmlFor={item.name} className="text-2xl text-black py-2">
              {item.label}
            </label>
           {
            index == FormDataJson.length -1 ? (
              <>
              {/* 🖼️ Image Upload Input */}
              <input type="file" accept="image/*" id={item.name} className=" rounded-lg p-2 min-h-[80px]" onChange={handleImageUpload} />
              {/* {selectedImage && <img src={selectedImage} alt="Preview" className="w-32 h-32 mt-3" />} Image Preview */}
            </>
              
            ):
            (
              <Controller
              control={control}
              name={item.name as keyof formData}
              render={({ field }) => (
                <textarea
                  id={item.name}
                  className="border border-black rounded-lg p-2 min-h-[80px]"
                  placeholder="Enter your thought"
                  {...field}
                />
              )}
            />
            )
           }
          </div>
        ))}

        <button className="bg-violet-600 w-full py-2 rounded-lg text-white">
          Save as PDF
        </button>
      </form>
    </div>
  );
};

export default QustionPage;
