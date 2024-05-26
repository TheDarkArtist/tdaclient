import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <div
        className="fixed brightness-50  h-screen w-screen blur-sm bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-green-code.png')" }}
      ></div>
      <div className="fixed h-screen w-full flex justify-center">
        <div className="brightness-150">{children}</div>
      </div>
    </>
  );
};

export default layout;
