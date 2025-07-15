import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';
import { CirclePlus } from 'lucide-react';

const AddNewSessionDialog = () => {
  return (
    <Dialog>
        <DialogTrigger>
            <Button className='mt-5 hover:w-50 hover:cursor-pointer'> <CirclePlus/> Start a Consultation </Button>
        </DialogTrigger>
        
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
};

export default AddNewSessionDialog;