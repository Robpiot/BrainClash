"use client";

import Link from "next/link";
import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type BadgeColor = "violet" | "amber" | "emerald" | "fuchsia";

interface StatCardProps {
    value: string;
    label: string;
    icon: React.ReactNode;
}

interface ModeCardProps {
    title: string;
    description: string;
    badge: string;
    badgeColor: BadgeColor;
    cta: string;
    href: string;
    highlight?: boolean;
}

interface LeaderboardEntry {
    rank: number;
    name: string;
    score: string;
    wins: number;
}

interface CategoryItem {
    emoji: string;
    label: string;
}

// ─── Atoms ───────────────────────────────────────────────────────────────────

function Badge({ children, color = "violet" }: { children: React.ReactNode; color?: BadgeColor }) {
    const colorMap: Record<BadgeColor, string> = {
        violet:  "bg-violet-500/10  text-violet-300  ring-violet-500/20",
        amber:   "bg-amber-500/10   text-amber-300   ring-amber-500/20",
        emerald: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20",
        fuchsia: "bg-fuchsia-500/10 text-fuchsia-300 ring-fuchsia-500/20",
    };
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${colorMap[color]}`}>
      {children}
    </span>
    );
}

function StatCard({ value, label, icon }: StatCardProps) {
    return (
        <div className="flex flex-col gap-1 rounded-xl border border-white/8 bg-white/3 p-5 transition-colors hover:bg-white/5">
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold tabular-nums text-white">{value}</span>
                <span className="text-zinc-500">{icon}</span>
            </div>
            <span className="text-sm text-zinc-500">{label}</span>
        </div>
    );
}

function ModeCard({ title, description, badge, badgeColor, cta, href, highlight = false }: ModeCardProps) {
    return (
        <article
            className={[
                "group relative flex flex-col gap-5 rounded-2xl border p-6 transition-all duration-200",
                highlight
                    ? "border-violet-500/40 bg-violet-950/30 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-900/30"
                    : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/5",
            ].join(" ")}
        >
            {highlight && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
            )}
            <Badge color={badgeColor}>{badge}</Badge>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
            </div>
            <Link
                href={href}
                className={[
                    "mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all active:scale-95",
                    highlight
                        ? "bg-violet-600 text-white shadow-md shadow-violet-900/40 hover:bg-violet-500"
                        : "border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white",
                ].join(" ")}
            >
                {cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </Link>
        </article>
    );
}

function LeaderboardRow({ rank, name, score, wins }: LeaderboardEntry) {
    const rankEmoji: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };
    const rankColor: Record<number, string> = {
        1: "text-amber-300",
        2: "text-zinc-300",
        3: "text-orange-400",
    };
    return (
        <div className={["flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.04]", rank === 1 ? "bg-amber-500/[0.05] hover:bg-amber-500/[0.08]" : ""].join(" ")}>
      <span className={`w-6 shrink-0 text-center text-sm font-bold tabular-nums ${rankColor[rank] ?? "text-zinc-600"}`}>
        {rank <= 3 ? rankEmoji[rank] : rank}
      </span>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-semibold text-violet-300">
                {name[0]}
            </div>
            <span className="flex-1 text-sm font-medium text-zinc-200">{name}</span>
            <span className="text-xs text-zinc-500">{wins}W</span>
            <span className="text-sm font-bold tabular-nums text-white">{score}</span>
        </div>
    );
}

function CategoryPill({ emoji, label }: CategoryItem) {
    return (
        <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 active:scale-95"
        >
            <span>{emoji}</span>
            {label}
        </button>
    );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, name: "ZephyrX",  score: "9,840", wins: 142 },
    { rank: 2, name: "NebulaQ",  score: "9,210", wins: 118 },
    { rank: 3, name: "Axiom",    score: "8,755", wins: 97  },
    { rank: 4, name: "Solstice", score: "8,320", wins: 83  },
    { rank: 5, name: "Vektor",   score: "7,980", wins: 71  },
];

const CATEGORIES: CategoryItem[] = [
    { emoji: "🔬", label: "Science" },
    { emoji: "🌍", label: "Geography" },
    { emoji: "🎬", label: "Movies" },
    { emoji: "⚽", label: "Sports" },
    { emoji: "💻", label: "Tech" },
    { emoji: "🎵", label: "Music" },
    { emoji: "📚", label: "History" },
    { emoji: "🧪", label: "Chemistry" },
];

// ─── Icons ───────────────────────────────────────────────────────────────────

const UsersIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const HelpCircleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
    </svg>
);
const ZapIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);
const GridIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
);

// ─── Main Section ────────────────────────────────────────────────────────────

export default function MainSection() {
    return (
        <main id="main-content" className="flex-1 bg-zinc-950">

            {/* Hero */}
            <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-white/[0.06] px-4 py-20 sm:py-28 sm:px-6 lg:px-8">
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-600/8 blur-3xl" />
                <div className="relative mx-auto max-w-3xl text-center">
                    <Badge color="violet">
                        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                        Real-time battles live
                    </Badge>
                    <h1 id="hero-heading" className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Trivia battles.{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Real-time.</span>
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-base leading-relaxed text-zinc-400 sm:text-lg">
                        Challenge friends to head-to-head trivia duels, climb the global leaderboard, and prove who&apos;s the smartest in the room.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link href="/play/versus" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-all hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95">
                            <ZapIcon />
                            Start a Battle
                        </Link>
                        <Link href="/play/practice" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95">
                            Practice Solo
                        </Link>
                    </div>
                    <p className="mt-6 text-xs text-zinc-500">
                        <span aria-hidden="true" className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse align-middle" />
                        2,841 players online right now
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section aria-label="Platform statistics" className="border-b border-white/[0.06] bg-white/[0.015] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <StatCard value="124K" label="Players worldwide"  icon={<UsersIcon />} />
                    <StatCard value="3.2M" label="Questions answered" icon={<HelpCircleIcon />} />
                    <StatCard value="48K"  label="Battles today"      icon={<ZapIcon />} />
                    <StatCard value="12"   label="Categories"         icon={<GridIcon />} />
                </div>
            </section>

            {/* Game Modes */}
            <section aria-labelledby="modes-heading" className="border-b border-white/[0.06] px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10">
                        <h2 id="modes-heading" className="text-2xl font-bold text-white">Choose your mode</h2>
                        <p className="mt-1 text-sm text-zinc-500">Solo practice or live head-to-head battles — your call.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <ModeCard title="⚔️ Versus Battle" description="Challenge a friend or get matched with a random opponent. Answer faster and more accurately to win real-time duels." badge="Multiplayer" badgeColor="violet" cta="Find a Match" href="/play/versus" highlight />
                        <ModeCard title="🏠 Practice Mode" description="Sharpen your knowledge across 12 categories at your own pace. No pressure, just learning." badge="Solo" badgeColor="emerald" cta="Start Practice" href="/play/practice" />
                        <ModeCard title="🏆 Tournament" description="Compete in scheduled tournaments with brackets, prizes, and global rankings. Coming soon." badge="Coming soon" badgeColor="amber" cta="Get Notified" href="/tournaments" />
                    </div>
                </div>
            </section>

            {/* Community */}
            <section aria-labelledby="community-heading" className="border-b border-white/[0.06] px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10">
                        <h2 id="community-heading" className="text-2xl font-bold text-white">Community</h2>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-2">

                        {/* Leaderboard */}
                        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                                <h3 className="text-sm font-semibold text-white">Global Top Players</h3>
                                <Link href="/leaderboard" className="rounded-sm text-xs font-medium text-violet-400 transition-colors hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">See all →</Link>
                            </div>
                            <div className="flex flex-col gap-1 p-3">
                                {LEADERBOARD.map((entry) => <LeaderboardRow key={entry.rank} {...entry} />)}
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                            <div className="border-b border-white/[0.06] px-5 py-4">
                                <h3 className="text-sm font-semibold text-white">Trivia Categories</h3>
                                <p className="mt-0.5 text-xs text-zinc-500">Pick a topic and start a session</p>
                            </div>
                            <div className="flex flex-wrap gap-2.5 p-5">
                                {CATEGORIES.map(({ emoji, label }) => <CategoryPill key={label} emoji={emoji} label={label} />)}
                            </div>
                            <div className="border-t border-white/[0.06] px-5 py-3">
                                <Link href="/categories" className="rounded-sm text-xs font-medium text-violet-400 transition-colors hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">View all 12 categories →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section aria-labelledby="cta-heading" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-950/60 via-zinc-950 to-fuchsia-950/40" />
                <div aria-hidden="true" className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl" />
                <div className="relative mx-auto max-w-2xl text-center">
                    <h2 id="cta-heading" className="text-3xl font-extrabold tracking-tight text-white">Ready to prove your knowledge?</h2>
                    <p className="mt-4 text-base text-zinc-400">Create your free account and join thousands of players competing every day.</p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition-all hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95">
                            Create Free Account
                        </Link>
                        <Link href="/play" className="rounded-sm text-sm font-medium text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">
                            Or play as guest
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
