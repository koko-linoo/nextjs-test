import Head from "next/head";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>B Plus Property Channel</title>
            </Head>
            <div className="flex w-screen h-screen items-center justify-center">
                <header className="text-2xl font-bold italic">
                    B Plus Property Channel
                </header>
            </div>
        </>
    )
}