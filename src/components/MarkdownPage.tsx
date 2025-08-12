import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Link } from 'react-router-dom';

declare global {
    interface ImportMeta {
        glob: (pattern: string, options?: { as?: string }) => Record<string, unknown>;
    }
}

/**
 * Vite will bundle all markdown files under src/content so we can fetch them by slug.
 * We load as raw strings to feed into ReactMarkdown.
 */
// const mdModules = import.meta.glob('/src/content/**/*.md', { as: 'raw' });
const mdModules = import.meta.glob('../content/**/*.md', { as: 'raw' });

type Props = {
    slug: string; // e.g. "about", "projects", "project-ai-wiki"
    notFoundText?: string;
    className?: string;
};

type FrontMatter = Record<string, string>;

function stripFrontMatter(src: string): {
    body: string;
    frontMatter: FrontMatter;
} {
    if (!src.startsWith('---')) return { body: src, frontMatter: {} };
    const end = src.indexOf('\n---', 3);
    if (end === -1) return { body: src, frontMatter: {} };
    const raw = src.slice(3, end).trim(); // between --- and ---
    const body = src.slice(end + 4).replace(/^\s+/, '');
    const fm: FrontMatter = {};
    for (const line of raw.split('\n')) {
        const idx = line.indexOf(':');
        if (idx > -1) {
            const k = line.slice(0, idx).trim();
            const v = line
                .slice(idx + 1)
                .trim()
                .replace(/^"(.*)"$/, '$1');
            fm[k] = v;
        }
    }
    return { body, frontMatter: fm };
}

function useMarkdown(slug: string) {
    const [text, setText] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);

    const key = useMemo(() => {
        // Prefer exact filename match …/slug.md
        const exact = Object.keys(mdModules).find((k) =>
            k.endsWith(`/${slug}.md`)
        );
        if (exact) return exact;
        // Fallback: first file that contains /slug.md anywhere
        return (
            Object.keys(mdModules).find((k) => k.includes(`/${slug}.md`)) ??
            null
        );
    }, [slug]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            if (!key) {
                setErr(`Markdown file for slug "${slug}" not found.`);
                return;
            }
            try {
                const raw = await (mdModules[key] as () => Promise<string>)();
                if (!mounted) return;
                setText(raw);
            } catch (e) {
                setErr(`Failed to load content for "${slug}".`);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [key, slug]);

    return { text, err };
}

export default function MarkdownPage({ slug, notFoundText, className }: Props) {
    const { text, err } = useMarkdown(slug);

    const { body, frontMatter } = useMemo(() => {
        if (!text) return { body: '', frontMatter: {} as FrontMatter };
        return stripFrontMatter(text);
    }, [text]);

    // Map markdown elements to Tailwind-styled components
    const components = useMemo(() => {
        return {
            h1: (props: any) => (
                <h1
                    {...props}
                    className='mt-2 text-3xl md:text-4xl font-bold text-zinc-100'
                />
            ),
            h2: (props: any) => (
                <h2
                    {...props}
                    className='mt-10 text-2xl md:text-3xl font-semibold text-zinc-100'
                />
            ),
            h3: (props: any) => (
                <h3
                    {...props}
                    className='mt-8 text-xl md:text-2xl font-semibold text-zinc-100'
                />
            ),
            p: (props: any) => (
                <p {...props} className='mt-4 leading-7 text-zinc-300' />
            ),
            ul: (props: any) => (
                <ul
                    {...props}
                    className='mt-4 list-disc pl-6 text-zinc-300 space-y-2'
                />
            ),
            ol: (props: any) => (
                <ol
                    {...props}
                    className='mt-4 list-decimal pl-6 text-zinc-300 space-y-2'
                />
            ),
            li: (props: any) => <li {...props} className='[&>p]:mt-0' />,
            hr: (props: any) => (
                <hr {...props} className='my-8 border-zinc-800' />
            ),
            blockquote: (props: any) => (
                <blockquote
                    {...props}
                    className='mt-6 border-l-4 border-lime-400/60 pl-4 text-zinc-300 italic'
                />
            ),
            code: ({ inline, className: cn, children, ...rest }: any) => {
                if (inline) {
                    return (
                        <code
                            {...rest}
                            className='rounded bg-zinc-800/70 px-1.5 py-0.5 text-sm text-zinc-100'>
                            {children}
                        </code>
                    );
                }
                return (
                    <code
                        {...rest}
                        className={`block whitespace-pre leading-6 text-sm ${
                            cn ?? ''
                        }`}>
                        {children}
                    </code>
                );
            },
            pre: (props: any) => (
                <pre
                    {...props}
                    className='mt-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-zinc-100'
                />
            ),
            table: (props: any) => (
                <div className='mt-6 overflow-x-auto'>
                    <table
                        {...props}
                        className='w-full border-collapse text-zinc-300'
                    />
                </div>
            ),
            th: (props: any) => (
                <th
                    {...props}
                    className='border-b border-zinc-800 px-3 py-2 text-left text-zinc-200'
                />
            ),
            td: (props: any) => (
                <td {...props} className='border-b border-zinc-800 px-3 py-2' />
            ),
            a: ({ href = '', children, ...rest }: any) => {
                const isInternal = href.startsWith('/');
                if (isInternal) {
                    return (
                        <Link
                            to={href}
                            {...rest}
                            className='text-lime-400 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-lime-400 rounded'>
                            {children}
                        </Link>
                    );
                }
                return (
                    <a
                        href={href}
                        target='_blank'
                        rel='noreferrer'
                        {...rest}
                        className='text-lime-400 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-lime-400 rounded'>
                        {children}
                    </a>
                );
            },
            img: ({ alt = '', ...rest }: any) => (
                // @ts-ignore
                <img
                    alt={alt}
                    {...rest}
                    className='mt-6 rounded-lg border border-zinc-800'
                />
            )
        };
    }, []);

    if (err) {
        return (
            <section
                className={`mx-auto max-w-3xl px-6 py-12 ${className ?? ''}`}>
                <h1 className='text-2xl font-semibold text-zinc-100'>
                    Content not found
                </h1>
                <p className='mt-2 text-zinc-300'>{notFoundText ?? err}</p>
            </section>
        );
    }

    if (!text) {
        return (
            <section
                className={`mx-auto max-w-3xl px-6 py-12 ${className ?? ''}`}>
                <div className='h-6 w-48 animate-pulse rounded bg-zinc-800' />
                <div className='mt-4 h-4 w-full animate-pulse rounded bg-zinc-800' />
                <div className='mt-2 h-4 w-5/6 animate-pulse rounded bg-zinc-800' />
                <div className='mt-2 h-4 w-3/4 animate-pulse rounded bg-zinc-800' />
            </section>
        );
    }

    return (
        <section className={`mx-auto max-w-3xl px-6 py-12 ${className ?? ''}`}>
            {/* You can optionally read frontMatter.title/description here if you want */}
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    rehypeSlug,
                    [
                        rehypeAutolinkHeadings,
                        {
                            behavior: 'append',
                            properties: { className: 'anchor' }
                        }
                    ]
                ]}
                components={components}>
                {body}
            </ReactMarkdown>
        </section>
    );
}
