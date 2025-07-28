import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AIQueryPanel from '../components/AIQueryPanel';

export default function ProjectDetailsPage() {
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <div className='bg-gray-800 p-8 rounded-2xl shadow-md space-y-6'>
            {projectId === 'tabletop-simulator' && (
                <>
                    <h1 className='text-3xl font-bold text-indigo-300'>
                        AI Tabletop Simulator
                    </h1>
                    <p className='text-gray-200'>
                        Welcome to the AI-powered web-based tabletop skirmish
                        simulator. Customize rules, generate maps, and face off
                        against AI opponents in a Warhammer-inspired solo mode.
                    </p>
                    <Link
                        to={`/projects/${projectId}/play`}
                        className='inline-block mt-4 px-5 py-3 bg-indigo-500 rounded-lg text-white font-medium hover:bg-indigo-600'>
                        Play Now
                    </Link>
                </>
            )}

            {projectId === 'ai-wiki-query' && <AIQueryPanel />}

            {!projectId && <p className='text-gray-200'>Project not found.</p>}
        </div>
    );
}
