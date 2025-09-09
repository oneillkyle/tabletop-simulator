import { useMemo, useState } from 'react';
import Seo from '../components/Seo';

const API_BASE = import.meta.env.VITE_API_HOST ?? '';

type RawContext = unknown;
type AnswerResp = {
    answer?: string;
    context?: RawContext;
    error?: string;
    [k: string]: any;
};

type NormItem = { text: string; url?: string; title?: string };

function decodeTitleFromWikiUrl(url: string): string | undefined {
    try {
        const u = new URL(url);
        if (!/wikipedia\.org$/i.test(u.hostname)) return undefined;
        // Typical paths: /wiki/Some_Page or /w/index.php?title=Some_Page
        let raw: string | null = null;
        if (u.pathname.startsWith('/wiki/')) {
            raw = u.pathname.replace('/wiki/', '');
        } else if (u.pathname.includes('/w/') && u.searchParams.has('title')) {
            raw = u.searchParams.get('title');
        }
        if (!raw) return undefined;
        return decodeURIComponent(raw).replace(/_/g, ' ');
    } catch {
        return undefined;
    }
}

function extractFirstUrl(text: string): {
    cleanText: string;
    url?: string;
    title?: string;
} {
    // Grab first http(s) URL (lazy match until whitespace or closing paren)
    const m = text.match(/https?:\/\/[^\s\])]+/i);
    if (!m) return { cleanText: text };
    const url = m[0];
    const title = decodeTitleFromWikiUrl(url);
    // Remove the URL from the visible text if it’s tacked on at the end
    const cleanText = text
        .replace(url, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
    return { cleanText: cleanText || (title ?? url), url, title };
}

export default function PlayAiWiki() {
    const [q, setQ] = useState('');
    const [loading, setLoading] = useState(false);
    const [resp, setResp] = useState<AnswerResp | null>(null);
    const [err, setErr] = useState<string | null>(null);

    async function ask(e: React.FormEvent) {
        e.preventDefault();
        if (!q.trim()) return;
        setLoading(true);
        setErr(null);
        setResp(null);
        try {
            const r = await fetch(`${API_BASE}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Your backend expects "question"; if you support "query" too, include it
                body: JSON.stringify({ question: q })
            });
            if (!r.ok) throw new Error(`HTTP ${r.status}: ${await r.text()}`);
            const data = (await r.json()) as AnswerResp;
            setResp(data);
        } catch (e: any) {
            setErr(e?.message ?? 'Request failed');
        } finally {
            setLoading(false);
        }
    }

    // Normalize context into an array of NormItem { text, url?, title? }
    const contextItems = useMemo<NormItem[]>(() => {
        const out: NormItem[] = [];
        const c = resp?.context;
        if (!c) return out;

        const pushFromString = (s: string) => {
            // Split big blocks into digestible chunks
            const paras =
                s.split(/\n{2,}/g).filter(Boolean).length > 1
                    ? s.split(/\n{2,}/g).filter(Boolean)
                    : s.split(/\n+|(?<=\.)\s+/g).filter(Boolean);
            paras.forEach((p) => {
                const { cleanText, url, title } = extractFirstUrl(p);
                out.push({ text: cleanText, url, title });
            });
        };

        if (Array.isArray(c)) {
            c.forEach((item) => {
                if (typeof item === 'string') {
                    pushFromString(item);
                } else if (item && typeof item === 'object') {
                    const text =
                        (item as any).text ??
                        (item as any).passage ??
                        (item as any).snippet ??
                        (item as any).chunk ??
                        JSON.stringify(item);
                    const url =
                        (item as any).url ?? (item as any).source ?? undefined;
                    const title =
                        (item as any).title ??
                        (url ? decodeTitleFromWikiUrl(String(url)) : undefined);
                    const {
                        cleanText,
                        url: foundUrl,
                        title: foundTitle
                    } = extractFirstUrl(String(text));
                    out.push({
                        text: cleanText,
                        url: url ?? foundUrl,
                        title: title ?? foundTitle
                    });
                }
            });
            return out.filter((x) => x.text || x.url);
        }

        if (typeof c === 'string') {
            pushFromString(c);
            return out;
        }

        if (typeof c === 'object') {
            const text =
                (c as any).text ??
                (c as any).passage ??
                (c as any).snippet ??
                (c as any).chunk ??
                JSON.stringify(c);
            const url = (c as any).url ?? (c as any).source ?? undefined;
            const title =
                (c as any).title ??
                (url ? decodeTitleFromWikiUrl(String(url)) : undefined);
            const {
                cleanText,
                url: foundUrl,
                title: foundTitle
            } = extractFirstUrl(String(text));
            out.push({
                text: cleanText,
                url: url ?? foundUrl,
                title: title ?? foundTitle
            });
            return out;
        }

        return out;
    }, [resp]);

    const btnPrimary =
        'inline-flex items-center justify-center rounded-md bg-lime-400 px-3 py-2 text-sm font-medium text-zinc-900 transition hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400';

    return (
        <>
            <Seo
                title='Ask Wikipedia (AI) — Kyle O’Neill'
                description='Query Wikipedia via FastAPI + Elasticsearch retrieval and transformer answers.'
                image='/images/og/og-ai-wiki.png'
            />
            <section className='mx-auto w-full max-w-6xl px-6 py-10'>
                <h1 className='text-3xl font-bold text-zinc-100'>
                    AI-Driven Wikipedia Q&amp;A
                </h1>
                <p className='mt-2 text-zinc-300'>
                    Ask a question. The API retrieves relevant passages with
                    Elasticsearch and generates a concise answer.
                </p>

                <form
                    onSubmit={ask}
                    className='mt-6 flex flex-col gap-3 sm:flex-row'>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder='e.g., How does PageRank work?'
                        className='flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-lime-400'
                    />
                    <button
                        className={btnPrimary}
                        disabled={loading || !q.trim()}>
                        {loading ? 'Asking…' : 'Ask'}
                    </button>
                </form>

                {err && (
                    <div className='mt-4 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-red-200'>
                        {err}
                    </div>
                )}

                {resp && (
                    <div className='mt-6 space-y-4'>
                        {resp.answer && (
                            <div>
                                <h2 className='text-xl font-semibold text-zinc-100'>
                                    Answer
                                </h2>
                                <p className='mt-2 whitespace-pre-wrap text-zinc-200'>
                                    {resp.answer}
                                </p>
                            </div>
                        )}

                        {contextItems.length > 0 && (
                            <div>
                                <h3 className='text-lg font-semibold text-zinc-100'>
                                    Sources (passages)
                                </h3>
                                <ul className='mt-2 space-y-2'>
                                    {contextItems.map(
                                        ({ text, url, title }, i) => (
                                            <li
                                                key={i}
                                                className='rounded-md border border-zinc-800 bg-zinc-900/40 p-3 text-zinc-300'>
                                                {url ? (
                                                    <a
                                                        href={url}
                                                        target='_blank'
                                                        rel='noreferrer'
                                                        className='text-lime-400 underline-offset-2 hover:underline'
                                                        title={url}>
                                                        {title ?? url}
                                                    </a>
                                                ) : null}
                                                <div
                                                    className={
                                                        url
                                                            ? 'mt-1 whitespace-pre-wrap text-zinc-300'
                                                            : 'whitespace-pre-wrap'
                                                    }>
                                                    {text}
                                                </div>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}

                        {!resp.answer && !resp.error && (
                            <p className='text-zinc-400'>No answer returned.</p>
                        )}
                    </div>
                )}

                {!API_BASE && (
                    <p className='mt-6 text-sm text-amber-300'>
                        Heads up:{' '}
                        <code className='rounded bg-zinc-800 px-1'>
                            VITE_API_HOST
                        </code>{' '}
                        is not set.
                    </p>
                )}
            </section>
        </>
    );
}
