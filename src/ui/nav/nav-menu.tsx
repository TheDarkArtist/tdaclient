import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import NavMenuProfile from "./nav-menu-profile";

const NavMenu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  const { data, status } = useSession();
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.menu
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`absolute rounded-2xl  w-80 dark:bg-black bg-white/[.8]  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] flex ${isMenuOpen ? "block" : "hidden"} top-20 right-4 border dark:border-stone-600 border-gray-400 shadow-lg dark:shadow-cyan-800/[0.4] shadow-stone-300/[.6]`}
        >
          <div className="absolute rounded-2xl pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="z-10 p-4 w-full">
            <div>
              <NavMenuProfile data={data as any } />
            </div>
            {status !== "authenticated" ? (
              <button
                className="w-full h-10 dark:bg-sky-950 rounded-xl"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                Sign In
              </button>
            ) : (
              <button
                className="w-full h-10 dark:bg-sky-950 rounded-xl"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            )}
          </div>
        </motion.menu>
      )}
    </AnimatePresence>
  );
};

export default NavMenu;
