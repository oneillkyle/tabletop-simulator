import { Helmet } from 'react-helmet-async';

export default function Seo({
    title,
    description,
    image = '/images/og/og-portfolio.png'
}: {
    title: string;
    description: string;
    image?: string;
}) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />

            <meta property='og:type' content='website' />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            <meta property='og:image' content={image} />
            <meta property='og:image:width' content='1200' />
            <meta property='og:image:height' content='630' />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={description} />
            <meta name='twitter:image' content={image} />
        </Helmet>
    );
}
