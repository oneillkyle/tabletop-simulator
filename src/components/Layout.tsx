import { Link } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='min-h-screen bg-zinc-950 text-zinc-100'>
            <header className='mx-auto max-w-6xl px-6 py-4 flex items-center justify-between'>
                <Link to='/' className='font-semibold tracking-wide'>
                    Kyle O’Neill
                </Link>
                <nav className='flex gap-6 text-zinc-300'>
                    <Link to='/about' className='hover:text-white'>
                        About
                    </Link>
                    <Link to='/projects' className='hover:text-white'>
                        Projects
                    </Link>
                    <Link to='/contact' className='hover:text-white'>
                        Contact
                    </Link>
                </nav>
            </header>

            <main className='mx-auto max-w-6xl px-6 py-8'>{children}</main>

            <footer className='mt-16 border-t border-zinc-800/60'>
                <div className='mx-auto max-w-6xl px-6 py-8 text-sm text-zinc-400'>
                    Engineer. Architect. Leader. Delivering impactful solutions
                    for over a decade.
                </div>
            </footer>
        </div>
    );
}
