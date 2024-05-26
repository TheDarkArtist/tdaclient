import { Open_Sans } from "next/font/google";

const os = Open_Sans({ subsets: ["latin"], weight: "500" });

const Home = () => {
  return (
    <>
      <div
        className={`${os.className} md:container md:mx-auto bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-yellow-500 via-red-400 text-[6vw] font-extrabold px-4 mb-10`}
      >
        <div className="text-2xl font-extrabold py-6">
          <h1>Hey, Welcome.</h1>
        </div>
        <div className="text-xl space-y-4">
          <p>
            Dive into the world of technology, hacking, and software development
            with my personal portfolio website. Here, you&apos;ll find a curated
            collection of projects, achievements, and insights that reflect my
            journey in the realms of coding, hacking, and beyond.
          </p>
          <p>
            Explore a range of software development endeavors, from intricate
            coding projects to innovative solutions. Delve into the art of
            hacking, where security meets creativity, and witness firsthand the
            expertise honed over years of passionate exploration.
          </p>

          <p>
            But this website isn&apos;t just about code; it&apos;s a reflection
            of my journey, my philosophies, and my perspective on the
            ever-evolving landscape of technology. Join me in unraveling the
            mysteries of AI, pondering the depths of philosophical thought, and
            navigating the endless possibilities that emerge at the intersection
            of man and machine.
          </p>

          <p>
            Whether you&apos;re a fellow coder seeking inspiration, a curious
            mind hungry for knowledge, or simply an enthusiast eager to explore
            the digital frontier, you&apos;re invited to embark on this journey
            with me.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
