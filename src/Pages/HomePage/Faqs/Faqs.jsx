import FaqItem from "./FaqItem";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Faqs = () => {
  const faqRefs = useRef([]);

  useGSAP(() => {
    faqRefs.current.forEach((faq) => {
      gsap.fromTo(
        faq,
        { x: 200 }, // Initial position: off-screen to the left
        {
          x: 0, // Final position: at its original position
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faq,
            start: "top 80%", // Animation starts when FAQ enters the viewport
            end: "top 40%", // Animation ends when FAQ is closer to the center
            scrub: 1,
            markers: true,
            toggleActions: "reverse play reverse reverse", // Animates in and out
          },
        }
      );
    });
  });

  return (
    <div className="py-[5%] faq-container">
      <p className="font-bold text-slate-600 text-3xl pb-[5%] text-center">
        Here is Some of Yours Questions
      </p>
      <div className="flex items-center gap-x-7">
        <div className="pl-[5%]">
          <img src="/faq.png" alt="faq-image" />
        </div>
        <div className="mx-[5%] px-[4%] faq-item faq-item">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              ref={(el) => (faqRefs.current[index] = el)} // Assign ref to each FAQ item
            >
              <FaqItem question={faq.question} answer={faq.answer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
const faqs = [
  {
    id: 1,
    question: "How do I purchase and download books from the app?",
    answer:
      "You can browse books by genre, title, or author, add your chosen book to the cart, and proceed to checkout. Once the payment is complete, the book will be available for download in your library under 'My Books.'",
  },
  {
    id: 2,
    question: "Can I listen to audiobooks on the app?",
    answer:
      "Yes, the app supports audiobooks. If a book has an audio version, you'll see the 'Listen Now' option in your library after purchase. You can stream or download the audiobook for offline listening.",
  },
  {
    id: 3,
    question: "How can I add books to 'My Favorites'?",
    answer:
      "You can add a book to 'My Favorites' by clicking the heart icon on the book's page. Your favorite books will be saved in the 'My Favorites' section for quick access.",
  },
  {
    id: 4,
    question: "How can I publish my own book on the app?",
    answer:
      "To publish your book, create an author account by signing up as an author. Once your account is approved, you can upload your manuscript, set a price, and publish your book to the store.",
  },
  {
    id: 5,
    question: "Can I manage my shopping cart before checkout?",
    answer:
      "Yes, you can add, remove, or update the quantity of books in your shopping cart before proceeding to checkout. Your cart will be saved for later access as long as you’re logged in.",
  },
  {
    id: 6,
    question: "What payment methods are available on the app?",
    answer:
      "The app supports various payment methods, including credit/debit cards, PayPal, and digital wallets. The available options will be shown during the checkout process.",
  },
];
