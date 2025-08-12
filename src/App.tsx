import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import MarkdownPage from './components/MarkdownPage';
import ProjectPortfolio from './routes/ProjectPortfolio';
import ProjectTabletop from './routes/ProjectTabletop';
import ProjectAiWiki from './routes/ProjectAiWiki';
import ProjectsGrid from './routes/ProjectsGrid';

function App() {
    return (
        <div className='min-h-screen bg-gray-900 text-gray-100'>
            <Router>
                <NavBar />
                <main className='p-6 max-w-7xl mx-auto'>
                    <Routes>
                        <Route
                            path='/'
                            element={<MarkdownPage slug='hero' />}
                        />
                        <Route
                            path='/about'
                            element={<MarkdownPage slug='about' />}
                        />
                        {/* <Route
                            path='/projects'
                            element={<MarkdownPage slug='projects' />}
                        /> */}
                        <Route path="/projects" element={<ProjectsGrid />} />
                        <Route
                            path='/contact'
                            element={<MarkdownPage slug='contact' />}
                        />

                        {/* Per‑project SEO routes */}
                        <Route
                            path='/projects/portfolio'
                            element={<ProjectPortfolio />}
                        />
                        <Route
                            path='/projects/tabletop'
                            element={<ProjectTabletop />}
                        />
                        <Route
                            path='/projects/ai-wiki'
                            element={<ProjectAiWiki />}
                        />

                        <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>

                    {/* <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/projects' element={<ProjectsPage />} />
                        <Route
                            path='/projects/:projectId'
                            element={<ProjectDetailsPage />}
                        />
                        <Route
                            path='/projects/:projectId/play'
                            element={<TabletopSimulatorPage />}
                        />
                    </Routes> */}
                </main>
            </Router>
        </div>
    );
}

export default App;
