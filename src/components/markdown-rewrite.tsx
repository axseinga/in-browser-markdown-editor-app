import React from "react";
import ReactMarkdown from "react-markdown";

type MarkdownRewriteProps = {
  content: string;
};

export const MarkdownRewrite = ({ content }: MarkdownRewriteProps) => {
  return (
    <ReactMarkdown
      children={content}
      components={{
        h1: ({ ...props }) => (
          <h1 className="preview-h1 dark:text-white" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="preview-h2 dark:text-white" {...props} />
        ),
        h3: ({ ...props }) => (
          <h2 className="preview-h3 dark:text-white" {...props} />
        ),
        h4: ({ ...props }) => (
          <h2 className="preview-h4 dark:text-white" {...props} />
        ),
        h5: ({ ...props }) => (
          <h2 className="preview-h5 dark:text-white" {...props} />
        ),
        h6: ({ ...props }) => <h2 className="preview-h6" {...props} />,
        p: ({ ...props }) => (
          <p className="preview-paragraph text-customGrey-500" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol
            className="preview-paragraph flex list-inside list-decimal flex-col gap-2 text-customGrey-500"
            {...props}
          />
        ),
        ul: ({ ...props }) => (
          <ul
            className="preview-paragraph flex list-inside list-disc flex-col gap-2 text-customGrey-500 marker:text-customOrange"
            {...props}
          />
        ),
        li: ({ ...props }) => (
          <li className="preview-paragraph text-customGrey-500" {...props} />
        ),
        blockquote: ({ children }) => {
          return (
            <blockquote className="my-4 rounded border-l-4 border-customOrange bg-customGrey-200 px-5 dark:bg-customGrey-800 dark:text-white">
              {React.Children.map(children, (child) => {
                if (
                  React.isValidElement(child) &&
                  typeof child.type === "function" &&
                  (child.type as React.ComponentType).name === "p"
                ) {
                  return React.cloneElement(child as React.ReactElement, {
                    className: "preview-paragraph-bold",
                  });
                }
                return child;
              })}
            </blockquote>
          );
        },
        a: ({ href, ...props }) => (
          <a
            href={href}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        pre: ({ children, ...props }) => {
          return (
            <pre className="overflow-x-auto rounded-md bg-customGrey-200 p-4 dark:bg-customGrey-800">
              <code className="rounded" {...props}>
                {children}
              </code>
            </pre>
          );
        },
        code: ({ children, ...props }) => {
          return (
            <code className="text-customGrey-700 dark:text-white" {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};
