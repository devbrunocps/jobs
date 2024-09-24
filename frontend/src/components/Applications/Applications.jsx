import React, { useContext, useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import { AuthContext } from '@/context/AuthContext'
import { BriefcaseBusiness, DollarSign, Gift, LucideCircleUser, MapPin, User2Icon, Users } from 'lucide-react'

const Applications = () => {
    const auth = useContext(AuthContext)

    return (
        <div className='flex flex-col max-sm:max-h-1/2 max-sm:py-5 max-sm:px-4 max-sm:items-center max-sm:overflow-y-auto pt-8 gap-4'>
            <div className='flex flex-col'>
                <span className='text-second-100 text-2xl font-bold max-sm:text-xl max-sm:text-center'>MINHAS CANDIDATURAS</span>
                <span className='text-second-400 font-medium text-sm uppercase max-sm:text-xs'>Acompanhe todas as suas candidaturas</span>
            </div>
            {auth.user?.applications?.length > 0 && (
                <Carousel className="w-full max-w-2xl max-sm:max-w-[80%]">
                    <CarouselContent>
                        {auth.user?.applications?.map((job, i) => (
                            <CarouselItem key={i}>
                                <Card key={job.id} className='w-full rounded-md p-4 flex flex-col justify-between gap-4 bg-primary-400 border-[1px] border-neutral-700 font-mont'>
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-white font-bold text-xl uppercase max-sm:text-sm'>{job.title}</span>
                                        <span className='text-second-200 text-sm'>{job.lowDesc}</span>
                                    </div>
                                    <span className='text-second-200 text-sm break-words overflow-auto'>{job.longDesc}</span>
                                    <div className="flex flex-col gap-2">
                                        <div className='flex items-center gap-1'>
                                            <LucideCircleUser className='text-second-100' size={16} />
                                            <span className='text-second-100 text-sm'>{job.company}</span>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <BriefcaseBusiness className='text-second-100' size={15} />
                                            <p className='text-second-100 font-mont text-sm'>{job.jobType}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <DollarSign className='text-second-100' size={15} />
                                            <p className='text-second-100 font-mont text-sm'>{job.salary}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <MapPin className='text-second-100' size={15} />
                                            <p className='text-second-100 font-mont text-sm'>{job.location}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <BriefcaseBusiness className='text-second-100' size={15} />
                                            <p className='text-second-100 font-mont text-sm'>{job.workModel}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <Gift className='text-second-100' size={15} />
                                            <p className='text-second-100 font-mont text-sm'>{job.benefits?.join(", ")}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <Users className='text-second-100' size={15} />
                                            <p className='text-second-100 font-mont text-sm'>{job.number_candidates} candidatos</p>
                                        </div>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel >
            )}
        </div>
    )
}

export default Applications