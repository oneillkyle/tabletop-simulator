import { useState } from 'react';
import Seo from '../components/Seo';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

type AnswerResp = { answer?: string; context?: string[]; error?: string };

export default function PlayAiWiki() {
    const [q, setQ] = useState('');
    const [loading, setLoading] = useState(false);
    const [resp, setResp] = useState<AnswerResp | null>(null);
    const [err, setErr] = useState<string | null>(null);

    async function ask(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setErr(null);
        setResp(null);
        try {
            const r = await fetch(`${API_BASE}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: q })
            });
            if (!r.ok) throw new Error(`HTTP ${r.status}: ${await r.text()}`);
            const data: AnswerResp = await r.json();
            setResp(data);
        } catch (e: any) {
            setErr(e?.message ?? 'Request failed');
        } finally {
            setLoading(false);
        }
    }

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
                    AI‑Driven Wikipedia Q&amp;A
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
                                <p className='mt-2 text-zinc-200'>
                                    {resp.answer}
                                </p>
                            </div>
                        )}
                        {!!resp?.context?.length && (
                            <div>
                                <h3 className='text-lg font-semibold text-zinc-100'>
                                    Sources (passages)
                                </h3>
                                <ul className='mt-2 list-disc space-y-2 pl-6 text-zinc-300'>
                                    {resp.context.map((c, i) => (
                                        <li
                                            key={i}
                                            className='whitespace-pre-wrap'>
                                            {c}
                                        </li>
                                    ))}
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
                            VITE_API_BASE_URL
                        </code>{' '}
                        is not set.
                    </p>
                )}
            </section>
        </>
    );
}
