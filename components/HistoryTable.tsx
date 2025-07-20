import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { sessionDetail } from '@/app/(routes)/dashboard/medical-agent/[sessionId]/page';
import { Button } from './ui/button';
import moment from 'moment';
import ViewReportDialog from './ViewReportDialog';

type Props = {
    historyList: sessionDetail[];
}

const HistoryTable = ({ historyList }: Props) => {

  return (
    <div>
        <h1 className='text-center mb-4 text-lg text-gray-500 border-dashed p-2 border-2'>Previous Consultation Reports</h1>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[230px] text-[16px] font-bold">AI Medical Specialist</TableHead>
                    <TableHead className="text-[16px] font-bold">Description</TableHead>
                    <TableHead className="text-[16px] font-bold">Date</TableHead>
                    <TableHead className="text-[16px] font-bold text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {historyList.map((record:sessionDetail, index:number) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium"> {record.selectedDoctor.specialist} </TableCell>
                        <TableCell> {record.notes} </TableCell>
                        <TableCell> {moment(new Date(record.createdOn)).format('MMMM Do YYYY, h:mm a')} </TableCell>
                        <TableCell className="text-center"> <ViewReportDialog record={ record }/> </TableCell>
                    </TableRow>
                ))}
                
            </TableBody>
        </Table>
    </div>
  )
};

export default HistoryTable;
