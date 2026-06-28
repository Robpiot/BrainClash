"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "versus" | "practice";
type Difficulty = "easy" | "medium" | "hard";

interface CategoryItem {
    emoji: string;
    label: string;
    questionCount: number;
    color: string;
}

interface OnlinePlayer {
    name: string;
    rating: number;
    wins: number;
    status: "searching" | "idle";
}

interface RecentMatch {
    opponent: string;
    result: "win" | "loss";
    score: string;
    category: string;
    timeAgo: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES: CategoryItem[] = [
    { emoji: "🔬", label: "Science",    questionCount: 240, color: "hover:border-blue-500/40   hover:bg-blue-500/10   hover:text-blue-300"   },
    { emoji: "🌍", label: "Geography",  questionCount: 180, color: "hover:border-green-500/40  hover:bg-green-500/10  hover:text-green-300"  },
    { emoji: "🎬", label: "Movies",     questionCount: 320, color: "hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-300" },
    { emoji: "⚽", label: "Sports",     questionCount: 290, color: "hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300" },
    { emoji: "💻", label: "Tech",       questionCount: 210, color: "hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300" },
    { emoji: "🎵", label: "Music",      questionCount: 175, color: "hover:border-pink-500/40   hover:bg-pink-500/10   hover:text-pink-300"   },
    { emoji: "📚", label: "History",    questionCount: 260, color: "hover:border-amber-500/40  hover:bg-amber-500/10  hover:text-amber-300"  },
    { emoji: "🧪", label: "Chemistry",  questionCount: 140, color: "hover:border-cyan-500/40   hover:bg-cyan-500/10   hover:text-cyan-300"   },
    { emoji: "🎨", label: "Art",        questionCount: 120, color: "hover:border-fuchsia-500/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-300" },
    { emoji: "🍕", label: "Food",       questionCount: 155, color: "hover:border-red-500/40    hover:bg-red-500/10    hover:text-red-300"    },
    { emoji: "🧠", label: "General",    questionCount: 400, color: "hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300" },
    { emoji: "🚀", label: "Space",      questionCount: 95,  color: "hover:border-sky-500/40    hover:bg-sky-500/10    hover:text-sky-300"    },
];

const ONLINE_PLAYERS: OnlinePlayer[] = [
    { name: "ZephyrX",  rating: 1840, wins: 142, status: "searching" },
    { name: "NebulaQ",  rating: 1720, wins: 118, status: "idle"      },
    { name: "Axiom",    rating: 1655, wins: 97,  status: "searching" },
    { name: "Solstice", rating: 1590, wins: 83,  status: "idle"      },
    { name: "Vektor",   rating: 1540, wins: 71,  status: "searching" },
];

const RECENT_MATCHES: RecentMatch[] = [
    { opponent: "ZephyrX",  result: "win",  score: "8–5", category: "Science",   timeAgo: "2m ago"  },
    { opponent: "Axiom",    result: "loss", score: "4–7", category: "History",   timeAgo: "18m ago" },
    { opponent: "Solstice", result: "win",  score: "9–6", category: "Movies",    timeAgo: "1h ago"  },
    { opponent: "Vektor",   result: "win",  score: "7–3", category: "Tech",      timeAgo: "3h ago"  },
];

// ─── Atoms ───────────────────────────────────────────────────────────────────

function Badge({ children, color = "violet" }: { children: React.ReactNode; color?: string }) {
    const colorMap: Record<string, string> = {
        violet:  "bg-violet-500/10  text-violet-300  ring-violet-500/20",
        emerald: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20",
        amber:   "bg-amber-500/10   text-amber-300   ring-amber-500/20",
        red:     "bg-red-500/10     text-red-300     ring-red-500/20",
    };
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${colorMap[color] ?? colorMap.violet}`}>
      {children}
    </span>
    );
}

function DifficultyToggle({
                              value,
                              onChange,
                          }: {
    value: Difficulty;
    onChange: (d: Difficulty) => void;
}) {
    const options: { value: Difficulty; label: string; color: string }[] = [
        { value: "easy",   label: "Easy",   color: "data-[active=true]:bg-emerald-500/15 data-[active=true]:text-emerald-300 data-[active=true]:ring-emerald-500/30" },
        { value: "medium", label: "Medium", color: "data-[active=true]:bg-amber-500/15   data-[active=true]:text-amber-300   data-[active=true]:ring-amber-500/30"   },
        { value: "hard",   label: "Hard",   color: "data-[active=true]:bg-red-500/15     data-[active=true]:text-red-300     data-[active=true]:ring-red-500/30"     },
    ];
    return (
        <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 gap-1" role="group" aria-label="Difficulty">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    data-active={value === opt.value}
                    onClick={() => onChange(opt.value)}
                    className={[
                        "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ring-1 ring-transparent",
                        value === opt.value ? "" : "text-zinc-500 hover:text-zinc-300",
                        opt.color,
                    ].join(" ")}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function VersusTab() {
    const [searching, setSearching] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("General");
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");

    return (
        <div className="grid gap-6 lg:grid-cols-3">

            {/* ── Left: Match Setup ─────────────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-4">

                {/* Match config card */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                    <h2 className="mb-5 text-base font-semibold text-white">Match Settings</h2>

                    <div className="flex flex-col gap-5">
                        {/* Category selector */}
                        <div>
                            <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-zinc-500">
                                Category
                            </label>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                                {CATEGORIES.map(({ emoji, label }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => setSelectedCategory(label)}
                                        className={[
                                            "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all active:scale-95",
                                            selectedCategory === label
                                                ? "border-violet-500/50 bg-violet-500/15 text-violet-300"
                                                : "border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200",
                                        ].join(" ")}
                                    >
                                        <span>{emoji}</span>
                                        <span className="hidden sm:inline">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-zinc-500">
                                Difficulty
                            </label>
                            <DifficultyToggle value={difficulty} onChange={setDifficulty} />
                        </div>

                        {/* Round count */}
                        <div>
                            <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-zinc-500">
                                Rounds
                            </label>
                            <div className="flex gap-2">
                                {[5, 10, 15, 20].map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 text-sm font-semibold text-zinc-400 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 active:scale-95 [&.active]:border-violet-500/50 [&.active]:bg-violet-500/15 [&.active]:text-violet-300"
                                        data-rounds={n}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invite friend card */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                    <h2 className="mb-1 text-base font-semibold text-white">Invite a Friend</h2>
                    <p className="mb-4 text-xs text-zinc-500">Share a battle link or enter their username directly.</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter username or paste invite link…"
                            className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-violet-500/60 focus:bg-white/[0.05] focus:ring-1 focus:ring-violet-500/30"
                        />
                        <button
                            type="button"
                            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white active:scale-95"
                        >
                            Invite
                        </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                        <div className="h-px flex-1 bg-white/[0.06]" />
                        <span className="text-xs text-zinc-600">or</span>
                        <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <button
                        type="button"
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.10] bg-transparent py-2.5 text-sm text-zinc-500 transition-colors hover:border-violet-500/40 hover:text-violet-400"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        Copy battle link
                    </button>
                </div>

                {/* Matchmaking CTA */}
                <button
                    type="button"
                    onClick={() => setSearching((v) => !v)}
                    className={[
                        "group flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-bold transition-all active:scale-[0.98]",
                        searching
                            ? "border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/15"
                            : "bg-violet-600 text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 hover:shadow-violet-800/50",
                    ].join(" ")}
                >
                    {searching ? (
                        <>
                            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Searching for opponent…
                            <span className="ml-auto text-xs font-normal opacity-60">Cancel</span>
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                            Find a Match
                        </>
                    )}
                </button>
            </div>

            {/* ── Right: Sidebar ────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-4">

                {/* Online players */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                        <h3 className="text-sm font-semibold text-white">Online Now</h3>
                        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              2,841
            </span>
                    </div>
                    <div className="flex flex-col divide-y divide-white/[0.04]">
                        {ONLINE_PLAYERS.map(({ name, rating, wins, status }) => (
                            <div key={name} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors">
                                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-semibold text-violet-300">
                                    {name[0]}
                                    {status === "searching" && (
                                        <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-zinc-950" />
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <span className="text-sm font-medium text-zinc-200">{name}</span>
                                    <span className="text-xs text-zinc-600">{rating} ELO · {wins}W</span>
                                </div>
                                <button
                                    type="button"
                                    className="rounded-lg border border-white/[0.08] bg-transparent px-2.5 py-1 text-xs font-medium text-zinc-400 transition-colors hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 active:scale-95"
                                >
                                    Challenge
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent matches */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
                    <div className="border-b border-white/[0.06] px-4 py-3">
                        <h3 className="text-sm font-semibold text-white">Recent Matches</h3>
                    </div>
                    <div className="flex flex-col divide-y divide-white/[0.04]">
                        {RECENT_MATCHES.map(({ opponent, result, score, category, timeAgo }) => (
                            <div key={`${opponent}-${timeAgo}`} className="flex items-center gap-3 px-4 py-3">
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${result === "win" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                  {result === "win" ? "W" : "L"}
                </span>
                                <div className="flex flex-1 flex-col">
                                    <span className="text-sm font-medium text-zinc-200">vs {opponent}</span>
                                    <span className="text-xs text-zinc-600">{category} · {timeAgo}</span>
                                </div>
                                <span className="text-sm font-bold tabular-nums text-zinc-400">{score}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function PracticeTab() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");

    return (
        <div className="grid gap-6 lg:grid-cols-3">

            {/* ── Left: Category + Config ───────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-4">

                {/* Category grid */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                    <h2 className="mb-5 text-base font-semibold text-white">Choose a Category</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {CATEGORIES.map(({ emoji, label, questionCount, color }) => (
                            <button
                                key={label}
                                type="button"
                                onClick={() => setSelectedCategory(label === selectedCategory ? null : label)}
                                className={[
                                    "group flex flex-col gap-2 rounded-2xl border px-4 py-4 text-left transition-all active:scale-[0.98]",
                                    selectedCategory === label
                                        ? "border-violet-500/50 bg-violet-500/15 text-violet-300"
                                        : `border-white/[0.08] bg-white/[0.03] text-zinc-400 ${color}`,
                                ].join(" ")}
                            >
                                <span className="text-2xl">{emoji}</span>
                                <div>
                                    <div className="text-sm font-semibold">{label}</div>
                                    <div className="text-xs opacity-60">{questionCount} questions</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Settings */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                    <h2 className="mb-5 text-base font-semibold text-white">Session Settings</h2>
                    <div className="flex flex-col gap-5">
                        <div>
                            <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-zinc-500">Difficulty</label>
                            <DifficultyToggle value={difficulty} onChange={setDifficulty} />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-zinc-500">Questions per session</label>
                            <div className="flex gap-2">
                                {[5, 10, 20, 30].map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 text-sm font-semibold text-zinc-400 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 active:scale-95"
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-zinc-500">Time per question</label>
                            <div className="flex gap-2">
                                {["10s", "20s", "30s", "No limit"].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 text-xs font-semibold text-zinc-400 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 active:scale-95"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Start CTA */}
                <button
                    type="button"
                    disabled={!selectedCategory}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-violet-900/40 transition-all hover:bg-violet-500 hover:shadow-violet-800/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:bg-violet-600"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    {selectedCategory ? `Start ${selectedCategory} Practice` : "Select a category to start"}
                </button>
            </div>

            {/* ── Right: Progress sidebar ───────────────────────────────────────── */}
            <div className="flex flex-col gap-4">

                {/* Your progress */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
                    <div className="border-b border-white/[0.06] px-4 py-3">
                        <h3 className="text-sm font-semibold text-white">Your Progress</h3>
                    </div>
                    <div className="flex flex-col gap-3 p-4">
                        {[
                            { label: "Science",   pct: 78, color: "bg-blue-500" },
                            { label: "History",   pct: 54, color: "bg-amber-500" },
                            { label: "Movies",    pct: 91, color: "bg-orange-500" },
                            { label: "Tech",      pct: 62, color: "bg-violet-500" },
                            { label: "Geography", pct: 35, color: "bg-green-500" },
                        ].map(({ label, pct, color }) => (
                            <div key={label}>
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs font-medium text-zinc-400">{label}</span>
                                    <span className="text-xs tabular-nums text-zinc-600">{pct}%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                                    <div
                                        className={`h-full rounded-full ${color}`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Practice stats */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <h3 className="mb-3 text-sm font-semibold text-white">All-time Stats</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { value: "342",   label: "Sessions"  },
                            { value: "4,180", label: "Correct"   },
                            { value: "87%",   label: "Accuracy"  },
                            { value: "18",    label: "Day streak" },
                        ].map(({ value, label }) => (
                            <div key={label} className="rounded-xl bg-white/[0.03] p-3 text-center">
                                <div className="text-lg font-bold tabular-nums text-white">{value}</div>
                                <div className="text-xs text-zinc-600">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Daily challenge */}
                <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-violet-950/20 p-4">
                    <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-violet-600/10 blur-2xl" />
                    <div className="relative">
                        <div className="mb-1 flex items-center gap-2">
                            <span className="text-base">🎯</span>
                            <h3 className="text-sm font-semibold text-white">Daily Challenge</h3>
                            <Badge color="violet">New</Badge>
                        </div>
                        <p className="mb-3 text-xs leading-relaxed text-zinc-500">
                            10 mixed questions across all categories. Resets in <span className="text-zinc-300 font-medium">9h 42m</span>.
                        </p>
                        <button
                            type="button"
                            className="w-full rounded-xl bg-violet-600/30 px-3 py-2 text-sm font-semibold text-violet-300 ring-1 ring-violet-500/20 transition-colors hover:bg-violet-600/40 active:scale-95"
                        >
                            Start Daily Challenge
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PlayPage({ initialTab }: { initialTab?: Tab } = {}) {
    const [activeTab, setActiveTab] = useState<Tab>(initialTab ?? "versus");

    return (
        <main id="main-content" className="flex-1 bg-zinc-950 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* ── Page header ─────────────────────────────────────────────────── */}
                <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-xs text-zinc-600">
                                        <Link href="/" className="transition-colors hover:text-zinc-400">Home</Link>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                            <span className="text-zinc-400">Play</span>
                        </nav>
                        <h1 className="text-2xl font-bold text-white">Play</h1>
                        <p className="mt-1 text-sm text-zinc-500">Choose a mode and jump in.</p>
                    </div>

                    {/* Player card */}
                    <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-300">A</div>
                        <div>
                            <div className="text-sm font-semibold text-white">Alex</div>
                            <div className="text-xs text-zinc-500">1,240 ELO · <span className="text-emerald-400">↑12 today</span></div>
                        </div>
                        <div className="ml-2 flex flex-col items-end">
                            <Badge color="violet">Rank #48</Badge>
                        </div>
                    </div>
                </div>

                {/* ── Tabs ────────────────────────────────────────────────────────── */}
                <div
                    role="tablist"
                    aria-label="Game modes"
                    className="mb-6 flex gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1"
                >
                    {(
                        [
                            { id: "versus",   label: "⚔️ Versus Battle", desc: "Real-time 1v1"  },
                            { id: "practice", label: "🏠 Practice Mode",  desc: "Solo session"  },
                        ] as { id: Tab; label: string; desc: string }[]
                    ).map(({ id, label, desc }) => (
                        <button
                            key={id}
                            role="tab"
                            aria-selected={activeTab === id}
                            aria-controls={`panel-${id}`}
                            id={`tab-${id}`}
                            type="button"
                            onClick={() => setActiveTab(id)}
                            className={[
                                "flex flex-1 flex-col items-center gap-0.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                                activeTab === id
                                    ? "bg-violet-600 text-white shadow-md shadow-violet-900/40"
                                    : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300",
                            ].join(" ")}
                        >
                            {label}
                            <span className={`text-xs font-normal ${activeTab === id ? "text-violet-200" : "text-zinc-600"}`}>
                {desc}
              </span>
                        </button>
                    ))}
                </div>

                {/* ── Tab panels ──────────────────────────────────────────────────── */}
                <div
                    id="panel-versus"
                    role="tabpanel"
                    aria-labelledby="tab-versus"
                    hidden={activeTab !== "versus"}
                >
                    {activeTab === "versus" && <VersusTab />}
                </div>
                <div
                    id="panel-practice"
                    role="tabpanel"
                    aria-labelledby="tab-practice"
                    hidden={activeTab !== "practice"}
                >
                    {activeTab === "practice" && <PracticeTab />}
                </div>

            </div>
        </main>
    );
}
