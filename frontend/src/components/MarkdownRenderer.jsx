import React from 'react';

/**
 * Lightweight Architectural Markdown Renderer (React 19 Native)
 * Renders headings, bold, italic, code blocks, blockquotes, lists, links, and horizontal rules
 * without external library overhead or peer-dependency conflicts.
 */
export default function MarkdownRenderer({ content = '', className = '' }) {
    if (!content || typeof content !== 'string') {
        return <p className="text-xs text-gray-400 italic">No content provided.</p>;
    }

    // Helper: parse inline markdown elements (bold, italic, code, link)
    const parseInline = (text) => {
        const parts = [];
        // Regex: inline code (`code`), links ([text](url)), bold (**text**), italic (*text*)
        const regex = /(`[^`]+`)|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Push text before match
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }

            const token = match[0];
            if (token.startsWith('`') && token.endsWith('`')) {
                // Inline Code
                parts.push(
                    <code
                        key={match.index}
                        className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 font-mono text-[11px] border border-gray-200/80"
                    >
                        {token.slice(1, -1)}
                    </code>
                );
            } else if (token.startsWith('[') && token.includes('](')) {
                // Link
                const linkText = token.slice(1, token.indexOf(']('));
                const linkUrl = token.slice(token.indexOf('](') + 2, -1);
                parts.push(
                    <a
                        key={match.index}
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 font-semibold underline underline-offset-2 hover:text-gray-600 transition-colors"
                    >
                        {linkText}
                    </a>
                );
            } else if (token.startsWith('**') && token.endsWith('**')) {
                // Bold
                parts.push(
                    <strong key={match.index} className="font-semibold text-gray-900">
                        {token.slice(2, -2)}
                    </strong>
                );
            } else if (token.startsWith('*') && token.endsWith('*')) {
                // Italic
                parts.push(
                    <em key={match.index} className="italic text-gray-700">
                        {token.slice(1, -1)}
                    </em>
                );
            }

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    // Split content by lines and parse blocks
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    let listItems = [];
    let listType = null; // 'ul' | 'ol'

    const flushList = () => {
        if (listItems.length > 0) {
            if (listType === 'ol') {
                elements.push(
                    <ol key={`ol-${elements.length}`} className="list-decimal pl-5 my-3 space-y-1 text-xs text-gray-700 leading-relaxed">
                        {listItems.map((item, idx) => (
                            <li key={idx}>{parseInline(item)}</li>
                        ))}
                    </ol>
                );
            } else {
                elements.push(
                    <ul key={`ul-${elements.length}`} className="list-disc pl-5 my-3 space-y-1 text-xs text-gray-700 leading-relaxed">
                        {listItems.map((item, idx) => (
                            <li key={idx}>{parseInline(item)}</li>
                        ))}
                    </ul>
                );
            }
            listItems = [];
            listType = null;
        }
    };

    for (let i = 0; i < lines.length; i++) {
        const rawLine = lines[i];
        const trimmed = rawLine.trim();

        // Code block toggle (```)
        if (trimmed.startsWith('```')) {
            if (inCodeBlock) {
                // Closing code block
                elements.push(
                    <pre
                        key={`code-${i}`}
                        className="bg-gray-900 text-gray-100 text-xs font-mono p-4 rounded-xl overflow-x-auto my-4 border border-gray-800 leading-normal"
                    >
                        <code>{codeBlockContent.join('\n')}</code>
                    </pre>
                );
                codeBlockContent = [];
                inCodeBlock = false;
            } else {
                flushList();
                inCodeBlock = true;
            }
            continue;
        }

        if (inCodeBlock) {
            codeBlockContent.push(rawLine);
            continue;
        }

        // Horizontal Rule
        if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
            flushList();
            elements.push(<hr key={`hr-${i}`} className="my-6 border-gray-200" />);
            continue;
        }

        // Headings
        if (trimmed.startsWith('# ')) {
            flushList();
            elements.push(
                <h1 key={`h1-${i}`} className="text-lg font-bold text-gray-900 mt-6 mb-2 border-b border-gray-100 pb-2 tracking-tight">
                    {parseInline(trimmed.slice(2))}
                </h1>
            );
            continue;
        }

        if (trimmed.startsWith('## ')) {
            flushList();
            elements.push(
                <h2 key={`h2-${i}`} className="text-base font-bold text-gray-900 mt-5 mb-2 tracking-tight">
                    {parseInline(trimmed.slice(3))}
                </h2>
            );
            continue;
        }

        if (trimmed.startsWith('### ')) {
            flushList();
            elements.push(
                <h3 key={`h3-${i}`} className="text-xs font-bold text-gray-900 mt-4 mb-1.5 uppercase tracking-wider font-mono">
                    {parseInline(trimmed.slice(4))}
                </h3>
            );
            continue;
        }

        // Blockquotes
        if (trimmed.startsWith('> ')) {
            flushList();
            elements.push(
                <blockquote
                    key={`quote-${i}`}
                    className="border-l-2 border-gray-900 pl-3.5 py-1 my-3 text-xs italic text-gray-600 bg-gray-50/70 rounded-r"
                >
                    {parseInline(trimmed.slice(2))}
                </blockquote>
            );
            continue;
        }

        // Unordered List (- item or * item)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            if (listType !== 'ul') flushList();
            listType = 'ul';
            listItems.push(trimmed.slice(2));
            continue;
        }

        // Ordered List (1. item)
        const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (olMatch) {
            if (listType !== 'ol') flushList();
            listType = 'ol';
            listItems.push(olMatch[2]);
            continue;
        }

        // If we were in a list and hit a non-list item, flush the list
        flushList();

        // Empty line (spacer)
        if (!trimmed) {
            continue;
        }

        // Regular Paragraph
        elements.push(
            <p key={`p-${i}`} className="text-xs text-gray-700 leading-relaxed my-2.5">
                {parseInline(trimmed)}
            </p>
        );
    }

    // Flush any remaining list at the end
    flushList();

    return <div className={`architectural-markdown ${className}`}>{elements}</div>;
}
