import MetaHeader from '@/components/meta';
import api from '@/configs/api';
import { Estate, ResponseData } from '@/configs/types';
import { GetServerSideProps } from 'next';
import styles from '../styles/Code.module.scss';

export const getServerSideProps: GetServerSideProps<ResponseData<Estate>> = async (context) => {

    const { code } = context.query;
    const result: ResponseData<Estate> = await api.get<ResponseData<Estate>>(`estates/code/${code}`)
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
                    url={`https://nextjs-test-zeta-five.vercel.app/estates/${response?.code}`}
                    imageUrl={response?.files[0]?.url}
                    description={response?.address}
                />
                <div className={styles.header}>
                    B-Plus Property
                </div>
                <div className={styles.myRoot}>
                    <div className={styles.container}>
                        <div className={styles.image}>
                            <img
                                key={response?.files[0]?.id}
                                src={response?.files[0]?.url}
                                alt={response?.files[0]?.key}
                            />
                        </div>
                        <div className={styles.detail}>
                            <h2>Address : {response?.address + " " + response?.township?.name}</h2>
                            <br />
                            <h2>Price  &emsp; : MMK {response?.price}</h2>
                            <br />
                            <h2>Phone  &nbsp;&nbsp;&nbsp;: {response?.contactPhono}</h2>
                            <br />
                            <h2>Phone 1 : {response?.contactPhonoOne ?? "-"}</h2>
                            <br />
                            <h2>Phone 2 : {response?.contactPhonoTwo ?? "-"}</h2>
                        </div>
                    </div>
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