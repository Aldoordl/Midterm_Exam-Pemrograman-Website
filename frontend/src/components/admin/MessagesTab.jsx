function MessagesTab({ messages }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between pb-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Inquiries Received ({messages.length})
                </h3>
                <span className="text-[10px] font-mono text-gray-400">All Messages</span>
            </div>

            <div className="space-y-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="p-5 rounded-2xl border border-gray-200 bg-white space-y-2 hover:border-gray-300 transition-colors shadow-xs"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">{msg.sender_name}</span>
                                <span className="text-gray-400 font-mono text-[11px]">&lt;{msg.sender_email}&gt;</span>
                            </div>
                            <span className="text-gray-400 font-mono text-[10px]">
                                {msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap pt-1 border-t border-gray-100">
                            {msg.message_body}
                        </p>
                    </div>
                ))}

                {messages.length === 0 && (
                    <div className="text-center py-12 text-xs text-gray-400 font-mono border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                        No messages received yet.
                    </div>
                )}
            </div>
        </div>
    );
}

export default MessagesTab;

