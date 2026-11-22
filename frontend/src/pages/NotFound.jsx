import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="py-16">
            <div className="architect-frame max-w-lg mx-auto">
                {/* Corner Crosshairs */}
                <span className="crosshair -top-1.75 -left-1.75">+</span>
                <span className="crosshair -top-1.75 -right-1.75">+</span>
                <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                <span className="crosshair -bottom-1.75 -right-1.75">+</span>

                {/* Top Drafting Scale */}
                <div className="relative border-b border-gray-100 px-6 py-2 flex items-center justify-between text-[10px] text-gray-400 font-mono select-none">
                    <span>ERR_404 // INVALID ROUTE</span>
                    <span className="tracking-widest">COORDINATE UNDEFINED</span>
                    <span>NULL</span>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-12 text-center space-y-6">
                    <div className="space-y-2">
                        <div className="text-5xl sm:text-6xl font-bold font-mono text-gray-900 tracking-tight">
                            404
                        </div>
                        <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                            Page Not Found
                        </h1>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                            The blueprint coordinate you are trying to access does not exist or has been relocated.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link to="/" className="btn-primary text-xs px-6 py-2.5 inline-flex items-center gap-2">
                            <span>← Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
