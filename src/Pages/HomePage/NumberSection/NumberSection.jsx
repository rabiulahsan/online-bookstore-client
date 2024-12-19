import { LuBookOpen, LuUserPen } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";

const NumberSection = () => {
  return (
    <div className="flex justify-between items-center bg-slate-100 w-3/5 mx-auto py-[5%]">
      {numbers.map((num, i) => (
        <div
          className="flex flex-col items-center justify-center gap-y-1"
          key={i}
        >
          <span className="text-3xl font-bold text-rose-500">{num.icon}</span>
          <span className="font-bold text-slate-600">{num.title}</span>
          <span className="text-slate-600">{num.desc}</span>
        </div>
      ))}
    </div>
  );
};

export default NumberSection;

const numbers = [
  {
    icon: <LuBookOpen></LuBookOpen>,
    title: "10k+ Books",
    desc: "Discover your desired books",
  },
  {
    icon: <FaRegUser></FaRegUser>,
    title: "1k+ Users",
    desc: "Lots of readers",
  },
  {
    icon: <LuUserPen></LuUserPen>,
    title: "100+ Authors",
    desc: "Find favourite authors",
  },
  {
    icon: <BiSupport></BiSupport>,
    title: "24/7 Support",
    desc: "Call us any time",
  },
];
