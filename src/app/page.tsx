import { _latestArticles } from "@/lib/actions/articles";
import { _latestProjects } from "@/lib/actions/projects";
import { GeminiEffect } from "@/ui/home/gemini-effect";
import { HomeGrid } from "@/ui/home/home-grid";
import LatestList from "@/ui/home/latest-list";
import { EvervaultCard } from "@/ui/utils/fancy-hover-card";
import { Meteors } from "@/ui/utils/meteor";

export default async function Home() {
  return (
    <div className="w-full flex md:flex-col flex-col overflow-hidden bg-grid-cyan-600/[.2]">
      <Meteors className="z-20" />
      <div>
        <div className="flex justify-center items-center flex-col bg-transparent bg-dot-cyan-800 dark:bg-dot-cyan-600 absolute h-60 top-20 z-20 w-full">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-green-600 to-green-800 text-5xl md:text-7xl text-green-600 font-bold">
            Welcome
          </h1>
          <p className=" text-center font-bold dark:bg-black bg-white md:text-lg text-sky-600">
            Accept who you are and you can become who you want to be.
          </p>
        </div>
        <div className="bg-white my-4">
          <GeminiEffect />
        </div>
        <div className="flex md:flex-row flex-col-reverse m-4 md:space-x-4 ">
          <div className="md:w-[80%] my-4 md:my-0">
            <HomeGrid />
          </div>
          <div className="h-min md:min-w-[25rem] md:max-w-[28rem] md:w-[20%] space-y-4">
            <EvervaultCard className="h-80" />
            <LatestList title="Latest Projects" tda />
            <LatestList title="Latest Articles" />
          </div>
        </div>
      </div>
    </div>
  );
}
