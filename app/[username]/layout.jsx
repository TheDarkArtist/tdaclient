import ProfileNavbar from "@/components/ProfileNavbar";

export const generateMetadata = async ({ params }) => {
  return {
      title: params.username+"'s Profile",
        metadataBase: new URL(`https://thedarkartist.in/${params.username}`),

  };
};

const Layout = ({ children, params }) => {
  return (
    <>
      <ProfileNavbar username={params.username}>{children}</ProfileNavbar>
    </>
  );
};

export default Layout;
