"use client";

import React, { useEffect } from "react";
import ActionBar from "@/components/ActionBar";

const Resume = () => {
  return (
    <>
      <ActionBar
        title="Resume"
        actions={{
          Download:
            "https://drive.usercontent.google.com/download?id=1DOj8g1HMhTlcvHElqDGDKdza6pZxBL2R&export=download&authuser=0&confirm=t&uuid=f39b4c87-813d-47ce-933b-9eae0ae2e76b&at=APZUnTWykK4N2RNZaJvMt61or87Y:1711975484951",
        }}
      />
      <div className="flex flex-col items-center mt-20 min-h-[80vh] w-full ">
        <div className="w-full md:max-w-[65rem] h-full">
          <div className="flex flex-col w-full  mb-4">
            <h1 className="text-4xl font-bold">Resume</h1>
            <div>It&apos;s updated when edits are made </div>
          </div>
          <embed
            src="https://aiapply.co/r/660aace9bb19a"
            type="application/pdf"
            width="100%"
            height="800px"
          />
        </div>
      </div>
    </>
  );
};

export default Resume;
