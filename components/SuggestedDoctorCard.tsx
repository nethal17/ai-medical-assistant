import React from 'react';
import Image from 'next/image';

export type doctorAgent = {
    id: number,
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string
}

type props = {
    doctor: doctorAgent;
}

const SuggestedDoctorCard = ({doctor}: props) => {
  return (
    <div className='flex flex-col items-center justify-between border rounded-2xl shadow p-2 h-40 mt-4 mb-4'>
        <Image
            src={doctor.image}
            alt={doctor.specialist} 
            width={70}
            height={70}
            className='w-[50px] h-[50px] rounded-4xl object-cover'
        />
        <h2 className='font-bold  text-sm text-center text-gray-800'>{doctor.specialist}</h2>
        <p className='line-clamp-2 text-xs text-center'>{doctor.description}</p>
    </div>
  )
};

export default SuggestedDoctorCard;