import React from 'react';
import Image from 'next/image';
import { doctorAgent } from './DoctorAgentCard';

type props = {
    doctor: doctorAgent;
    setSelectedDoctor: any;
    selectedDoctor: doctorAgent;
}

const SuggestedDoctorCard = ({doctor, setSelectedDoctor, selectedDoctor}: props) => {
  return (
    <div
      className={`flex flex-col items-center border rounded-2xl shadow p-5 hover:shadow-xl cursor-pointer mt-4 mb-2
      ${selectedDoctor?.id === doctor.id ? "border-blue-700 hover:border-blue-700" : ""}`}
      onClick={() => setSelectedDoctor(doctor)}
    >
        <Image
            src={doctor.image}
            alt={doctor.specialist} 
            width={70}
            height={70}
            className='w-[50px] h-[50px] rounded-4xl object-cover'
        />
        <h2 className='font-bold  text-sm text-center text-gray-800'>{doctor?.specialist}</h2>
        <p className='line-clamp-2 text-xs text-center'>{doctor?.description}</p>
    </div>
  )
};

export default SuggestedDoctorCard;