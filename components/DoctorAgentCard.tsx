import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

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

const DoctorAgentCard = ({doctor}: props) => {
  return (
    <div>
        <Image
            src={doctor.image}
            alt={doctor.specialist}
            width={200}
            height={300}
            className='w-full h-[250px] object-cover rounded-xl' 
        />
        <h2 className='font-bold mt-1'>{doctor.specialist}</h2>
        <p className='line-clamp-2 text-sm text-gray-500 mt-1'>{doctor.description}</p>
        <Button className='w-full mt-3 hover:cursor-pointer'>Start Consultation <ArrowRight/></Button>
    </div>
  )
};

export default DoctorAgentCard;