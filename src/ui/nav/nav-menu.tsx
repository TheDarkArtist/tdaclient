import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import NavMenuProfile from "./nav-menu-profile";
import { MutableRefObject, useEffect, useRef } from "react";
import Link from "next/link";

interface NavMenuProps {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  menuBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

const NavMenu: React.FC<NavMenuProps> = ({
  isMenuOpen,
  setMenuOpen,
  menuBtnRef,
}) => {
  const { data, status } = useSession();
  const menuRef = useRef<HTMLMenuElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuBtnRef.current &&
        menuRef.current &&
        !menuBtnRef.current.contains(e.target as Node) &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [menuBtnRef, setMenuOpen]);
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.menu
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={menuRef}
          className={`absolute rounded-2xl  w-80 dark:bg-black bg-white/[.8]  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] flex ${isMenuOpen ? "block" : "hidden"} top-20 right-4 border dark:border-stone-600 border-gray-400 shadow-lg dark:shadow-cyan-800/[0.4] shadow-stone-300/[.6]`}
        >
          <div className="absolute rounded-2xl pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

          <div className="z-10 p-4 w-full ">
            <div>
              <NavMenuProfile data={data as any} />
            </div>
            <div className="flex flex-col space-y-4">
              {status !== "authenticated" ? (
                <button
                  className="w-full h-10 dark:bg-sky-950 bg-stone-200 rounded-xl"
                  onClick={() => signIn("google")}
                >
                  Sign In
                </button>
              ) : (
                <>
                  <Link
                    href={`/${data?.user.username}`}
                    onClick={() => setMenuOpen(false)}
                    className="w-full content-center text-center h-10 dark:bg-sky-950 bg-stone-200 rounded-xl"
                  >
                    My Profile
                  </Link>
                  <button
                    className="w-full h-10 dark:bg-sky-950 bg-stone-200 rounded-xl"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.menu>
      )}
    </AnimatePresence>
  );
};

export default NavMenu;
