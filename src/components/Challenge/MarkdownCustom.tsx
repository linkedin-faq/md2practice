import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
/* Use `…/dist/cjs/…` if you’re not in ESM! */
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code({ inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        className={`${className} pointer-events-auto`}
        style={dracula}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={`${className}`} children={children} {...props} />
    );
  },
};

interface Props {
  content: string;
}

const MarkdownCustom = (props: Props): JSX.Element => {
  return <ReactMarkdown components={components} children={props.content} />;
};

export default MarkdownCustom;
