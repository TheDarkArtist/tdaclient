import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prevText) => {
        const nextChar = text[index];
        index++;
        return prevText + nextChar;
      });

      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [text]);

  return <div>{displayedText}</div>;
};

export default TypingEffect;
