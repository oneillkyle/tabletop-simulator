import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import TabletopSimulatorPage from './pages/TabletopSimulatorPage';

function App() {
    return (
        <div className='min-h-screen bg-gray-900 text-gray-100'>
            <Router>
                <NavBar />
                <main className='p-6 max-w-7xl mx-auto'>
                    <Routes>
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
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;
