import Head from "next/head";
import defaultImage from '../assets/default.jpg';

interface MetaHeaderProps {
    title: string;
    url: string;
    imageUrl?: string;
    description?: string;
}

const MetaHeader: React.FC<MetaHeaderProps> = ({
    title,
    url,
    imageUrl,
    description,
}) => (
    <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl ?? defaultImage.src} />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
            property="twitter:image"
            content={imageUrl}
        />
    </Head>
);

export default MetaHeader;