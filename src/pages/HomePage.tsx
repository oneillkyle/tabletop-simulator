import React from 'react';

export default function HomePage() {
    return (
        <div className='space-y-10'>
            <section className='bg-gray-800 p-8 rounded-2xl shadow-md'>
                <h1 className='text-4xl font-extrabold mb-4 text-indigo-300'>
                    About Me
                </h1>
                <p className='text-gray-200'>
                    Hi, I'm Kyle O'Neill, a full-stack software engineer with a
                    passion for building AI-driven experiences and interactive
                    web apps.
                </p>
            </section>
            <section className='bg-gray-800 p-8 rounded-2xl shadow-md'>
                <h2 className='text-3xl font-semibold mb-4 text-indigo-300'>
                    Portfolio
                </h2>
                <p className='text-gray-200'>
                    Explore my work, including web applications, AI experiments,
                    and open-source contributions.
                </p>
            </section>
        </div>
    );
}
