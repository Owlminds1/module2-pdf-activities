"use client";
import { FormValues } from "@/pdfCarousel-C9-L2-A4/index";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import "swiper/css";
import "swiper/css/navigation";



type MyProps = {
  setIsFirstScreen: (value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormValues[]>>;
};

export default function SlideSecound({ setIsFirstScreen, setFormData }: MyProps) {
  const { control, handleSubmit, } = useForm<FormValues>({
      defaultValues: {
        first: "",
        secound: "",
      },
      resolver: undefined, // Ye line
      mode: "onChange", // Ye line
    });
    
    
  
    const onSubmit = (data: FormValues) => {
      setFormData((prev) => [...prev, data]); // Purane data ko array mein rakh ke naya data push karega
      // Object ko merge kar raha hai
      setIsFirstScreen("third");
      console.log(data);
    };

  return (
    <div className="bg-white min-h-screen flex items-center flex-col gap-8 justify-center p-5 ">
      <h3 className="text-4xl text-black min-h-[70px]">School Helper</h3>
      <div className="grid grid-cols-12 w-full place-items-center ">
        <div className="col-span-6">
          <Image
            src="/images/LIBRARY.jpg"
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

            <div>
            <button className="bg-yellow-400 px-8 py-2 rounded-lg text-xl">
          Next
             </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
