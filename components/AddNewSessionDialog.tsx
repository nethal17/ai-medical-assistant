"use client";

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';
import { ArrowRight, CirclePlus, Loader2 } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SuggestedDoctorCard from './SuggestedDoctorCard';

const AddNewSessionDialog = () => {
  const [note, setNote] = useState <string> ();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState <doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState <doctorAgent>();
  const router = useRouter();

  const onClickNext = async () => {
    setLoading(true);
    const result = await axios.post('/api/suggest-doctors', {
      notes: note
    })

    console.log(result.data);
    setSuggestedDoctors(result.data);
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    const result = await axios.post('/api/session-chat', {
      notes: note,
      selectedDoctor: selectedDoctor
    });
    console.log(result.data);
    if (result.data?.sessionId) {
      console.log(result.data.sessionId);
      router.push('/dashboard/medical-agent/' + result.data.sessionId);
    }
    setLoading(false);
  };

  return (
    <Dialog>
        <DialogTrigger>
            <Button className='mt-5 hover:cursor-pointer'> <CirclePlus/> Start a Consultation </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
              {!suggestedDoctors ?
                <DialogTitle>Add Basic Details</DialogTitle>
                :
                <DialogTitle></DialogTitle>
              }  
                <DialogDescription asChild>
                {!suggestedDoctors ?  
                  <div>
                    <h2 className='mt-2'>Add Symptons or Any Other Details</h2>
                    <Textarea 
                      placeholder='Add details here...' 
                      className='h-[200px] mt-1'
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div> 
                  :
                  <div>
                    <h2 className='text-lg text-gray-500'>Select the doctor</h2>
                    <div className='grid grid-cols-3 gap-5'>
                      {suggestedDoctors.map((doctor, index) => (
                        <SuggestedDoctorCard doctor={doctor} key={index} 
                          setSelectedDoctor={() => setSelectedDoctor(doctor)}
                          //@ts-ignore 
                          selectedDoctor={selectedDoctor}
                        />
                      ))}
                    </div>
                  </div> 
                  
                }
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant={'outline'} className='hover:cursor-pointer'>Cancel</Button>
              </DialogClose>
              {!suggestedDoctors ?
              <Button disabled={!note || loading} onClick={onClickNext} className='hover:cursor-pointer'>
                Next {loading ? <Loader2 className='animate-spin'/> : <ArrowRight/>}
              </Button>
              :
              <Button disabled={loading} className='hover:cursor-pointer' onClick={() => onStartConsultation()}>
                Start Consultation {loading && <Loader2 className='animate-spin'/> }
              </Button>
              }
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
};

export default AddNewSessionDialog;