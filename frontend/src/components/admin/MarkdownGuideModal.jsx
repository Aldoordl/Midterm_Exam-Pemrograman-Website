import React, { useState, useEffect } from 'react';

/**
 * Markdown Syntax Cheatsheet Modal
 * Architectural blueprint style with crosshair markers and instant insert/copy capabilities.
 */
function MarkdownGuideModal({ isOpen, onClose, onInsert }) {
    const [copiedIndex, setCopiedIndex] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const CHEATSHEET = [
        {
            category: 'Headings',
            syntax: '## Section Title\n### Subsection Title',
            preview: (
                <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-900 border-b border-gray-200 pb-0.5">Section Title</p>
                    <p className="text-[11px] font-semibold text-gray-800">Subsection Title</p>
                </div>
            ),
            snippet: '## Section Title\n\n'
        },
        {
            category: 'Text Emphasis',
            syntax: '**Bold text**\n*Italic text*',
            preview: (
                <p className="text-xs text-gray-700">
                    <strong className="font-semibold text-gray-900">Bold text</strong> and <em className="italic text-gray-600">Italic text</em>
                </p>
            ),
            snippet: '**Bold text**'
        },
        {
            category: 'Lists',
            syntax: '- Bullet point 1\n- Bullet point 2\n\n1. First step\n2. Second step',
            preview: (
                <div className="text-[11px] text-gray-700 space-y-0.5">
                    <p>• Bullet item</p>
                    <p>1. Numbered step</p>
                </div>
            ),
            snippet: '- Item 1\n- Item 2\n- Item 3\n'
        },
        {
            category: 'Blockquote / Callout',
            syntax: '> Architectural highlight or architectural note.',
            preview: (
                <blockquote className="border-l-2 border-gray-900 pl-2 text-[11px] italic text-gray-600 bg-gray-50 py-0.5 rounded-r">
                    Architectural highlight or note.
                </blockquote>
            ),
            snippet: '> Important insight or key achievement\n\n'
        },
        {
            category: 'Code',
            syntax: '`inline_code()`\n\n```python\ndef solution():\n    return True\n```',
            preview: (
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 font-mono text-[10px] border border-gray-200">
                    npm install
                </code>
            ),
            snippet: '```typescript\n// Code snippet\n```\n'
        },
        {
            category: 'Links & Divider',
            syntax: '[Antigravity](https://example.com)\n\n---',
            preview: (
                <div className="space-y-1">
                    <span className="text-xs font-medium text-gray-900 underline underline-offset-2">Visit Link</span>
                    <div className="border-t border-dashed border-gray-300 w-full pt-0.5"></div>
                </div>
            ),
            snippet: '[Project Demo](https://...)\n\n---\n\n'
        }
    ];

    const handleCopy = (snippet, index) => {
        navigator.clipboard.writeText(snippet);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1800);
    };

    const handleInsert = (snippet) => {
        if (onInsert) {
            onInsert(snippet);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 max-h-[85vh] flex flex-col">
                {/* Blueprint Crosshair Corners */}
                <span className="crosshair -top-1.75 -left-1.75">+</span>
                <span className="crosshair -top-1.75 -right-1.75">+</span>
                <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                <span className="crosshair -bottom-1.75 -right-1.75">+</span>

                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">BLUEPRINT_SPEC</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 tracking-tight mt-0.5">
                            Markdown Syntax Cheatsheet
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer text-xs font-mono"
                        title="Close Guide (Esc)"
                    >
                        ESC / ✕
                    </button>
                </div>

                {/* Cheatsheet Body */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Use the syntax below to format your project stories. Click <strong className="text-gray-800">Insert</strong> to inject directly into your editor or <strong className="text-gray-800">Copy</strong> to grab the snippet.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {CHEATSHEET.map((item, idx) => (
                            <div
                                key={idx}
                                className="p-3 rounded-xl border border-gray-200/90 bg-gray-50/40 hover:bg-white hover:border-gray-300 transition-all flex flex-col justify-between gap-2.5"
                            >
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-gray-900 tracking-tight">
                                            {item.category}
                                        </span>
                                    </div>
                                    <pre className="p-2 rounded bg-gray-900 text-gray-100 font-mono text-[10px] whitespace-pre-wrap leading-tight selection:bg-gray-700">
                                        {item.syntax}
                                    </pre>
                                    <div className="p-2 rounded bg-white border border-gray-200/70 text-xs">
                                        {item.preview}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(item.snippet, idx)}
                                        className="px-2.5 py-1 text-[10px] font-mono rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
                                    >
                                        {copiedIndex === idx ? '✓ Copied' : 'Copy'}
                                    </button>
                                    {onInsert && (
                                        <button
                                            type="button"
                                            onClick={() => handleInsert(item.snippet)}
                                            className="px-2.5 py-1 text-[10px] font-mono rounded bg-gray-900 hover:bg-black text-white transition-colors cursor-pointer font-medium"
                                        >
                                            + Insert
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span>Press [Esc] to exit</span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn-secondary text-xs px-3 py-1 cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MarkdownGuideModal;
