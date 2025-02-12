import NavbarData from "@/lib/navigation/nav.json"
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-5">
      <div className="flex items-center justify-center gap-5">
      {
        NavbarData.map((item,index)=>(

            <Link key={index} className="text-black bg-red-400 py-2 px-5 rounded-lg" href={`/${item.link}`}>{item.link}</Link>

        ))
      }
      </div>
    </div>
  );
}
