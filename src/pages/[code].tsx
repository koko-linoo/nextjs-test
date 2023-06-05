import MetaHeader from '@/components/meta';
import api from '@/configs/api';
import { Estate, ResponseData } from '@/configs/types';
import { GetServerSideProps } from 'next';
import bgImage from '../assets/default.jpg';

export const getServerSideProps: GetServerSideProps<ResponseData<Estate>> = async (context) => {

    const { code } = context.query;
    const result: ResponseData<Estate> = await api.get<ResponseData<Estate>>(`estates/code/${code}`)
        .then(response => response.data);

    return {
        props: result,
    }
}

const EstateDetail = ({ message, response, status }: ResponseData<Estate>) => {

    console.log(response);

    if (status === 200)
        return (
            <>
                <MetaHeader
                    title={response?.township?.name ?? ""}
                    url={`https://nextjs-test-zeta-five.vercel.app/estates/${response?.code}`}
                    imageUrl={response?.files[0]?.url}
                    description={response?.title}
                />
                <div className='w-screen h-screen bg-slate-50 overflow-auto'>
                    <div className='h-screen w-8/12 bg-red-500 mx-auto flex flex-col'>
                        <div className='w-full px-10 py-5 bg-blue-200'>
                            Broker Plus
                        </div>
                        <div className='flex-1 bg-yellow-100 flex'>
                            <div className='flex-1 w-full bg-white flex flex-col'>
                                <div className='px-10 py-5 flex flex-col space-y-5'>
                                    <span className='font-bold text-xl'>{response?.title}</span>
                                    <span>For : {response?.type} / {response?.propertyType?.name}</span>
                                    <span>$ {response?.price} Lakh</span>
                                    <span>{response?.width} x {response?.length} {response?.unit}</span>
                                    <span>{response?.title}</span>
                                </div>
                                <div className='flex h-96 bg-slate-200 mt-auto bg-cover bg-center' style={{ backgroundImage: `url(${bgImage.src})` }} />
                            </div>
                            <div className='h-full bg-green-100 w-20 flex items-center flex-col justify-center'>
                                <div className='rotate-90 w-96 text-center'>Broker Plus Property</div>
                            </div>
                        </div>
                        <div className='w-full text-white px-10 py-5 bg-blue-600 mt-auto'>
                            Broker Plus Property
                        </div>
                    </div>
                </div>
            </>
        )
    return (
        <div className='w-screen h-screen items-center justify-center flex flex-col'>
            <div className='text-xl font-bold italic'>Error</div>
            <span className='text-sm italic'>
                {message}
            </span>
        </div>
    )
}

export default EstateDetail;