import Seo from '../components/Seo';
import MarkdownPage from '../components/MarkdownPage';

export default function ProjectTabletop() {
    return (
        <>
            <Seo
                title='AI‑Powered Tabletop Simulator — Kyle O’Neill'
                description='Warhammer-inspired strategy. AI-driven battles. Infinite play.'
                image='/images/og/og-tabletop.png'
            />
            <MarkdownPage slug='project-tabletop' />
        </>
    );
}
