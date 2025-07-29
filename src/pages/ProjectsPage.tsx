import React from 'react';
import { Code } from 'lucide-react'
import { Link } from 'react-router-dom';

export interface Project {
    id: string;
    title: string;
    description: string;
    githubUrl?: string;
}

const projects: Project[] = [
    {
        id: 'ai-wiki-query',
        title: 'AI Wikipedia Query',
        description: 'AI Query Panel',
        githubUrl: 'https://github.com/oneillkyle/portfolio'
    },
    {
        id: 'tabletop-simulator',
        title: 'AI Tabletop Simulator',
        description: 'Web-based, AI-powered tabletop skirmish simulator',
        githubUrl: 'https://github.com/oneillkyle/tabletop-simulator'
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
                        <Link to={`/projects/${project.id}`} className='block'>
                            <h2 className='text-2xl font-semibold mb-2 text-gray-100'>
                                {project.title}
                            </h2>
                            <p className='text-gray-300'>
                                {project.description}
                            </p>
                        </Link>

                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center text-indigo-300 hover:text-indigo-100'>
                                <Code className='w-5 h-5 mr-2' />
                                View on GitHub
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
