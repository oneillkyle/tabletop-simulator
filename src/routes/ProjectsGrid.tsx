import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

type ProjectCard = {
    title: string;
    tagline: string;
    description: string;
    image: string;
    href: string;
    github?: string;
    alt: string;
};

const projects: ProjectCard[] = [
    {
        title: 'Developer Portfolio Website',
        tagline: 'Showcasing code, craft, and creativity — built to perform.',
        description:
            'A sleek, SEO‑optimized portfolio with Markdown content, per‑route OG tags, and shareable previews.',
        image: '/images/og/og-portfolio.png',
        href: '/projects/portfolio',
        github: 'https://github.com/oneillkyle/portfolio',
        alt: 'Preview image for the Developer Portfolio Website project'
    },
    {
        title: 'AI‑Powered Tabletop Simulator',
        tagline:
            'Warhammer‑inspired strategy. AI‑driven battles. Infinite play.',
        description:
            'A web‑based skirmish game with AI‑generated scenarios, fog‑of‑war, LoS, and moddable rules.',
        image: '/images/og/og-tabletop.png',
        href: '/projects/tabletop',
        github: 'https://github.com/oneillkyle/tabletop-simulator',
        alt: 'Preview image for the AI‑Powered Tabletop Simulator project'
    },
    {
        title: 'AI‑Driven Wikipedia Search & Q&A Model',
        tagline: 'Ask anything. Get precise, AI‑powered answers instantly.',
        description:
            'FastAPI + Elasticsearch retrieval and transformer‑based answers. Built from /ai and served via /api.',
        image: '/images/og/og-ai-wiki.png',
        href: '/projects/ai-wiki',
        github: 'https://github.com/oneillkyle/portfolio',
        alt: 'Preview image for the AI‑Driven Wikipedia Q&A project'
    }
];

function Card(p: ProjectCard) {
    return (
        <article className='group flex flex-col overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/40 shadow-sm transition hover:shadow-lg focus-within:ring-2 focus-within:ring-lime-400'>
            <Link to={p.href} className='relative block'>
                <img
                    src={p.image}
                    alt={p.alt}
                    loading='lazy'
                    className='h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]'
                />
            </Link>

            <div className='flex flex-1 flex-col gap-2 p-5'>
                <h3 className='text-lg font-semibold text-zinc-100'>
                    <Link
                        to={p.href}
                        className='outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded'>
                        {p.title}
                    </Link>
                </h3>
                <p className='text-sm text-zinc-300'>{p.tagline}</p>
                <p className='text-sm text-zinc-400'>{p.description}</p>

                <div className='mt-4 flex gap-3'>
                    <Link
                        to={p.href}
                        className='inline-flex items-center justify-center rounded-md bg-lime-400 px-3 py-2 text-sm font-medium text-zinc-900 transition hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400'
                        aria-label={`Read more about ${p.title}`}>
                        Read More
                    </Link>
                    {p.github && (
                        <a
                            href={p.github}
                            target='_blank'
                            rel='noreferrer'
                            className='inline-flex items-center justify-center rounded-md border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400'
                            aria-label={`View ${p.title} on GitHub`}>
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function ProjectsGrid() {
    return (
        <>
            <Seo
                title='Projects — Kyle O’Neill'
                description='A selection of recent work, blending technical expertise with user‑focused design.'
                image='/images/og/og-portfolio.png'
            />
            <section className='mx-auto max-w-6xl px-6 py-12'>
                <header className='mb-8'>
                    <h1 className='text-3xl font-bold text-zinc-100'>
                        Projects
                    </h1>
                    <p className='mt-2 text-zinc-300'>
                        A selection of my recent work, blending technical
                        expertise with user‑focused design.
                    </p>
                </header>

                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {projects.map((proj) => (
                        <Card key={proj.title} {...proj} />
                    ))}
                </div>
            </section>
        </>
    );
}
