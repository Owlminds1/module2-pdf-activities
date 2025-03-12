import React from "react";
import { FaLightbulb } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";


type myProps = {
  setIsFirstScreen: (value: string) => void;
};

const FirstPage = ({ setIsFirstScreen }: myProps) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex gap-10 flex-col justify-start items-center p-5 ">
      
      <div className=" flex justify-center items-center gap-3">
        <FaStar className="text-3xl text-yellow-300" />
        <h3 className="text-black text-3xl font-bold  text-center">
          AI Explorer Challenge Journal{" "}
        </h3>
        <FaStar className="text-3xl text-yellow-300" />
      </div>
      <div className="flex justify-start gap-3 w-full px-[80px]">
        <label htmlFor="Date" className="text-black text-lg">  Date
        <input type="date" id="Date"  className="border-b border-black outline-none px-5"/>
        </label>
      </div>
       <div className="flex justify-start gap-3 w-full px-[80px] ">
        <label htmlFor="name" className="text-black text-lg ">  Your Name
        <input type="text" id="name"  className="border-b border-black outline-none px-5 w-[140px]"/>
        </label>
      </div>
      <div className="w-[90%] ">
        <div className="py-8">
          <div className="flex  items-center gap-3">
            <FcSearch className="text-3xl "/>
            <h3 className="text-black text-2xl"> AI in My Daily Life</h3>
            </div>
          <p className="text-black text-lg">
            AI is everywhere! Over the next few days, pay close attention to
            where you see AI being used.
          </p>
        </div>
        <h3 className="text-black text-lg font-bold text-left">
          Find at least three AI examples and fill in the table below:
        </h3>
        <div className="w-full grid  grid-cols-12 items-center  pt-6  ">
          <div className="col-span-1 border border-black w-full min-h-[60px] flex justify-center items-center  px-2  text-center">
            <h2 className="font-bold text-black">Sr No</h2>
          </div>
          <div className="col-span-3 border border-black w-full min-h-[60px] flex justify-center items-center  px-2  text-center ">
            <h2 className="font-bold text-black">
              Where I Found It (App, device, or place)
            </h2>
          </div>
          <div className="col-span-2 border border-black w-full min-h-[60px] flex justify-center items-center  px-2  text-center ">
            <h2 className="font-bold text-black">
              What It Does (How does it work?)
            </h2>
          </div>
          <div className="col-span-2 border border-black w-full min-h-[60px] flex justify-center items-center  px-2 text-center">
            <h2 className="font-bold text-black">
              How It Helps People (Why is it useful?)
            </h2>
          </div>
          <div className="col-span-2 border border-black w-full min-h-[60px] flex justify-center items-center  px-2  text-center ">
            <h2 className="font-bold text-black">
              Why AI is Used (What makes it “smart”?)
            </h2>
          </div>
        </div>
        {["", "", ""].map((_, index) => (
          <div
            key={index}
            className=" w-full grid  grid-cols-12  place-items-center"
          >
            <div className="col-span-1 border border-black w-full min-h-[60px] flex justify-center items-center  px-2  text-center"></div>
            <div className="col-span-3 border border-black w-full min-h-[60px] flex justify-center items-center  px-2  text-center "></div>
            <div className="col-span-2 border border-black w-full min-h-[60px] flex justify-center items-center  px-2  text-center "></div>
            <div className="col-span-2 border border-black w-full min-h-[60px] flex justify-center items-center  px-2 text-center"></div>
            <div className="col-span-2 border border-black w-full min-h-[60px] flex justify-center items-center  px-2  text-center "></div>
          </div>
        ))}
      </div>

      <div className="w-[90%]">
        <div className="flex items-center gap-3">
<FaLightbulb className="text-3xl text-yellow-400"/>
        <h3 className="text-black text-lg font-bold text-left">
          Need ideas? Here are some places to look:
        </h3>
        </div>
        <ul className="space-y-2 py-5 list-disc">
          <li className="text-black text-lg ">
            Music or video recommendations (Spotify, Netflix, YouTube)
          </li>
          <li className="text-black text-lg ">
            Voice assistants (Siri, Alexa, Google Assistant)
          </li>
          <li className="text-black text-lg ">
            Navigation apps (Google Maps, Apple maps)
          </li>
          <li className="text-black text-lg ">
            Face filters on social media (Snapchat, Instagram)
          </li>
        </ul>
      </div>

      <button
        onClick={() => {
          setIsFirstScreen("QustionPgae");
          window.scrollTo(0, 0); // Page ko top par le jane ke liye
        }}
        className="bg-yellow-400 font-bold shadow-black shadow-md rounded-lg text-xl px-8 border border-black py-2 text-black hover:scale-95 hover:bg-yellow-300 hover:transition-all hover:ease-in"
      >
        Next
      </button>
    </div>
  );
};

export default FirstPage;
