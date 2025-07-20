"use client";

import React, { useEffect, useState } from 'react';
import  Image from 'next/image';
import { Button } from './ui/button';
import { CirclePlus } from 'lucide-react';
import AddNewSessionDialog from './AddNewSessionDialog';
import axios from 'axios';
import HistoryTable from './HistoryTable';
import { sessionDetail } from '@/app/(routes)/dashboard/medical-agent/[sessionId]/page';

const HistoryList = () => {
    const [historyList, setHistoryList] = useState<sessionDetail[]>([]);

    useEffect(() => {
        getHistoryList();
    }, []);

    const getHistoryList = async () => {
        const result = await axios.get('/api/session-chat?sessionId=all');
        console.log(result.data);
        setHistoryList(result.data);
    };

    return (
        <div className='mt-10'>
            {historyList.length == 0 ?
                <div className="flex flex-col items-center justify-center p-7 border-dashed border-2 rounded-xl">
                    <Image
                        src={'/medical-assistance.png'} alt='empty'
                        width={150}
                        height={150}
                    />
                    <h2 className="font-bold text-2xl mt-3">No Recent Consultaions</h2>
                    <p className='mt-1'>It looks like you haven't consulted with any doctors yet.</p>
                    <AddNewSessionDialog />
                </div>
                : 
                <div>
                    <HistoryTable historyList={historyList} />
                </div>

            }
        </div>
    )
};

export default HistoryList;