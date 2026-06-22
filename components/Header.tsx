"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BrainClashLogo() {
    return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M18 6C12 6 7 10.5 7 16c0 3.2 1.6 6 4 7.8V26h7V16h-4c0-2.8 1.8-5 4-5V6z" fill="currentColor" className="text-violet-400" />
            <path d="M18 6c6 0 11 4.5 11 10 0 3.2-1.6 6-4 7.8V26h-7V16h4c0-2.8-1.8-5-4-5V6z" fill="currentColor" className="text-fuchsia-400" />
            <path d="M20 14l-4 7h3.5l-2 7 6-9h-3.5l3-5z" fill="currentColor" className="text-amber-300" />
        </svg>
    );
}

interface NavLink {
    href: string;
    label: string;
}

const NAV_LINKS: NavLink[] = [
    { href: "/",            label: "Home" },
    { href: "/play",        label: "Play" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/friends",     label: "Friends" },
    { href: "/stats",       label: "Stats" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-zinc-950/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Brand */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                >
                    <BrainClashLogo />
                    <span className="text-lg font-bold tracking-tight text-white">
            Brain<span className="text-violet-400">Clash</span>
          </span>
                </Link>

                {/* Desktop nav */}
                <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-current={isActive ? "page" : undefined}
                                className={[
                                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                                    isActive
                                        ? "text-white bg-white/10"
                                        : "text-zinc-400 hover:text-white hover:bg-white/[0.06]",
                                ].join(" ")}
                            >
                                {label}
                                {isActive && (
                                    <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-px rounded-full bg-violet-400" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Notification bell */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span aria-hidden="true" className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-violet-400 ring-2 ring-zinc-950" />
                    </button>

                    {/* Profile chip */}
                    <Link
                        href="/profile"
                        className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                    >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/20 text-xs font-semibold text-violet-300">
              A
            </span>
                        <span className="font-medium">Profile</span>
                    </Link>

                    {/* Primary CTA */}
                    <Link
                        href="/play"
                        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-all hover:bg-violet-500 hover:shadow-violet-800/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95"
                    >
                        Play Now
                    </Link>

                    {/* Hamburger */}
                    <button
                        type="button"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMobileOpen((v) => !v)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 md:hidden"
                    >
                        {mobileOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <nav id="mobile-menu" aria-label="Mobile navigation" className="border-t border-white/[0.06] bg-zinc-950 md:hidden">
                    <ul role="list" className="flex flex-col gap-1 px-4 py-3">
                        {NAV_LINKS.map(({ href, label }) => {
                            const isActive = pathname === href;
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        onClick={() => setMobileOpen(false)}
                                        aria-current={isActive ? "page" : undefined}
                                        className={[
                                            "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-violet-500/15 text-violet-300"
                                                : "text-zinc-400 hover:bg-white/[0.06] hover:text-white",
                                        ].join(" ")}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="mt-1 border-t border-white/[0.06] pt-2">
                            <Link
                                href="/play"
                                onClick={() => setMobileOpen(false)}
                                className="flex w-full items-center justify-center rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500 active:scale-95"
                            >
                                ⚡ Play Now
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
