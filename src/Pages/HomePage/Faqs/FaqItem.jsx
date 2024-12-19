/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b faq-single">
      <div
        className="flex justify-between items-center cursor-pointer py-6 px-[5%] text-slate-600 bg-slate-100 hover:bg-slate-200"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-semibold">{question}</h2>
        <button className="text-slate-500">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {/* Animate using dynamic height */}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : "0px",
        }}
        className={`overflow-hidden transition-max-height duration-500 ease-in-out`}
      >
        <div className="py-6 px-[7%] text-slate-500">{answer}</div>
      </div>
    </div>
  );
};

export default FaqItem;
