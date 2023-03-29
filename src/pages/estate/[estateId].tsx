import api from '@/configs/api';
import { Estate, ResponseData } from '@/configs/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps<ResponseData<Estate>> = async (context) => {

    const { estateId } = context.query;
    const result: ResponseData<Estate> = await api.get<ResponseData<Estate>>(`estates/${estateId}`)
        .then(response => response.data);

    return {
        props: result,
    }
}

const EstateDetail = ({ message, response, status }: ResponseData<Estate>) => {

    if (status === 200)
        return (
            <>
                <Head>
                    <title>{response?.township?.name}</title>
                    <meta name="title" content={response?.township?.name} />
                    <meta name="description" content={response?.price} />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://nextjs-test-7mrq72fej-koko-linoo.vercel.app/" />
                    <meta property="og:title" content={response?.township?.name} />
                    <meta property="og:description" content={response?.price} />
                    <meta property="og:image" content="https://b-plus-storage-staging.s3.ap-southeast-1.amazonaws.com/1680060586457-28844052-istockphoto-511061090-612x612.jpg" />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://nextjs-test-7mrq72fej-koko-linoo.vercel.app/about" />
                    <meta property="twitter:title" content={response?.township?.name} />
                    <meta property="twitter:description" content={`MMK ${response?.price ?? 0}`} />
                    {response?.files?.length ?
                        <meta
                            property="twitter:image"
                            content={response?.files[0].url ?? ""}
                        /> : null
                    }
                </Head>
                <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <span>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {response?.files?.map(file => (
                                <img
                                    width={300}
                                    height={300}
                                    key={file?.id}
                                    src={file?.url}
                                    alt={file?.key}
                                />
                            ))}
                        </div>
                        <br />
                        <h1>{response?.township?.name}</h1>
                        <br />
                        <h2>{response?.address}</h2>
                        <br />
                        <h2>MMK {response?.price}</h2>
                    </span>
                </div>
            </>
        )

    return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <span>
                <h1>Error</h1>
                <h4>{message}</h4>
            </span>
        </div>
    )
}

export default EstateDetail;