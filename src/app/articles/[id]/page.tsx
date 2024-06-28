import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Header from "./header";
import Body from "./body";
import Sidebar from "./sidebar";
import { Suspense } from "react";
import HeaderFallback from "./fallbacks/header-fallback";
import SidebarFallback from "./fallbacks/sidebar-fallback";
import BodyFallback from "./fallbacks/body-fallback";
import Comments from "./comments";
import AddComment from "./add-comment";
import LoadingDots from "@/ui/utils/loading.dots";

const Page = ({ params }: { params: Params }) => {
  return (
    <div className="flex justify-center md:pt-20 pt-20 md:p-4 p-2 space-x-4 min-h-screen">
      <div className="md:max-w-[60rem] w-full ">
        <Suspense fallback={<HeaderFallback />}>
          <Header params={params} />
        </Suspense>
        <Suspense fallback={<BodyFallback />}>
          <Body id={params.id} />
        </Suspense>
        <AddComment params={params} />
        <Suspense
          fallback={
            <div className="flex w-full my-10 justify-center">
              <LoadingDots color="red" />
            </div>
          }
        >
          <Comments params={params} />
        </Suspense>
      </div>
      <Suspense fallback={<SidebarFallback />}>
        <Sidebar id={params.id} />
      </Suspense>
    </div>
  );
};

export default Page;
