"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

type AuthView = "login" | "register" | "forgot";
type AuthState = "idle" | "loading" | "success";

interface FieldError {
    field: string;
    message: string;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function BrainClashLogo() {
    return (
        <svg width="40" height="40" viewBox="0 0 36 36" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M18 6C12 6 7 10.5 7 16c0 3.2 1.6 6 4 7.8V26h7V16h-4c0-2.8 1.8-5 4-5V6z" fill="currentColor" className="text-violet-400" />
            <path d="M18 6c6 0 11 4.5 11 10 0 3.2-1.6 6-4 7.8V26h-7V16h4c0-2.8-1.8-5-4-5V6z" fill="currentColor" className="text-fuchsia-400" />
            <path d="M20 14l-4 7h3.5l-2 7 6-9h-3.5l3-5z" fill="currentColor" className="text-amber-300" />
        </svg>
    );
}

// ─── Atoms ───────────────────────────────────────────────────────────────────

function InputField({
                        id,
                        label,
                        type = "text",
                        placeholder,
                        autoComplete,
                        error,
                        required,
                    }: {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
    error?: string;
    required?: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium text-zinc-300">
                {label}
                {required && <span className="ml-1 text-violet-400" aria-hidden="true">*</span>}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={inputType}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={[
                        "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all",
                        "focus:bg-white/[0.06] focus:ring-1",
                        error
                            ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                            : "border-white/[0.08] focus:border-violet-500/60 focus:ring-violet-500/20",
                        isPassword ? "pr-11" : "",
                    ].join(" ")}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                    >
                        {showPassword ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}

function Divider({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-xs text-zinc-600">{label}</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
        </div>
    );
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 active:scale-95"
        >
            {icon}
            {label}
        </button>
    );
}

// ─── Logged-in state ──────────────────────────────────────────────────────────

function LoggedInView({ onLogout }: { onLogout: () => void }) {
    return (
        <div className="flex w-full flex-col items-center gap-6 text-center">
            {/* Avatar */}
            <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/20 text-2xl font-bold text-violet-300 ring-2 ring-violet-500/30">
                    A
                </div>
                <span aria-hidden="true" className="absolute -right-1 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-zinc-950">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
            </div>

            <div>
                <h2 className="text-xl font-bold text-white">Welcome back, Alex!</h2>
                <p className="mt-1 text-sm text-zinc-500">alex@example.com</p>
            </div>

            {/* Stats */}
            <div className="grid w-full grid-cols-3 gap-3">
                {[
                    { value: "1,240", label: "ELO" },
                    { value: "83",    label: "Wins" },
                    { value: "#48",   label: "Rank" },
                ].map(({ value, label }) => (
                    <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                        <div className="text-lg font-bold tabular-nums text-white">{value}</div>
                        <div className="text-xs text-zinc-500">{label}</div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex w-full flex-col gap-2">
                <Link
                    href="/play"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-all hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    Go to Play
                </Link>
                <Link
                    href="/profile"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-300 transition-all hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 active:scale-95"
                >
                    View Profile
                </Link>
                <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-zinc-600 transition-colors hover:text-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign out
                </button>
            </div>
        </div>
    );
}

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm({
                       onSuccess,
                       switchTo,
                   }: {
    onSuccess: () => void;
    switchTo: (v: AuthView) => void;
}) {
    const [state, setState] = useState<AuthState>("idle");
    const [errors, setErrors] = useState<FieldError[]>([]);

    const getError = (field: string) => errors.find((e) => e.field === field)?.message;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        const newErrors: FieldError[] = [];
        if (!email) newErrors.push({ field: "email", message: "Email is required." });
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.push({ field: "email", message: "Enter a valid email address." });
        if (!password) newErrors.push({ field: "password", message: "Password is required." });
        else if (password.length < 6) newErrors.push({ field: "password", message: "Password must be at least 6 characters." });

        if (newErrors.length) { setErrors(newErrors); return; }
        setErrors([]);
        setState("loading");
        // Simulated async login — replace with your auth call
        setTimeout(() => { setState("success"); onSuccess(); }, 1200);
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <InputField id="email"    label="Email"    type="email"    placeholder="you@example.com" autoComplete="email"    required error={getError("email")} />
            <InputField id="password" label="Password" type="password" placeholder="••••••••"         autoComplete="current-password" required error={getError("password")} />

            <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
                    <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-white/[0.04] accent-violet-500" />
                    Remember me
                </label>
                <button type="button" onClick={() => switchTo("forgot")} className="text-sm text-violet-400 transition-colors hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded">
                    Forgot password?
                </button>
            </div>

            <button
                type="submit"
                disabled={state === "loading"}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-all hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-violet-600"
            >
                {state === "loading" ? (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                )}
                {state === "loading" ? "Signing in…" : "Sign in"}
            </button>

            <Divider label="or continue with" />

            <div className="flex gap-2">
                <SocialButton
                    label="Google"
                    icon={
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                    }
                />
                <SocialButton
                    label="Discord"
                    icon={
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#5865F2" aria-hidden="true">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.028.048a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .028-.047c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                        </svg>
                    }
                />
            </div>

            <p className="text-center text-sm text-zinc-600">
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => switchTo("register")} className="font-semibold text-violet-400 transition-colors hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded">
                    Sign up free
                </button>
            </p>
        </form>
    );
}

// ─── Register form ────────────────────────────────────────────────────────────

function RegisterForm({
                          onSuccess,
                          switchTo,
                      }: {
    onSuccess: () => void;
    switchTo: (v: AuthView) => void;
}) {
    const [state, setState] = useState<AuthState>("idle");
    const [errors, setErrors] = useState<FieldError[]>([]);

    const getError = (field: string) => errors.find((e) => e.field === field)?.message;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const username = (form.elements.namedItem("username") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;

        const newErrors: FieldError[] = [];
        if (!username || username.length < 3) newErrors.push({ field: "username", message: "Username must be at least 3 characters." });
        if (!/\S+@\S+\.\S+/.test(email)) newErrors.push({ field: "email", message: "Enter a valid email address." });
        if (password.length < 8) newErrors.push({ field: "password", message: "Password must be at least 8 characters." });
        if (password !== confirm) newErrors.push({ field: "confirm", message: "Passwords do not match." });

        if (newErrors.length) { setErrors(newErrors); return; }
        setErrors([]);
        setState("loading");
        setTimeout(() => { setState("success"); onSuccess(); }, 1400);
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <InputField id="username" label="Username" placeholder="BrainMaster42" autoComplete="username"         required error={getError("username")} />
            <InputField id="email"    label="Email"    type="email" placeholder="you@example.com" autoComplete="email" required error={getError("email")} />
            <InputField id="password" label="Password" type="password" placeholder="Min. 8 characters" autoComplete="new-password" required error={getError("password")} />
            <InputField id="confirm"  label="Confirm Password" type="password" placeholder="Repeat password" autoComplete="new-password" required error={getError("confirm")} />

            <label className="flex cursor-pointer items-start gap-2 text-xs text-zinc-500">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/[0.04] accent-violet-500" />
                <span>
          I agree to the{" "}
                    <Link href="/terms" className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.
        </span>
            </label>

            <button
                type="submit"
                disabled={state === "loading"}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-all hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-violet-600"
            >
                {state === "loading" ? (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                )}
                {state === "loading" ? "Creating account…" : "Create Account"}
            </button>

            <Divider label="or sign up with" />

            <div className="flex gap-2">
                <SocialButton
                    label="Google"
                    icon={
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                    }
                />
                <SocialButton
                    label="Discord"
                    icon={
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#5865F2" aria-hidden="true">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.028.048a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .028-.047c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                        </svg>
                    }
                />
            </div>

            <p className="text-center text-sm text-zinc-600">
                Already have an account?{" "}
                <button type="button" onClick={() => switchTo("login")} className="font-semibold text-violet-400 transition-colors hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded">
                    Sign in
                </button>
            </p>
        </form>
    );
}

// ─── Forgot password form ─────────────────────────────────────────────────────

function ForgotForm({ switchTo }: { switchTo: (v: AuthView) => void }) {
    const [state, setState] = useState<AuthState>("idle");
    const [error, setError] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
        if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address."); return; }
        setError("");
        setState("loading");
        setTimeout(() => setState("success"), 1200);
    }

    if (state === "success") {
        return (
            <div className="flex flex-col items-center gap-5 text-center py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-white">Check your inbox</h3>
                    <p className="mt-1 text-sm text-zinc-500">We sent a reset link to your email. It expires in 15 minutes.</p>
                </div>
                <button type="button" onClick={() => switchTo("login")} className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded">
                    ← Back to sign in
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <p className="text-sm text-zinc-500">Enter your account email and we&apos;ll send you a reset link.</p>
            <InputField id="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" required error={error} />
            <button
                type="submit"
                disabled={state === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-all hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95 disabled:opacity-60"
            >
                {state === "loading" ? (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                ) : null}
                {state === "loading" ? "Sending…" : "Send Reset Link"}
            </button>
            <button type="button" onClick={() => switchTo("login")} className="text-sm text-zinc-600 transition-colors hover:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded">
                ← Back to sign in
            </button>
        </form>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const VIEW_META: Record<AuthView, { title: string; subtitle: string }> = {
    login:    { title: "Welcome back",      subtitle: "Sign in to continue your streak." },
    register: { title: "Create an account", subtitle: "Join thousands of trivia players." },
    forgot:   { title: "Forgot password",   subtitle: "We'll send a reset link to your email." },
};

export default function LoginPage() {
    // Simulated auth state — swap this for real session detection (NextAuth, Clerk, etc.)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState<AuthView>("login");

    const meta = VIEW_META[view];

    return (
        <main id="main-content" className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-zinc-950 px-4 py-12">

            {/* Ambient glow */}
            <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-3xl" />

            <div className="relative w-full max-w-md">

                {/* Card */}
                <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/80 shadow-2xl shadow-black/40 backdrop-blur-sm">

                    {/* Header */}
                    <div className="border-b border-white/[0.06] px-8 py-7">
                        <Link href="/" className="mb-6 flex items-center gap-2.5 w-fit rounded-md transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">
                            <BrainClashLogo />
                            <span className="text-lg font-bold tracking-tight text-white">
                Brain<span className="text-violet-400">Clash</span>
              </span>
                        </Link>

                        {!isLoggedIn && (
                            <>
                                <h1 className="text-xl font-bold text-white">{meta.title}</h1>
                                <p className="mt-1 text-sm text-zinc-500">{meta.subtitle}</p>
                            </>
                        )}

                        {isLoggedIn && (
                            <div>
                                <h1 className="text-xl font-bold text-white">Your Account</h1>
                                <p className="mt-1 text-sm text-zinc-500">You&apos;re signed in and ready to play.</p>
                            </div>
                        )}
                    </div>

                    {/* Body */}
                    <div className="px-8 py-7">
                        {isLoggedIn ? (
                            <LoggedInView onLogout={() => { setIsLoggedIn(false); setView("login"); }} />
                        ) : view === "login" ? (
                            <LoginForm onSuccess={() => setIsLoggedIn(true)} switchTo={setView} />
                        ) : view === "register" ? (
                            <RegisterForm onSuccess={() => setIsLoggedIn(true)} switchTo={setView} />
                        ) : (
                            <ForgotForm switchTo={setView} />
                        )}
                    </div>
                </div>

                {/* Guest link */}
                {!isLoggedIn && (
                    <p className="mt-5 text-center text-xs text-zinc-600">
                        Don&apos;t want an account?{" "}
                        <Link href="/play" className="text-zinc-500 underline underline-offset-4 transition-colors hover:text-zinc-300">
                            Play as guest
                        </Link>
                    </p>
                )}
            </div>
        </main>
    );
}
