"use client";

import { UserDetailContext } from '@/context/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export type UserDetail = {
  name: string,
  email: string,
  credits: number
};

const Provider = ({
  children,
}: Readonly<{
    children: React.ReactNode
}>) => {

  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>();

  useEffect(() => {
    user&&createNewUser();
  }, [user]);

  const createNewUser = async () => {
    const result = await axios.post('api/users');
    console.log(result.data);
    setUserDetail(result.data);
  }

  return (
    <div>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
      </UserDetailContext.Provider>
    </div>
  )
};

export default Provider;