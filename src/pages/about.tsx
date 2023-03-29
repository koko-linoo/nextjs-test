import Head from "next/head";

export default function About() {
    return (
        <div style={{ height: "100vh", textAlign: "center" }}>
            <Head>
                <title>About Next JS</title>
                <meta name="title" content="About Next JS" />
                <meta name="description" content="About Next JS" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nextjs-test-7mrq72fej-koko-linoo.vercel.app/" />
                <meta property="og:title" content="About Next JS" />
                <meta property="og:description" content="About Next JS" />
                <meta property="og:image" content="https://b-plus-storage-staging.s3.ap-southeast-1.amazonaws.com/1680060586457-28844052-istockphoto-511061090-612x612.jpg" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://nextjs-test-7mrq72fej-koko-linoo.vercel.app/about" />
                <meta property="twitter:title" content="About Next JS" />
                <meta property="twitter:description" content="Next JS About" />
                <meta property="twitter:image" content="https://b-plus-storage-staging.s3.ap-southeast-1.amazonaws.com/1680060586457-28844052-istockphoto-511061090-612x612.jpg" />
            </Head>
            <h1>iPhones for Sale</h1>
            <p>insert a list of iPhones for sale.</p>
        </div>
    )
}