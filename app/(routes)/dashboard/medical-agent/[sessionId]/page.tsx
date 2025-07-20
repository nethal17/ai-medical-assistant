"use client";

import Image from 'next/image';
import { doctorAgent } from '@/components/DoctorAgentCard';
import axios from 'axios';
import { Circle, Loader2, PhoneCall, PhoneOff } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';
import { toast } from 'sonner';
import { reportContent } from '@/components/ViewReportDialog';

export type sessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: reportContent,
  selectedDoctor: doctorAgent,
  createdOn: string,
};

type message = {
  role: string,
  text: string,
};

const MedicalAgentPage = () => {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<sessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRole, setCurrentRole] = useState<string|null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<message[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    sessionId&&getSessionDetails();
  }, [sessionId]);

  const getSessionDetails = async () => {
    const result = await axios.get('/api/session-chat?sessionId='+sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  };

  const startCall = () => {
    try {
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
      setVapiInstance(vapi);
  
      console.log('Voice ID:', sessionDetail?.selectedDoctor?.voiceId);
      console.log('Agent Prompt:', sessionDetail?.selectedDoctor?.agentPrompt);
  
      const VapiAgentConfig = {
        name: 'AI Medical Doctor Voice Agent',
        firstMessage: "Hello, Thank you for connecting. I am here to help you, Can you please tell me your full name and age?",
        transcriber: {
          provider: 'assembly-ai',
          language: 'en'
        },
        voice: {
          provider: 'vapi',
          voiceId: sessionDetail?.selectedDoctor?.voiceId
        },
        model: {
          provider: 'openai',
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: sessionDetail?.selectedDoctor?.agentPrompt
            }
          ]
        }
      };
  
      // Event handlers
      const callStartHandler = () => {
        console.log('Call started');
        setCallStarted(true);
      };
  
      const callEndHandler = () => {
        console.log('Call ended');
        setCallStarted(false);
      };
  
      const messageHandler = (message: any) => {
        if (message.type === 'transcript') {
          const { role, transcriptType, transcript } = message;
          console.log(`${role}: ${transcript}`);
  
          if (transcriptType === 'partial') {
            setLiveTranscript(transcript);
            setCurrentRole(role);
          } else if (transcriptType === 'final') {
            setMessages((prev) => [...prev, { role, text: transcript }]);
            setLiveTranscript("");
            setCurrentRole(null);
          }
        }
      };
  
      const speechStartHandler = () => {
        console.log('Assistant started speaking');
        setCurrentRole('assistant');
      };
  
      const speechEndHandler = () => {
        console.log('Assistant stopped speaking');
        setCurrentRole('user');
      };
  
      // Add event listeners
      vapi.on('call-start', callStartHandler);
      vapi.on('call-end', callEndHandler);
      vapi.on('message', messageHandler);
      vapi.on('speech-start', speechStartHandler);
      vapi.on('speech-end', speechEndHandler);
  
      // Store handlers for cleanup
      // @ts-ignore
      vapi.handlers = {
        callStartHandler,
        callEndHandler,
        messageHandler,
        speechStartHandler,
        speechEndHandler
      };
  
      // @ts-ignore
      vapi.start(VapiAgentConfig);
  
    } catch (error) {
      console.error('Error starting call:', error);
      setCallStarted(false);
      setVapiInstance(null);
    }
  };
  
  const endCall = async () => {
    setLoading(true);
    
    try {
      // Generate report first while call is still active
      await generateReport();
      
      // Stop the call and clean up
      if (vapiInstance) {
        // Remove all event listeners
        if (vapiInstance.handlers) {
          vapiInstance.off('call-start', vapiInstance.handlers.callStartHandler);
          vapiInstance.off('call-end', vapiInstance.handlers.callEndHandler);
          vapiInstance.off('message', vapiInstance.handlers.messageHandler);
          vapiInstance.off('speech-start', vapiInstance.handlers.speechStartHandler);
          vapiInstance.off('speech-end', vapiInstance.handlers.speechEndHandler);
        }
        
        await vapiInstance.stop();
      }

      toast.success("Your medical report has been generated successfully.");
      router.replace('/dashboard');
      
    } catch (error) {
      console.error('Error ending call:', error);
    } finally {
      setCallStarted(false);
      setVapiInstance(null);
      setLoading(false);
    }
  };

  const generateReport = async () => {
    try {
      const result = await axios.post('/api/medical-report', {
        messages: messages,
        sessionDetail: sessionDetail,
        sessionId: sessionId
      });
      console.log("Report generated successfully", result.data);
      return result.data;
    } catch (error) {
      console.error("Error generating report:", error);
      throw error;
    }
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

          <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72'>
            {messages?.slice(-4).map((msg: message, index) =>(
              <h2 className='text-gray-400 p-2' key={index}> {msg.role}: {msg.text} </h2>
            ))}
            {liveTranscript && liveTranscript?.length>0 &&<h2 className='text-lg'>{currentRole} : {liveTranscript}</h2>}
          </div>

          {!callStarted ? 
          <Button className='mt-20 cursor-pointer' onClick={startCall}> <PhoneCall/> Start Call </Button>
          :
          <Button className='mt-20 cursor-pointer' variant={'destructive'} onClick={endCall} disabled={loading}> <PhoneOff/> Disconnect {loading && <Loader2 className='animate-spin'/> } </Button>
          }
        </div> 
      } 
    </div>
  )
};

export default MedicalAgentPage;