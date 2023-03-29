import Head from "next/head";
import { GetServerSideProps } from 'next';

interface AboutUsProps {
    title: string;
    description: string;
}

export const getServerSideProps: GetServerSideProps<AboutUsProps> = async () => {
    const aboutUs: AboutUsProps = {
        title: "About Ko Ko Lin Oo",
        description: "I was University of Computer Studies Student",
    }

    return {
        props: aboutUs
    }
}


const About = (props: AboutUsProps) => {
    return (
        <div style={{ height: "100vh", textAlign: "center" }}>
            <Head>
                <title>{props.title}</title>
                <meta name="title" content={props.title} />
                <meta name="description" content={`About ${props.description}`} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nextjs-test-7mrq72fej-koko-linoo.vercel.app/" />
                <meta property="og:title" content={props.title} />
                <meta property="og:description" content={props.description} />
                <meta property="og:image" content="https://b-plus-storage-staging.s3.ap-southeast-1.amazonaws.com/1680060586457-28844052-istockphoto-511061090-612x612.jpg" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://nextjs-test-7mrq72fej-koko-linoo.vercel.app/about" />
                <meta property="twitter:title" content={props.title} />
                <meta property="twitter:description" content={props.description} />
                <meta property="twitter:image" content="https://b-plus-storage-staging.s3.ap-southeast-1.amazonaws.com/1680060586457-28844052-istockphoto-511061090-612x612.jpg" />
            </Head>
            <h1>iPhones for Sale</h1>
            <p>insert a list of iPhones for sale.</p>
        </div>
    )
}

export default About;