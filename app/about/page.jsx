import { Open_Sans } from "next/font/google";
import React from "react";
const os = Open_Sans({subsets:["latin"], weight:"400"})


const About = () => {
  return (
    <div>
      <header className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl text-stone-400 font-bold">Who Am I ??</h1>
        </div>
      </header>

      <div className={`flex justify-center bg-[#121212] w-full px-4 py-8 ${os.className}`}>
        <div className="max-w-[65rem] px-2">
          <div className="py-8">
            <div className="prose">
              <h1 className="mb-4">
                I’m an Enthusiast coder, not only during my daytime job, but
                also (even more so) during my spare time.
              </h1>
              <p className="mb-4">
                My coding adventures started back at the age of sixteen when I
                got a PC and discovered that you couldn’t just play games on it,
                but also write your own games.
              </p>
              <p className="mb-4">
                So I’ve been writing code for more than 5 years now, moving from
                one programming language to the other, working with dozens of
                different APIs on different platforms, thus making coding a huge
                and important part of my life, with thousands of lines of code
                written and thousands of hours spent in front of development
                environments and debuggers.
              </p>
              <p className="mb-4">
                I want to be an active open source contributor, with pretty much
                all of my coding efforts being available to the public. Many
                hours i&apos;ve spent thinking about new ideas for the projects,
                they will be made available once i compelete them.
              </p>
              <p className="mb-4">
                In 2022 I participated in Smart India Hackathoan where we
                develooped a live sttalite tracking applicaton, it&apos;d use
                sattalite TLE data to get the position lattitue, longitue and
                other information and return a nice earth interface with which a
                user can interect with and see the satelite in real time
              </p>
              <p className="mb-4">
                By day I’m a software developer trying to understand different
                concepts, implementing projects on them, By night i dwelve deep
                into cyber-sec understanding different concepts.
              </p>
            </div>

            <div className="prose mt-8">
              <h2>Programming languages I actively use :</h2>
              <ul className="list-disc pl-8 mb-4">
                <li>Python</li>
                <li>Rust</li>
                <li>Java</li>
                <li>SQL (Multiple dialects)</li>
                <li>JavaScript</li>
                <li>C</li>
                <li>Zig</li>
                <li>C#</li>
              </ul>

              <h2>
                Most of my projects, tutorials and games use following
                API&apos;s
              </h2>
              <ul className="list-disc pl-8 mb-4">
                <li>Windows API (WinAPI)</li>
                <li>libc crate (Cross-platform)</li>
                <li>nix crate (Cross-platform)</li>
                <li>
                  Cross-platform libraries (e.g., crossbeam, tokio, serde)
                </li>
                <li>Windows Registry API</li>
                <li>Linux System Calls</li>
                <li>Filesystem APIs</li>
                <li>Networking APIs</li>
              </ul>

              <h2>Platforms I develop for (or have developed for) :</h2>
              <ul className="list-disc pl-8 mb-4">
                <li>Windows</li>
                <li>Linux</li>
                <li>Android</li>
                <li>Web</li>
              </ul>

              <h2>Some of the IDEs I use regularly :</h2>
              <ul className="list-disc pl-8 mb-4">
                <li>Vim</li>
                <li>Visual Studio (Code)</li>
                <li>Android Studio</li>
                <li>Eclipse</li>
                <li>Lazarus</li>
              </ul>

              <h2>List of some of the web frameworks I’ve used :</h2>
              <ul className="list-disc pl-8 mb-4">
                <li>Twitter Bootstrap</li>
                <li>React.js</li>
                <li>Next.js</li>
                <li>Django</li>
                <li>Django Rest Framework</li>
                <li>Actix Web</li>
                <li>Rocket</li>
                <li>jQuery and jQuery UI</li>
              </ul>

              <h2>Some additional developer-related things I often use:</h2>
              <ul className="list-disc pl-8 mb-4">
                <li>Source control tools (git, SVN)</li>
                <li>Docker</li>
                <li>CI/CD (Jenkins, git)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
