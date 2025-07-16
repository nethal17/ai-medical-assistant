"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const MedicalAgentPage = () => {
  const { sessionId } = useParams();

  useEffect(() => {
    sessionId&&getSessionDetails();
  }, [sessionId]);

  const getSessionDetails = async () => {
    const result = await axios.get('/api/session-chat?sessionId='+sessionId);
    console.log(result.data);
  };

  return (
    <div className='px-20 py-24'>
      Medical Agent
    </div>
  )
};

export default MedicalAgentPage;