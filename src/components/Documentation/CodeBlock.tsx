import React, { useState } from 'react';
import './CodeBlock.css';

interface CodeBlockProps {
  language: 'javascript' | 'python' | 'curl' | 'bash' | 'json';
  code: string;
  description?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language,
  code,
  description,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      {description && <p className="code-block-description">{description}</p>}
      <div className="code-block-header">
        <span className="code-block-language">{language}</span>
        <button
          className="code-block-copy"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="code-block-content">
        <code>{code}</code>
      </pre>
    </div>
  );
};
