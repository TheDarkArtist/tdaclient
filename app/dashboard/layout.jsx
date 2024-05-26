import ActionBar from "@/components/ActionBar";

export const metadata = {
  title: "Settings",
  description: "Configure this app for your preferences",
};

export default function RootLayout({ children }) {
  return (
    <>
      <ActionBar title="Dashboard" actions={{ }} />
      <div className="flex justify-center">
        <div className="top-0 max-w-[80rem] pt-16 w-full">
          {children}
        </div>
      </div>
    </>
  );
}
