import { BriefcaseBusiness, DollarSign, Gift, MapPin, Users } from 'lucide-react';
import React from 'react'

const JobsDetails = ({ job }) => {

    const convertDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('pt-BR', options);
    }

    return (
        <div className='w-2/3 max-sm:w-full max-sm:px-8 flex flex-col gap-6 py-8 xl:overflow-y-auto scroll-style'>
            <div className='w-full flex flex-col items-start gap-3'>
                <h1 className='text-neutral-100 font-mont uppercase font-extrabold text-3xl'>{job.title}</h1>
                <div className='flex items-center gap-2'>
                    <p className=' bg-second-200 font-mont text-start py-1 p-2 font-medium rounded-md text-sm'>{job.company}</p>
                    <p className='text-second-100 font-mont font-medium text-sm'>Publicada em {convertDate(job.createdAt)}</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <p className='text-second-300 font-mont text-sm'>{job.lowDesc}</p>
                <p className='text-second-300 font-mont text-sm'>{job.longDesc}</p>
            </div>

            <div className='flex flex-col gap-2'>
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
                    <p className='text-second-100 font-mont text-sm'>{job.benefits.join(", ")}</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <Users className='text-second-100' size={15} />
                    <p className='text-second-100 font-mont text-sm'>{job.candidates} candidatos</p>
                </div>
            </div>

            <div className='flex'>
                <button className='bg-second-100 border-none py-2 px-3 font-mont font-medium rounded-md'>Candidatar-se</button>
            </div>

        </div>
    )
}

export default JobsDetails