"use client";

import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { ArrowRight, Loader, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type doctorAgent = {
  id: number,
  specialist: string,
  description: string,
  image: string,
  agentPrompt: string,
  voiceId: string,
  subscriptionRequired: boolean
}

type props = {
    doctor: doctorAgent;
}   

const DoctorAgentCard = ({doctor}: props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { has } = useAuth();
  // @ts-ignore
  const paidUser = has && has({ plan: 'pro' });

  const onStartConsultation = async () => {
    setLoading(true);
    const result = await axios.post('/api/session-chat', {
      notes: "Directly started consultation with " + doctor.specialist,
      selectedDoctor: doctor
    });
    console.log(result.data);
    if (result.data?.sessionId) {
      console.log(result.data.sessionId);
      router.push('/dashboard/medical-agent/' + result.data.sessionId);
    }
    setLoading(false);
  };

  return (
    <div className='relative'>
        {doctor.subscriptionRequired && <Badge className='absolute m-2 right-0 text-sm bg-red-600/60'>
          Premium
        </Badge> }
        <Image
            src={doctor.image}
            alt={doctor.specialist}
            width={200}
            height={300}
            className='w-full h-[250px] object-cover rounded-xl' 
        />
        <h2 className='font-bold mt-1 text-green-700'>{doctor.specialist}</h2>
        <p className='line-clamp-2 text-sm text-gray-500 mt-1'>{doctor.description}</p>
        <Button onClick={onStartConsultation} disabled={!paidUser && doctor.subscriptionRequired} className='w-full mt-3 cursor-pointer hover:bg-green-800 hover:text-white bg-green-700 text-white hover:-translate-y-1'>Start Consultation {loading ? <Loader2 className='animate-spin'/> : <ArrowRight/>}</Button>
    </div>
  )
};

export default DoctorAgentCard;