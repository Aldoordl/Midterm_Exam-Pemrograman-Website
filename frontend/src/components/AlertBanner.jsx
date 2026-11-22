import { useEffect } from 'react';
import { IconCheck, IconAlertCircle } from './Icons';

function AlertBanner({
    type = 'success',
    message = '',
    onClose,
    duration = 7000, // Otomatis hilang setelah 7 detik (bisa diatur)
    toast = false    // Jika true, melayang di pojok layar (Floating Toast)
}) {
    // Timer auto-dismiss otomatis jika onClose disediakan
    useEffect(() => {
        if (!message || !onClose || duration <= 0) return;

        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!message) return null;

    const isSuccess = type === 'success';

    const bannerContent = (
        <div
            className={`p-3.5 rounded-xl text-xs font-medium flex items-center justify-between gap-3 transition-all ${toast ? 'shadow-xl backdrop-blur-md' : 'shadow-2xs'
                } ${isSuccess
                    ? 'bg-emerald-50/95 text-emerald-900 border border-emerald-200'
                    : 'bg-red-50/95 text-red-900 border border-red-200'
                }`}
        >
            <div className="flex items-center gap-2">
                {isSuccess ? (
                    <IconCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                    <IconAlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                )}
                <span className="leading-relaxed">{message}</span>
            </div>

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer text-xs p-1 shrink-0 rounded hover:bg-black/5"
                    aria-label="Tutup notifikasi"
                >
                    ✕
                </button>
            )}
        </div>
    );

    // Jika mode toast aktif, letakkan di pojok kanan bawah yang melayang (tanpa menggeser layout form)
    if (toast) {
        return (
            <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
                {bannerContent}
            </div>
        );
    }

    return bannerContent;
}

export default AlertBanner;
