import { _latestArticles } from "@/lib/actions/articles";
import { _latestProjects } from "@/lib/actions/projects";
import { BackgroundBoxes } from "@/ui/home/bg-boxes";
import { ContactForm } from "@/ui/home/contact-form";
import { GeminiEffect } from "@/ui/home/gemini-effect";
import { HomeGrid } from "@/ui/home/home-grid";
import LatestList from "@/ui/home/latest-list";
import { MovingCards } from "@/ui/home/moving-cards";
import { StickyScrollReveal } from "@/ui/home/scroll-reveal";
import { TextRevealCardPreview } from "@/ui/home/text-reveal";
import { EvervaultCard } from "@/ui/utils/fancy-hover-card";
import TypingEffect from "@/ui/utils/typing-effect";

export default async function Home() {
  const projects = await _latestProjects();
  const articles = await _latestArticles();
  return (
    <div className="min-h-full w-full flex md:flex-col flex-col  dark:bg-dot-white/[0.2] bg-dot-black/[0.4] overflow-hidden">
      <div className="absolute z-20 w-full h-[24rem]">
        <div>
          <BackgroundBoxes />
        </div>
      </div>
      <div className="">
        <GeminiEffect />
      </div>
      <div className="flex md:flex-row flex-col-reverse w-full">
        <div className="md:max-w-[75vw] overflow-hidden p-4">
          <HomeGrid />
          <MovingCards />
        </div>
        <div className="md:w-[25vw] space-y-4">
          <div className="p-4 bg-white/[.6] dark:backdrop-filter dark:bg-cyan-950 dark:bg-opacity-40 dark:text-cyan-600 dark:backdrop-blur-sm rounded-md m-4">
            <TypingEffect text="W elcome To TDA's" />
          </div>
          <EvervaultCard className="h-60" />
          <div className="m-4 space-y-4">
            <LatestList title="Latest Projects" tda data={projects} />
            <LatestList title="Latest Articles" data={articles} />
          </div>
          <div className="p-4 bg-white dark:backdrop-filter dark:bg-cyan-950 dark:bg-opacity-40 dark:text-cyan-600 dark:backdrop-blur-sm rounded-md m-4">
            <span className="text-cyan-500">Note</span>: It&apos;s just a side project so i work on it whenever i can.
          </div>
        </div>
      </div>
      <div className="">
        <StickyScrollReveal />
        <TextRevealCardPreview />
        <ContactForm />
      </div>
    </div>
  );
}
