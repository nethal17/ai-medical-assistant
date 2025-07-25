import AddNewSessionDialog from '@/components/AddNewSessionDialog';
import DoctorsAgentList from '@/components/DoctorsAgentList';
import Footer from '@/components/Footer';
import HistoryList from '@/components/HistoryList';
import Navbar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import React from 'react';

const DashboardPage = () => {
  return (
    <>
    <Navbar />
    <main>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center justify-between">
          <h2 className="ml-[-15px] font-bold text-2xl text-green-700">My Dashboard</h2>
        </div>
        <div>
          <AddNewSessionDialog />
        </div>
      </div>
      <HistoryList />
      <DoctorsAgentList />
    </main>
    </>
    
  )
};

export default DashboardPage;