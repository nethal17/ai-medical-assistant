"use client";

import React, { useState } from 'react';
import  Image from 'next/image';
import { Button } from './ui/button';
import { CirclePlus } from 'lucide-react';
import AddNewSessionDialog from './AddNewSessionDialog';

const HistoryList = () => {
    const [historyList, setHistoryList] = useState([]);

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
                    List
                </div>

            }
        </div>
    )
};

export default HistoryList;