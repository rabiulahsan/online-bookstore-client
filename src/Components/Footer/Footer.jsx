import {
  AiFillLinkedin,
  AiOutlineGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex  justify-center items-centermt-[5%] py-[3%]  bg-slate-800">
      <div className="">
        <div className="flex justify-center items-center gap-5  mb-4">
          <a
            title="Github Profile link"
            href="https://github.com/rabiulahsan"
            target="blank"
            className="footer-link"
          >
            <AiOutlineGithub></AiOutlineGithub>
          </a>

          <a
            title="Linkedin Profile link"
            href="https://www.linkedin.com/in/rabiul-ahsan/"
            target="blank"
            className="footer-link"
          >
            <AiFillLinkedin></AiFillLinkedin>
          </a>

          <a
            title="Instagram Profile link"
            href="https://www.instagram.com/_rabiul_ahsan_/"
            target="blank"
            className="footer-link"
          >
            <AiOutlineInstagram></AiOutlineInstagram>
          </a>
          <a
            title="Portfolio link"
            href="https://rabiulahsan.netlify.app/"
            target="blank"
            className="footer-link"
          >
            <FaUserTie></FaUserTie>
          </a>
        </div>
        <div className="text-center">
          <p className="text-slate-200 font-semibold">
            Copyright © 2023 - All right reserved by{" "}
            <span className=" text-xl font-bold text-rose-500">Book Verse</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
