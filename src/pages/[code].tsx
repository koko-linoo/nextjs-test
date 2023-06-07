import MetaHeader from '@components/meta';
import api from '@configs/api';
import { Estate, FileDB, ResponseData } from '@configs/types';
import { GetServerSideProps } from 'next';
import { useSnapCarousel } from 'react-snap-carousel';
import moneyIcon from '../assets/money_public.png';
import addressIcon from '../assets/address_public.png';
import areaIcon from '../assets/area_public.png';
import profileIcon from '../assets/profile.png';
import notFoundIcon from '../assets/not-found.jpg';

export const getServerSideProps: GetServerSideProps<ResponseData<Estate>> = async (context) => {

    const { code } = context.query;
    const result: ResponseData<Estate> = await api.get<ResponseData<Estate>>(`estates/code/${code}`)
        .then(response => response.data);

    console.log(result);

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
                    description={response?.title}
                />
                <div className='w-screen h-screen bg-slate-50 overflow-auto'>
                    <div className='h-screen w-full bg-red-500 mx-auto flex flex-col'>
                        <div className='flex-1 bg-yellow-100 flex'>
                            <div className='flex-1 w-full bg-white flex flex-col'>
                                {response?.files && response.files.length !== 0 ?
                                    <Carousel files={response?.files} /> :
                                    <div
                                        style={{ backgroundImage: `url(${notFoundIcon.src})` }}
                                        className='bg-cover bg-center flex bg-blue-200 justify-center items-center shrink-0 w-full h-96'
                                    />
                                }
                                <div className='px-10 py-5 flex flex-col space-y-5'>
                                    <span className='font-bold text-xl'>{response?.title}</span>
                                    <span>For : {response?.type} / {response?.propertyType?.name}</span>
                                    <div className='flex items-center space-x-5'>
                                        <img className='w-7 h-7' src={moneyIcon.src} />
                                        <span className='text-sm'>
                                            {response?.price} Lakh
                                        </span>
                                    </div>
                                    <div className='flex items-center space-x-5'>
                                        <img className='w-7 h-7' src={areaIcon.src} />
                                        <span className='text-sm'>
                                            {response?.width} ft x {response?.length} ft - &#40;{response?.area} {response?.unit}&#41;
                                        </span>
                                    </div>
                                    <div className='flex space-x-2 items-center'>
                                        <div className='text-bold text-lg'>Address</div>
                                        <hr className='flex-1' />
                                    </div>
                                    <div className='flex items-center space-x-5'>
                                        <img className='w-7 h-7' src={addressIcon.src} />
                                        <span className='text-sm'>
                                            {response?.no} ,&nbsp;
                                            {response?.building} ,&nbsp;
                                            Floor - {response?.floor} ,&nbsp;
                                            {response?.street1} ,&nbsp;
                                            {response?.street2} .<br />
                                            {response?.township?.state?.name} /&nbsp;
                                            {response?.township?.name}
                                        </span>
                                    </div>
                                    <div className='flex space-x-2 items-center'>
                                        <div className='text-bold text-lg'>Contact Users</div>
                                        <hr className='flex-1' />
                                    </div>
                                    <div className='flex items-center space-x-5'>
                                        <img className='w-7 h-7' src={profileIcon.src} />
                                        <div className='flex flex-col space-y-1'>
                                            <span>{response?.ownerName} &#40; Owner &#41;</span>
                                            <span className='text-sm'>
                                                {response?.ownerPhone}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex items-center space-x-5'>
                                        <img className='w-7 h-7' src={profileIcon.src} />
                                        <div className='flex flex-col space-y-1'>
                                            <span>{response?.agentName} &#40; Agent &#41;</span>
                                            <span className='text-sm'>
                                                {response?.agentPhone}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex space-x-2 items-center'>
                                        <div className='text-bold text-lg'>Description</div>
                                        <hr className='flex-1' />
                                    </div>
                                    <div className='flex space-x-5'>
                                        <span className='w-7' />
                                        <p>
                                            {response?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='h-full bg-green-100 w-20 flex items-center flex-col justify-center'>
                                <div className='rotate-90 w-96 text-center'>Broker Plus Property</div>
                            </div> */}
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

export interface CarouselProps {
    files: FileDB[] | undefined
}

export function Carousel({ files = [] }: CarouselProps) {

    const { scrollRef, pages, activePageIndex, next, prev, goTo } = useSnapCarousel();

    return (
        <div className='flex flex-col relative'>
            <ul ref={scrollRef} className='flex overflow-hidden'>
                {files.map((file, i) => (
                    <li key={i} style={{ backgroundImage: `url(${file.url})` }} className='bg-cover bg-center flex bg-blue-200 justify-center items-center shrink-0 w-full h-96' />
                ))}
            </ul>
            <ol className='flex space-x-1 justify-center absolute bottom-5 left-0 right-0'>
                {pages.map((_, i) => (
                    <li key={i}>
                        <button className={`${activePageIndex === i ? "bg-white" : "bg-slate-300"} border w-3 h-3 flex items-center justify-center rounded-full`} onClick={() => goTo(i)} />
                    </li>
                ))}
            </ol>
            {/* {response?.files.map(file => (
                <img key={file.id} className='rounded-xl w-1/2 h-auto p-1' src={file.url} />
            ))} */}
        </div>
    )
}