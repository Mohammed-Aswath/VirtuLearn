/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Reusable Markdown renderer for assistant responses
 * BACKEND INTEGRATION: N/A (pure frontend). When backend returns Markdown content, this renders it.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components = {
  h1: (props) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
  h2: (props) => <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  h3: (props) => <h3 className="text-lg font-semibold mt-3 mb-2" {...props} />,
  p: (props) => <p className="mb-2 leading-relaxed" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 space-y-1 mb-2" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 space-y-1 mb-2" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  code: ({ inline, className, children, ...props }) => (
    inline ? (
      <code className="px-1 py-0.5 rounded bg-muted text-foreground/90" {...props}>{children}</code>
    ) : (
      <pre className="bg-muted/50 border rounded p-3 overflow-x-auto text-sm"><code className={className} {...props}>{children}</code></pre>
    )
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 pl-3 italic text-muted-foreground" {...props} />
  ),
  a: ({ href, children, ...props }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-primary underline hover:no-underline" {...props}>{children}</a>
  ),
  table: (props) => <div className="overflow-x-auto"><table className="min-w-full text-sm" {...props} /></div>,
  th: (props) => <th className="text-left font-semibold border-b py-1 pr-3" {...props} />,
  td: (props) => <td className="align-top py-1 pr-3" {...props} />,
};

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content || ''}
    </ReactMarkdown>
  );
}


