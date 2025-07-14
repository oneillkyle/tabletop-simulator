import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
    {
        id: 'tabletop-simulator',
        title: 'AI Tabletop Simulator',
        description: 'Web-based, AI-powered tabletop skirmish simulator'
    }
    // Add more projects here
];

export default function ProjectsPage() {
    return (
        <div className='space-y-8'>
            <h1 className='text-4xl font-extrabold text-indigo-300'>
                Projects
            </h1>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className='bg-gray-800 p-6 rounded-2xl shadow-lg hover:bg-gray-700'>
                        <Link
                            to={
                                project.id === 'tabletop-simulator'
                                    ? `/projects/${project.id}/play`
                                    : `/projects/${project.id}`
                            }
                            className='block'>
                            <h2 className='text-2xl font-semibold mb-2 text-gray-100'>
                                {project.title}
                            </h2>
                            <p className='text-gray-300'>
                                {project.description}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
