function ConfirmModal({
    isOpen,
    title = "Confirm Deletion",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="relative w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-xl p-6 space-y-4">
                <span className="crosshair -top-1.75 -left-1.75">+</span>
                <span className="crosshair -top-1.75 -right-1.75">+</span>
                <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                <span className="crosshair -bottom-1.75 -right-1.75">+</span>

                <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-gray-900 tracking-tight">{title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{message}</p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn-secondary text-xs px-3 py-1.5 cursor-pointer"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 hover:bg-black text-white transition-all cursor-pointer shadow-xs"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
