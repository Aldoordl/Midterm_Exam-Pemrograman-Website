import { useState } from 'react';
import { messageService } from '../../services';
import { IconCheck, IconTrash, IconMail } from '../Icons';
import ConfirmModal from '../ConfirmModal';
import AlertBanner from '../AlertBanner';

function MessagesTab({ messages = [], token, onRefresh }) {
    const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'read'
    const [loadingId, setLoadingId] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    const unreadCount = messages.filter(m => m.is_read !== true).length;
    const readCount = messages.filter(m => m.is_read === true).length;

    const filteredMessages = messages.filter(msg => {
        if (filter === 'unread') return msg.is_read !== true;
        if (filter === 'read') return msg.is_read === true;
        return true;
    });

    const handleToggleRead = async (id, currentIsRead) => {
        setLoadingId(id);
        setStatus({ type: '', message: '' });

        try {
            const nextStatus = currentIsRead === true ? false : true;
            const res = await messageService.updateStatus(id, { is_read: nextStatus });

            if (res.data?.status === 'error') {
                setStatus({
                    type: 'error',
                    message: res.data?.message || 'Gagal memperbarui status pesan.'
                });
                return;
            }

            setStatus({
                type: 'success',
                message: nextStatus ? 'Pesan ditandai sebagai sudah dibaca.' : 'Pesan ditandai sebagai belum dibaca.'
            });

            if (onRefresh) onRefresh();
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Gagal memperbarui status pesan.'
            });
        } finally {
            setLoadingId(null);
        }
    };

    const confirmDeleteMessage = async () => {
        if (!deleteTargetId) return;
        setLoadingId(deleteTargetId);
        setStatus({ type: '', message: '' });

        try {
            await messageService.delete(deleteTargetId);

            setStatus({ type: 'success', message: 'Pesan berhasil dihapus!' });
            if (onRefresh) onRefresh();
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Gagal menghapus pesan.'
            });
        } finally {
            setLoadingId(null);
            setDeleteTargetId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-100">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <IconMail className="w-4 h-4 text-gray-700" />
                        <h2 className="text-sm font-bold text-gray-900">Inbox Pesan Masuk</h2>
                    </div>
                    <p className="text-[11px] text-gray-500">
                        Kelola formulir kontak dan pesan yang dikirim oleh pengunjung web.
                    </p>
                </div>

                {/* Filter Tabs (Consistent Segmented Control) */}
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl border border-gray-200/80 text-xs font-semibold">
                    <button
                        type="button"
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            filter === 'all'
                                ? 'bg-white text-gray-900 shadow-xs'
                                : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        <span>All</span>
                        <span className="text-[10px] text-gray-400 font-mono ml-1">({messages.length})</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter('unread')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            filter === 'unread'
                                ? 'bg-white text-gray-900 shadow-xs'
                                : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        <span>Unread</span>
                        <span className="text-[10px] text-gray-400 font-mono ml-1">({unreadCount})</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter('read')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            filter === 'read'
                                ? 'bg-white text-gray-900 shadow-xs'
                                : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        <span>Read</span>
                        <span className="text-[10px] text-gray-400 font-mono ml-1">({readCount})</span>
                    </button>
                </div>
            </div>

            {/* Notification Banner */}
            <AlertBanner
                type={status.type}
                message={status.message}
                onClose={() => setStatus({ type: '', message: '' })}
            />

            {/* Message List */}
            <div className="space-y-3">
                {filteredMessages.map((msg) => {
                    const isUnread = msg.is_read !== true;
                    const isLoading = loadingId === msg.id;

                    return (
                        <div
                            key={msg.id}
                            className={`p-5 rounded-2xl border transition-all space-y-3 relative ${
                                isUnread
                                    ? 'border-gray-300 bg-white shadow-xs'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                        >
                            {/* Card Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    {/* Monochromatic Status Badge */}
                                    {isUnread ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-gray-900 text-white">
                                            NEW
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-gray-100 text-gray-400 border border-gray-200">
                                            READ
                                        </span>
                                    )}

                                    <span className={`text-xs ${isUnread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                                        {msg.sender_name}
                                    </span>
                                    <span className="text-gray-400 font-mono text-[11px]">
                                        &lt;{msg.sender_email}&gt;
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400 font-mono text-[10px]">
                                        {msg.created_at ? new Date(msg.created_at).toLocaleString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : ''}
                                    </span>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleRead(msg.id, msg.is_read)}
                                            disabled={isLoading}
                                            className="btn-secondary text-[11px] py-1 px-2.5 cursor-pointer flex items-center gap-1.5"
                                            title={isUnread ? "Tandai sudah dibaca" : "Tandai belum dibaca"}
                                        >
                                            <IconCheck className="w-3 h-3 text-gray-500" />
                                            <span>{isUnread ? 'Mark as Read' : 'Mark Unread'}</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setDeleteTargetId(msg.id)}
                                            disabled={isLoading}
                                            className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                            title="Hapus pesan"
                                        >
                                            <IconTrash className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="pt-2 border-t border-gray-100">
                                <p className="text-xs leading-relaxed whitespace-pre-wrap text-gray-700 font-normal">
                                    {msg.message_body}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {filteredMessages.length === 0 && (
                    <div className="text-center py-12 text-xs text-gray-400 font-mono border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                        {filter === 'unread'
                            ? 'Tidak ada pesan yang belum dibaca.'
                            : filter === 'read'
                            ? 'Belum ada pesan yang sudah dibaca.'
                            : 'Belum ada pesan masuk.'}
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={!!deleteTargetId}
                title="Hapus Pesan"
                message="Apakah Anda yakin ingin menghapus pesan ini secara permanen dari database?"
                onConfirm={confirmDeleteMessage}
                onCancel={() => setDeleteTargetId(null)}
            />
        </div>
    );
}

export default MessagesTab;
