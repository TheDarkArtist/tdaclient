import { Open_Sans } from "next/font/google";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const os = Open_Sans({ subsets: ["latin"], weight: "300" });

const Footer = () => {
  return (
    <footer
      className={`flex flex-col items-center border-t border-b border-green-950 text-white p-8 ${os.className}`}
    >
      <div className="w-full max-w-[60rem] space-y-4">
        <div className="flex flex-wrap justify-between">
          <div className="my-2">
            <h1 className="font-bold my-1">Contact Me</h1>
            <p>Phone: +91 7426 07 2284</p>
            <p>Email: tda@thedarkartist.in</p>
            <Link href={"/about/contact-me"}>Contact Form</Link>
          </div>
          <div>
            <h1 className="font-bold my-2">Usefull Links</h1>
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-2">
                <Link className="hover:text-green-800" href={"/projects"}>
                  Projects
                </Link>
                <Link className="hover:text-green-800" href={"/blogs"}>
                  Blogs
                </Link>
                <Link className="hover:text-green-800" href={"/about/resume"}>
                  Resume
                </Link>
                <Link className="hover:text-green-800" href={"/about"}>
                  About
                </Link>
              </div>
              <div className="flex flex-col space-y-2">
                <Link
                  className="hover:text-green-800"
                  href={"/about/contact-me"}
                >
                  Leave a message </Link>
                <Link className="hover:text-green-800" href={"/auth/signup"}>
                  Sign up
                </Link>
              </div>
            </div>
          </div>

          <div className="text-sm space-y-2">
            <h1 className="font-bold text-lg my-1">Reach out</h1>
            <Link
              className="flex items-center space-x-2 hover:text-green-800"
              href={"https://www.linkedin.com/in/thedarkartist/"}
            >
              <FaLinkedin className="h-6 w-6" /> <p>LinkedIn</p>
            </Link>
            <Link
              className="flex items-center space-x-2 hover:text-green-800"
              href={""}
            >
              <FaInstagram className="h-6 w-6" /> <p>Instagram</p>
            </Link>
            <Link
              className="flex  items-center space-x-2 hover:text-green-800"
              href={""}
            >
              <FaTwitter className="h-6 w-6" /> <p>Twitter</p>
            </Link>
            <Link
              className="flex  items-center space-x-2 hover:text-green-800"
              href={"https://github.com/TheDarkArtist"}
            >
              <FaGithub className="h-6 w-6" /> <p>Github</p>
            </Link>
          </div>
        </div>
        <p>@Developed and manintained by Kushagra Sharma</p>
      </div>

    </footer>
  );
};

export default Footer;
