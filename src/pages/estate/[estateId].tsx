import { Estate, ResponseData } from '@/configs/types';
import api from '@/configs/api';
import Head from 'next/head';
import { useQuery, QueryClient, UseQueryResult, dehydrate, DehydratedState } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const fetchDetail = async (estateId: string | string[] | undefined) => {
    return api.get<ResponseData<Estate>>(`estates/${estateId}`)
        .then(response => response.data);
}

interface ErrorProps {
    message: string;
}

const Error = (props: ErrorProps) => (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <span>
            <h1>Error</h1>
            <h4>{props.message.toString()}</h4>
        </span>
    </div>
)

const EstateDetail = () => {

    const router = useRouter();
    const { estateId } = router.query;

    console.log(router.isReady, estateId)

    const { data, isLoading } = useQuery({
        queryKey: ["EstateDetail", estateId],
        queryFn: () => {
            if (router.isReady) return fetchDetail(estateId);

            return null;
        },
        staleTime: Infinity,
    });

    if (isLoading) return <h1>Loading</h1>;

    if (data?.status == 200) {

        return (
            <>
                <Head>
                    <title>{data?.response?.township?.name}</title>
                    <meta name="title" content={data?.response?.township?.name} />
                    <meta name="description" content={data?.response?.price} />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://nextjs-test-7mrq72fej-koko-linoo.vercel.app/" />
                    <meta property="og:title" content={data?.response?.township?.name} />
                    <meta property="og:description" content={data?.response?.price} />
                    <meta property="og:image" content="https://b-plus-storage-staging.s3.ap-southeast-1.amazonaws.com/1680060586457-28844052-istockphoto-511061090-612x612.jpg" />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://nextjs-test-7mrq72fej-koko-linoo.vercel.app/about" />
                    <meta property="twitter:title" content={data?.response?.township?.name} />
                    <meta property="twitter:description" content={`MMK ${data?.response?.price ?? 0}`} />
                    {data?.response?.files?.length ?
                        <meta
                            property="twitter:image"
                            content={data?.response?.files[0].url ?? ""}
                        /> : null
                    }
                </Head>
                <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <span>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {data?.response?.files?.map(file => (
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
                        <h1>{data?.response?.township?.name}</h1>
                        <br />
                        <h2>{data?.response?.address}</h2>
                        <br />
                        <h2>MMK {data?.response?.price}</h2>
                    </span>
                </div>
            </>
        )
    }
    return <Error message={data?.message?.toString() ?? ""} />
}

export default EstateDetail;