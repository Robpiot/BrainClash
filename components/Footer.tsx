import Link from "next/link";

function BrainClashLogo() {
    return (
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <path d="M18 6C12 6 7 10.5 7 16c0 3.2 1.6 6 4 7.8V26h7V16h-4c0-2.8 1.8-5 4-5V6z" fill="currentColor" className="text-violet-400" />
            <path d="M18 6c6 0 11 4.5 11 10 0 3.2-1.6 6-4 7.8V26h-7V16h4c0-2.8-1.8-5-4-5V6z" fill="currentColor" className="text-fuchsia-400" />
            <path d="M20 14l-4 7h3.5l-2 7 6-9h-3.5l3-5z" fill="currentColor" className="text-amber-300" />
        </svg>
    );
}

interface FooterLinkItem { label: string; href: string; }
interface SocialLinkItem { label: string; href: string; icon: React.ReactNode; }

const FOOTER_LINKS: Record<string, FooterLinkItem[]> = {
    Product: [
        { label: "Play Now",       href: "/play" },
        { label: "Leaderboard",    href: "/leaderboard" },
        { label: "Categories",     href: "/categories" },
        { label: "Tournaments",    href: "/tournaments" },
    ],
    Account: [
        { label: "Sign Up",        href: "/register" },
        { label: "Log In",         href: "/login" },
        { label: "Profile",        href: "/profile" },
        { label: "Stats",          href: "/stats" },
    ],
    Social: [
        { label: "Friends",        href: "/friends" },
        { label: "Activity Feed",  href: "/activity" },
        { label: "Invite Friend",  href: "/invite" },
    ],
    Support: [
        { label: "Help Center",    href: "/help" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use",   href: "/terms" },
        { label: "Contact",        href: "/contact" },
    ],
};

const SOCIAL_LINKS: SocialLinkItem[] = [
    {
        label: "Twitter / X",
        href: "https://twitter.com",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: "Discord",
        href: "https://discord.com",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.028.048a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .028-.047c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "https://github.com",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/[0.06] bg-zinc-950" aria-label="Site footer">

            {/* Main grid */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">

                    {/* Brand column */}
                    <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-1">
                        <Link href="/" className="flex w-fit items-center gap-2 rounded-md transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">
                            <BrainClashLogo />
                            <span className="text-base font-bold text-white">Brain<span className="text-violet-400">Clash</span></span>
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
                            Real-time trivia battles for the curious and competitive. Test your knowledge, challenge friends, top the charts.
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                            {SOCIAL_LINKS.map(({ label, href, icon }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-500 transition-colors hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <div key={category} className="flex flex-col gap-3">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600">{category}</h3>
                            <ul role="list" className="flex flex-col gap-2">
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link href={href} className="rounded-sm text-sm text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.04] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
                    <p className="text-xs text-zinc-600">© {currentYear} BrainClash. All rights reserved.</p>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        All systems operational
                    </div>
                    <nav aria-label="Legal links" className="flex items-center gap-4">
                        {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Cookies", href: "/cookies" }].map(({ label, href }) => (
                            <Link key={label} href={href} className="rounded-sm text-xs text-zinc-600 transition-colors hover:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
