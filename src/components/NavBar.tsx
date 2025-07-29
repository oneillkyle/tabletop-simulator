// src/components/NavBar.tsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react';

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const baseLinkClasses = 'border-b-2 text-sm font-medium';
    const activeClasses = 'border-indigo-400 text-white';
    const inactiveClasses =
        'border-transparent text-gray-400 hover:border-gray-500 hover:text-white';

    // For desktop (inline-flex) vs mobile (block)
    const desktopContainer = 'hidden sm:ml-6 sm:flex sm:space-x-4';
    const mobileContainer = 'sm:hidden px-2 pt-2 pb-3 space-y-1';

    return (
        <nav className='bg-gray-800 shadow-lg'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16 items-center'>
                    {/* Logo / Brand */}
                    <Link
                        to='/'
                        className='text-2xl font-bold text-indigo-300 flex-shrink-0'>
                        Kyle O'Neill
                    </Link>

                    {/* Desktop Links */}
                    <div className={desktopContainer}>
                        <NavLink
                            to='/'
                            end
                            className={({ isActive }) =>
                                `inline-flex items-center px-3 py-2 ${baseLinkClasses} ${
                                    isActive ? activeClasses : inactiveClasses
                                }`
                            }>
                            Home
                        </NavLink>
                        <NavLink
                            to='/projects'
                            className={({ isActive }) =>
                                `inline-flex items-center px-3 py-2 ${baseLinkClasses} ${
                                    isActive ? activeClasses : inactiveClasses
                                }`
                            }>
                            Projects
                        </NavLink>
                        {/* <NavLink
                            to='/resume'
                            className={({ isActive }) =>
                                `inline-flex items-center px-3 py-2 ${baseLinkClasses} ${
                                    isActive ? activeClasses : inactiveClasses
                                }`
                            }>
                            Resume
                        </NavLink> */}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className='sm:hidden'>
                        <button
                            onClick={() => setMobileOpen((o) => !o)}
                            className='p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                            aria-label='Toggle menu'>
                            {mobileOpen ? (
                                <XIcon className='h-6 w-6' />
                            ) : (
                                <MenuIcon className='h-6 w-6' />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className={mobileContainer}>
                    <NavLink
                        to='/'
                        end
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium ${
                                isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`
                        }>
                        Home
                    </NavLink>
                    <NavLink
                        to='/projects'
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium ${
                                isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`
                        }>
                        Projects
                    </NavLink>
                    {/* <NavLink
                        to='/resume'
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium ${
                                isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`
                        }>
                        Resume
                    </NavLink> */}
                </div>
            )}
        </nav>
    );
}
