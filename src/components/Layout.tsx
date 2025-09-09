import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
    const link = ({ isActive }: { isActive: boolean }) =>
        `text-sm ${isActive ? 'text-white' : 'text-zinc-300 hover:text-white'}`;

    return (
        <div className='min-h-screen bg-zinc-950 text-zinc-100'>
            <header className='sticky top-0 z-50 border-b border-zinc-900/80 bg-zinc-950/80 backdrop-blur'>
                <div className='mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6'>
                    <NavLink to='/' className='font-semibold tracking-wide'>
                        Kyle O’Neill
                    </NavLink>
                    <nav className='flex items-center gap-6'>
                        <NavLink to='/about' className={link}>
                            About
                        </NavLink>
                        <NavLink to='/projects' className={link}>
                            Projects
                        </NavLink>
                        <NavLink to='/contact' className={link}>
                            Contact
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className='mx-auto w-full max-w-6xl px-6 py-10'>
                {children}
            </main>

            <footer className='mt-16 border-t border-zinc-900/80'>
                <div className='mx-auto w-full max-w-6xl px-6 py-8 text-sm text-zinc-400'>
                    Engineer. Architect. Leader. Delivering impactful solutions
                    for over a decade.
                </div>
            </footer>
        </div>
    );
}
