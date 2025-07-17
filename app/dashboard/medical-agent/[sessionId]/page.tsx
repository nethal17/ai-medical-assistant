"use client";

import Image from 'next/image';
import { doctorAgent } from '@/components/DoctorAgentCard';
import axios from 'axios';
import { Circle, PhoneCall, PhoneOff } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';

type sessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: doctorAgent,
  createdOn: string,
};

const MedicalAgentPage = () => {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<sessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    sessionId&&getSessionDetails();
  }, [sessionId]);

  const getSessionDetails = async () => {
    const result = await axios.get('/api/session-chat?sessionId='+sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  };

  const startCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);
    vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID);

    vapi.on('call-start', () => {
      console.log('Call started');
      setCallStarted(true);
    });

    vapi.on('call-end', () => {
      console.log('Call ended')
      setCallStarted(false);
    });

    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        console.log(`${message.role}: ${message.transcript}`);
      }
    });

    vapiInstance.on('speech-start', () => {
      console.log('Assistant started speaking');
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setIsSpeaking(false);
    });
  };
  
  const endCall = () => {
    if (!vapiInstance) return;

    vapiInstance.stop();

    vapiInstance.off('call-start');
    vapiInstance.off('call-end');
    vapiInstance.off('message');

    setCallStarted(false);
    setVapiInstance(null);
  };

  return (
    <div className='p-10 border rounded-3xl mt-5 bg-secondary'> 
      <div className='flex justify-between items-center'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'> <Circle className={`h-3 w-3 rounded-full ${callStarted? 'bg-green-600 text-green-600 animate-pulse' : 'bg-red-600 text-red-600'} `}/>{callStarted?'Connected...':'Not Connected' }</h2>
        <h2 className='font-bold text-xl text-gray-400'> 00:00 </h2>
      </div>

      {sessionDetail && 
        <div className='flex items-center flex-col mt-10'>
          <Image 
            src={sessionDetail?.selectedDoctor?.image} alt={sessionDetail?.selectedDoctor?.specialist??''}
            width={80}
            height={80}
            className='h-[100px] w-[100px] object-cover rounded-full'
          />
          <h2 className='text-lg mt-2'>{sessionDetail?.selectedDoctor?.specialist??''}</h2>
          <p className='text-sm text-gray-500'>AI Medical Voice Agent</p>

          <div className='mt-32'>
            <h2 className='text-gray-400'>Assistant Msg</h2>
            <h2 className='text-lg'>User Msg</h2>
          </div>

          {!callStarted ? 
          <Button className='mt-20 cursor-pointer' onClick={startCall}> <PhoneCall/> Start Call </Button>
          :
          <Button className='mt-20 cursor-pointer' variant={'destructive'} onClick={endCall}> <PhoneOff/> Disconnect </Button>
          }
        </div> 
      } 
    </div>
  )
};

export default MedicalAgentPage;