import Image from "next/image";
import NavLinks from "./nav-links";
import NavProfile from "./nav-profile";
import ThemeToggle from "../utils/theme-toggle";
import Sidenav from "../sidenav/sidenav";
import Link from "next/link";

const Navbar = async () => {
  return (
    <>
      <nav className="flex fixed z-30 w-full bg-white/[.6] dark:bg-black px-4 py-2 justify-between items-center dark:backdrop-filter dark:bg-opacity-60 dark:backdrop-blur-sm backdrop-filter  backdrop-blur-md border-b dark:border-red-950 border-red-950/[.3]">
        <section className="flex gap-10 items-center">
          <Link href={"/"} className="w-20 h-min">
            <Image src="/logo.png" alt="TDA Logo" height={100} width={200} />
          </Link>
          <NavLinks />
        </section>
        <section className="flex items-center gap-4 mr-10 md:mr-0">
          <ThemeToggle />
          <NavProfile />
        </section>
      </nav>
      <Sidenav />
    </>
  );
};

export default Navbar;
