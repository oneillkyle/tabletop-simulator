import Seo from '../components/Seo';
import MarkdownPage from '../components/MarkdownPage';

export default function ProjectAiWiki() {
    return (
        <>
            <Seo
                title='AI‑Driven Wikipedia Search & Q&A Model — Kyle O’Neill'
                description='Ask anything. Get precise, AI-powered answers instantly.'
                image='/images/og/og-ai-wiki.png'
            />
            <MarkdownPage slug='project-ai-wiki' />
        </>
    );
}
