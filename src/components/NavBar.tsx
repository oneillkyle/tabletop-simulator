import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function NavBar() {
    const baseLinkClasses =
        'inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium';
    const activeClasses = 'border-indigo-400 text-white';
    const inactiveClasses =
        'border-transparent text-gray-400 hover:border-gray-500 hover:text-white';

    return (
        <nav className='bg-gray-800 shadow-lg'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center'>
                        <Link
                            to='/'
                            className='flex-shrink-0 text-2xl font-bold text-indigo-300'>
                            Kyle O'Neill
                        </Link>
                        <div className='hidden sm:ml-6 sm:flex sm:space-x-4'>
                            <NavLink
                                to='/'
                                end
                                className={({ isActive }) =>
                                    `${baseLinkClasses} ${
                                        isActive
                                            ? activeClasses
                                            : inactiveClasses
                                    }`
                                }>
                                Home
                            </NavLink>
                            <NavLink
                                to='/projects'
                                className={({ isActive }) =>
                                    `${baseLinkClasses} ${
                                        isActive
                                            ? activeClasses
                                            : inactiveClasses
                                    }`
                                }>
                                Projects
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
