import React from 'react';

/**
 * Markdown Toolbar Component
 * Quick formatting action bar attached above the content textarea with smart text selection wrapping.
 */
function MarkdownToolbar({ textareaRef, content, onChange, onOpenGuide }) {
    /**
     * Wrap selected text or insert placeholder at cursor position
     */
    const insertFormatting = (prefix, suffix = '', placeholder = '') => {
        const textarea = textareaRef?.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentVal = textarea.value || '';

        const selectedText = currentVal.substring(start, end);
        const replacement = selectedText.length > 0
            ? `${prefix}${selectedText}${suffix}`
            : `${prefix}${placeholder}${suffix}`;

        const nextVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);

        // Notify parent form state
        onChange(nextVal);

        // Restore cursor & focus
        setTimeout(() => {
            textarea.focus();
            if (selectedText.length > 0) {
                // Keep the selection wrapped
                textarea.setSelectionRange(start, start + replacement.length);
            } else {
                // Highlight placeholder so typing immediately replaces it
                textarea.setSelectionRange(start + prefix.length, start + prefix.length + placeholder.length);
            }
        }, 10);
    };

    const TOOLS = [
        { label: 'H2', title: 'Heading 2', action: () => insertFormatting('\n## ', '\n', 'Section Title') },
        { label: 'H3', title: 'Heading 3', action: () => insertFormatting('\n### ', '\n', 'Subsection Title') },
        { label: 'B', title: 'Bold (**text**)', className: 'font-bold', action: () => insertFormatting('**', '**', 'bold text') },
        { label: 'I', title: 'Italic (*text*)', className: 'italic font-serif', action: () => insertFormatting('*', '*', 'italic text') },
        { label: 'Quote', title: 'Blockquote (> text)', action: () => insertFormatting('\n> ', '\n', 'Architectural note') },
        { label: '`code`', title: 'Inline Code (`code`)', className: 'font-mono text-[10px]', action: () => insertFormatting('`', '`', 'code') },
        { label: '```', title: 'Code Block', className: 'font-mono text-[10px]', action: () => insertFormatting('\n```javascript\n', '\n```\n', '// code here') },
        { label: '• List', title: 'Bullet List (- item)', action: () => insertFormatting('\n- ', '\n', 'Bullet item') },
        { label: '1. List', title: 'Numbered List (1. item)', action: () => insertFormatting('\n1. ', '\n', 'Numbered step') },
        { label: 'Link', title: 'Link ([text](url))', action: () => insertFormatting('[', '](https://example.com)', 'link text') },
        { label: '— HR', title: 'Horizontal Rule (---)', action: () => insertFormatting('\n\n---\n\n', '', '') },
    ];

    return (
        <div className="flex items-center justify-between gap-1 p-1 bg-gray-50 border border-gray-200 border-b-0 rounded-t-lg text-xs overflow-x-auto">
            {/* Quick Actions */}
            <div className="flex items-center gap-0.5">
                {TOOLS.map((tool, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={tool.action}
                        title={tool.title}
                        className={`px-2 py-1 rounded text-[11px] text-gray-700 hover:text-gray-900 hover:bg-gray-200/70 border border-transparent hover:border-gray-300 transition-all cursor-pointer whitespace-nowrap ${tool.className || ''}`}
                    >
                        {tool.label}
                    </button>
                ))}
            </div>

            {/* Guide Button */}
            <button
                type="button"
                onClick={onOpenGuide}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-semibold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0"
                title="Open Markdown Cheatsheet Guide"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>? Guide</span>
            </button>
        </div>
    );
}

export default MarkdownToolbar;
