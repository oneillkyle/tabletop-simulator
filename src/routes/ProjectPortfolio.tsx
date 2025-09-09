import Seo from '../components/Seo';
import MarkdownPage from '../components/MarkdownPage';

export default function ProjectPortfolio() {
    return (
        <>
            <Seo
                title='Developer Portfolio Website — Kyle O’Neill'
                description='Showcasing code, craft, and creativity — built to perform.'
                image='/images/og/og-portfolio.png'
            />
            <MarkdownPage slug='project-portfolio' />
        </>
    );
}
