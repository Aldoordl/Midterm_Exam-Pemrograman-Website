import React from 'react';

/**
 * Architectural Blueprint Skeleton Component
 * Provides drafting-themed shimmer loading states with crosshairs, dashed borders, and CAD styling.
 */

export function SkeletonBox({ className = '' }) {
    return (
        <div className={`bg-gray-100 animate-pulse rounded ${className}`} />
    );
}

export function HeroSkeleton() {
    return (
        <div className="portfolio-container pt-10 pb-8 space-y-6">
            {/* Avatar thumbnail skeleton */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gray-200 bg-gray-100 animate-pulse"></div>

            {/* Available badge skeleton */}
            <div className="w-48 h-6 bg-gray-100 rounded-full animate-pulse"></div>

            {/* Heading lines skeleton */}
            <div className="space-y-3">
                <div className="w-3/4 sm:w-1/2 h-8 bg-gray-200/80 rounded animate-pulse"></div>
                <div className="w-2/3 sm:w-1/3 h-8 bg-gray-100 rounded animate-pulse"></div>
                <div className="w-full max-w-xl h-4 bg-gray-100 rounded animate-pulse pt-2"></div>
                <div className="w-4/5 max-w-md h-4 bg-gray-100 rounded animate-pulse"></div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex gap-3 pt-2">
                <div className="w-28 h-9 bg-gray-200/70 rounded-lg animate-pulse"></div>
                <div className="w-36 h-9 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
        </div>
    );
}

export function MarqueeSkeleton() {
    return (
        <div className="relative border-y border-gray-100 py-6 overflow-hidden bg-gray-50/50">
            <div className="flex gap-4 px-4 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-64 sm:w-72 h-44 rounded-xl border border-gray-200/80 bg-white shrink-0 overflow-hidden"
                    >
                        <div className="browser-header py-1.5 px-3">
                            <div className="flex items-center gap-1">
                                <div className="browser-dot bg-gray-200"></div>
                                <div className="browser-dot bg-gray-200"></div>
                                <div className="browser-dot bg-gray-200"></div>
                            </div>
                        </div>
                        <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
                            <span className="text-[9px] font-mono text-gray-300 uppercase">BLUEPRINT_SLIDE // ...</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ProjectCardSkeleton() {
    return (
        <div className="space-y-4">
            {/* Browser Window Placeholder */}
            <div className="browser-window overflow-hidden border border-gray-200 bg-white">
                <div className="browser-header justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="browser-dot bg-gray-200"></div>
                        <div className="browser-dot bg-gray-200"></div>
                        <div className="browser-dot bg-gray-200"></div>
                    </div>
                    <div className="w-24 h-2.5 bg-gray-200/70 rounded animate-pulse"></div>
                    <div className="w-8"></div>
                </div>

                {/* Blueprint Drawing Area with Crosshair and CAD Pattern */}
                <div className="aspect-video w-full relative bg-gray-50 flex items-center justify-center border-t border-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                        <div className="w-full border-t border-dashed border-gray-300"></div>
                        <div className="absolute h-full border-l border-dashed border-gray-300"></div>
                    </div>
                    <div className="text-[10px] font-mono text-gray-300 tracking-widest uppercase select-none z-10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-300 animate-ping"></span>
                        <span>DRAFTING_BLUEPRINT // LOADING</span>
                    </div>
                </div>
            </div>

            {/* Info Lines */}
            <div className="space-y-2 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="w-1/3 h-5 bg-gray-200/80 rounded animate-pulse"></div>
                    <div className="flex gap-1.5">
                        <div className="w-14 h-5 bg-gray-100 rounded-full animate-pulse"></div>
                        <div className="w-16 h-5 bg-gray-100 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="w-3/4 h-3 bg-gray-100 rounded animate-pulse"></div>
                <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
            </div>
        </div>
    );
}

export function JourneySkeleton() {
    return (
        <div className="space-y-4 pt-2">
            {[1, 2, 3].map((idx) => (
                <div
                    key={idx}
                    className="p-5 rounded-2xl border border-gray-100 bg-white space-y-3 shadow-2xs"
                >
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5 w-2/3">
                            <div className="w-1/2 h-4 bg-gray-200/80 rounded animate-pulse"></div>
                            <div className="w-1/3 h-3 bg-gray-100 rounded animate-pulse"></div>
                        </div>
                        <div className="w-20 h-5 bg-gray-100 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-full h-3 bg-gray-50 rounded animate-pulse"></div>
                    <div className="w-4/5 h-3 bg-gray-50 rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    );
}

export function ProjectDetailSkeleton() {
    return (
        <div className="py-6">
            <div className="architect-frame">
                <span className="crosshair -top-1.75 -left-1.75">+</span>
                <span className="crosshair -top-1.75 -right-1.75">+</span>
                <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                <span className="crosshair -bottom-1.75 -right-1.75">+</span>

                {/* Drafting Scale Header */}
                <div className="border-b border-gray-100 px-6 py-2 flex items-center justify-between text-[10px] text-gray-400 font-mono select-none">
                    <div className="w-24 h-2.5 bg-gray-200/70 rounded animate-pulse"></div>
                    <div className="w-36 h-2.5 bg-gray-100 rounded animate-pulse"></div>
                    <div className="w-16 h-2.5 bg-gray-200/70 rounded animate-pulse"></div>
                </div>

                <div className="p-6 sm:p-10 space-y-8">
                    {/* Breadcrumbs & Title */}
                    <div className="space-y-4">
                        <div className="w-32 h-3 bg-gray-100 rounded animate-pulse"></div>
                        <div className="w-2/3 h-8 bg-gray-200/80 rounded animate-pulse"></div>
                        <div className="w-full max-w-xl h-4 bg-gray-100 rounded animate-pulse"></div>
                    </div>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap gap-2">
                        <div className="w-16 h-6 bg-gray-100 rounded-md animate-pulse"></div>
                        <div className="w-20 h-6 bg-gray-100 rounded-md animate-pulse"></div>
                        <div className="w-24 h-6 bg-gray-100 rounded-md animate-pulse"></div>
                    </div>

                    {/* Image Blueprint Placeholder */}
                    <div className="browser-window border border-gray-200 bg-white">
                        <div className="browser-header">
                            <div className="browser-dot bg-gray-200"></div>
                            <div className="browser-dot bg-gray-200"></div>
                            <div className="browser-dot bg-gray-200"></div>
                        </div>
                        <div className="h-72 w-full bg-gray-50 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <div className="w-full border-t border-dashed border-gray-300"></div>
                                <div className="absolute h-full border-l border-dashed border-gray-300"></div>
                            </div>
                            <div className="text-[10px] font-mono text-gray-300 tracking-widest uppercase">
                                RENDERING_PROJECT_VIEW // ...
                            </div>
                        </div>
                    </div>

                    {/* Content Lines */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="w-full h-3 bg-gray-100 rounded animate-pulse"></div>
                        <div className="w-11/12 h-3 bg-gray-100 rounded animate-pulse"></div>
                        <div className="w-4/5 h-3 bg-gray-100 rounded animate-pulse"></div>
                        <div className="w-full h-3 bg-gray-100 rounded animate-pulse"></div>
                        <div className="w-2/3 h-3 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
