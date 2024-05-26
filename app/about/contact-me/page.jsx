"use client";
import { db } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import React, { useRef } from "react";
import { getCurrentDate, getCurrentTime } from "@/app/utils";
import { notify } from "@/components/Notification";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Open_Sans } from "next/font/google";
import Link from "next/link";

const os = Open_Sans({ subsets: ["latin"], weight: "400" });

const ContactMe = () => {
  const refs = {
    name: useRef(null),
    email: useRef(null),
    msg: useRef(null),
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "messages"), {
        name: refs.name.current.value,
        email: refs.email.current.value,
        message: refs.msg.current.value,
        creationDate: getCurrentDate(),
        creationTime: getCurrentTime(),
      });
      notify("Created", "Transmited!");
      refs.name.current.value = "";
      refs.email.current.value = "";
      refs.msg.current.value = "";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className={`flex flex-col w-full items-center pb-10 ${os.className} `}>
      <header className="flex justify-between items-center bg-sky-950 text-white py-6 w-full">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl text-stone-400 font-bold">Contact Me</h1>
        </div>
        <div className="flex items-center mr-6 space-x-4">
          <Link href={"https://www.linkedin.com/in/thedarkartist/"}>
            <FaLinkedin className="h-10 w-10 " />
          </Link>
          <Link href={"https://www.instagram.com/thedarkartist00/"}>
            <FaInstagram className="h-10 w-10" />
          </Link>
          <Link href={"https://github.com/TheDarkArtist"}>
            <FaGithub className="h-10 w-10" />
          </Link>
        </div>
      </header>

      <div className="md:min-w-[65rem] md:max-w-[65rem] flex flex-wrap">
        <div className="md:max-w-[40rem] md:min-w-[40rem] px-4 mt-4 w-full ">
          <div className=" m-2 text-start space-y-1">
            <h1>Hey</h1>
            <h2>
              Welcome to the communication hub. I&apos;ve set up this interface
              to hear from the outside world, but be warned – I&apos;m always
              watching.
            </h2>
            <p>
              Use the form below to transmit your message. I&apos;ll decrypt it
              on my end and decide if it&apos;s worthy of a response.
            </p>
            <p>
              Remember, your message could be intercepted at any moment. Choose
              your words wisely.
            </p>
            <p>Stay vigilant,</p>
            <p>TheDarkArtist</p>
          </div>

          <div>
            <form
              onSubmit={handelSubmit}
              className="flex flex-col  mt-6 space-y-4"
            >
              <div className="flex flex-col">
                <label
                  className="block text-sm font-bold mb-1"
                  htmlFor="message"
                >
                  Name
                </label>
                <input
                  ref={refs.name}
                  className="bg-[#1B1E20] text-white rounded-sm px-2 py-1 focus:outline-none"
                  type="text"
                  placeholder="put in your cool alias"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-sm font-bold mb-1"
                  htmlFor="message"
                >
                  Email
                </label>
                <input
                  ref={refs.email}
                  className="bg-[#1B1E20] text-white rounded-sm px-2 py-1 focus:outline-none"
                  type="email"
                  placeholder="i'll reply on this email"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-sm font-bold mb-1"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  ref={refs.msg}
                  id="message"
                  className="bg-[#1B1E20] text-white rounded-sm px-2 py-1 h-40 focus:outline-none"
                  placeholder="message"
                  type="text"
                  required
                />
              </div>
              <div className="flex justify-between h-10">
                <div></div>
                <div className="space-x-2">
                  <button
                    type="submit"
                    className="bg-green-900 text-stone-200 px-2 py-0.5 w-20 text-center rounded-sm hover:bg-green-800 hover:text-stone-100"
                  >
                    Transmit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
