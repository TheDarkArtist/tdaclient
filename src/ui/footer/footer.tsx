import React from "react";
import { SparklesCore } from "../utils/sparkles";
import GetIP from "../utils/get-ip";

const Footer = () => {
  return (
    <div className="h-20">
      <GetIP />
    </div>
  );
};

export default Footer;
