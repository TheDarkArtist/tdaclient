import { headers } from "next/headers";
import React from "react";

const GetIP = () => {
  const header = headers();
  const ipAddr = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

  return <h1 className="m-auto w-min">{ipAddr}</h1>;
};

export default GetIP;
