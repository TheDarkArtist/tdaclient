"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const messagesHeader = ["No.", "Date", "Message", "Name", "Email"];

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/messages");
        const data = await response.json();
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log("Error fetching messages ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex justify-center pb-10">
      <div className="w-full text-green-400 md:w-[80%]">
        <div className="mx-.5 overflow-y-auto overflow-x-auto ">
          <table className="w-full border-collapse ">
            <thead>
              <tr className="border">
                {messagesHeader.map((header, index) => (
                  <td key={index} className="p-2 border border-green-900">
                    {header}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {messages
                ? messages.map((msg, index) => [
                    <tr key={index}>
                      <td className="p-2 border border-green-900 ">{index}</td>
                      <td className="p-2 flex flex-col text-sm border border-green-900 ">
                        <span>{msg.creationDate}</span>
                        <span>{msg.creationTime}</span>
                      </td>
                      <td className="p-2 border border-green-900 ">
                        {msg.message}
                      </td>
                      <td className="p-2 border border-green-900 ">
                        {msg.name}
                      </td>
                      <td className="p-2 border border-green-900 ">
                        {msg.email}
                      </td>
                    </tr>,
                  ])
                : "no messages"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
