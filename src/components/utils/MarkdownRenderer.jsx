import React from 'react'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CustomH1 = ({ children }) => (
  <h1 className='text-3xl py-1 font-bold' >{children}</h1>
)

const CustomH2 = ({ children }) => (
  <h2 className="text-2xl py-1 font-bold">{children}</h2>
);

const CustomH3 = ({ children }) => (
  <h3 className="text-xl py-1 font-bold">{children}</h3>
);

const CustomH4 = ({ children }) => (
  <h4 className="text-lg py-1 font-bold">{children}</h4>
);

const CustomH5 = ({ children }) => (
  <h5 className="text-base py-1 font-bold">{children}</h5>
);

const CustomH6 = ({ children }) => (
  <h6 className="text-sm py-1 font-bold">{children}</h6>
);

const CustomParagraph = ({ children }) => (
  <span className="leading-relaxed mb-4">{children}</span>
);

const CustomEmphasis = ({ children }) => (
  <em className="text-blue-500">{children}</em>
);

const CustomStrong = ({ children }) => (
  <strong className="text-red-500">{children}</strong>
);

const CustomLink = ({ href, children }) => (
  <a href={href} className="text-blue-500 underline" target="_blank">
    {children}
  </a>
)

const CustomImage = ({ alt, src }) => (
    <img
      className="max-w-full my-4 rounded-md bg-blend-color-dodge shadow-md"
      src={src}
      alt={alt}
    />
);

const CustomBlockQuote = ({ children }) => (
  <blockquote className="bg-gray-900 border-l-4 border-blue-800 px-6 py-0.5 my-6 text-lg italic">
    {children}
  </blockquote>
);

const CodeBlock = (props) => (
  <span className='text-xs md:text-sm'>
  <SyntaxHighlighter showLineNumbers={true} language={props.className && props.className.replace('language-', '')
  } style={atomDark}>
    {props.children}
  </SyntaxHighlighter>
  </span>
);


const CustomTable = ({ children }) => (
  <div className="overflow-x-auto py-4">
    <table className="table-auto border-collapse border border-gray-800">
      {children}
    </table>
  </div>
);

const CustomTableRow = ({ children }) => (
  <tr className="bg-gray-300 dark:bg-gray-900 border-b border-gray-700">{children}</tr>
);

const CustomTableCell = ({ children }) => (
  <td className="p-4 border border-gray-800">{children}</td>
);

const CustomTableHeader = ({ children }) => (
  <th className="p-4 border border-b-[3px] border-gray-700 dark:bg-gray-900 font-semibold">
    {children}
  </th>
);


const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h1: CustomH1,
        h2: CustomH2,
        h3: CustomH3,
        h4: CustomH4,
        h5: CustomH5,
        h6: CustomH6,
        p: CustomParagraph,
        em: CustomEmphasis,
        strong: CustomStrong,
        a: CustomLink,
        img: CustomImage,
        blockquote: CustomBlockQuote,
        code: CodeBlock,
        table: CustomTable,
        tr: CustomTableRow,
        td: CustomTableCell,
        th: CustomTableHeader,
      }}
      remarkPlugins={gfm}
    >
      {content}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer         
