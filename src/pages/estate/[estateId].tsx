import MetaHeader from '@/components/meta';
import api from '@/configs/api';
import { Estate, ResponseData } from '@/configs/types';
import { GetServerSideProps } from 'next';

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
                <MetaHeader
                    title={response?.township?.name ?? ""}
                    url={`https://nextjs-test-zeta-five.vercel.app/estates/${response?.id}`}
                    imageUrl={response?.files[0]?.url}
                    description={response?.address}
                />
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