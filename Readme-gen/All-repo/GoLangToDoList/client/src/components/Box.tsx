/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner'; // Import Sonner's toast
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface BoxProps {
  id: string;
  description: string;
  completed: boolean;
  onDelete: (id: string) => void;
}

const Box: React.FC<BoxProps> = ({ id, description, completed, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleComplete = async () => {
    try {
      const res = await axios.patch(`http://127.0.0.1:3000/api/todo/${id}`, { completed: true });
      if (res.status === 200) {
        setIsCompleted(true);
        toast.success("Task marked as complete"); // Use Sonner toast
      }
    } catch (error) {
      toast.error("Failed to mark task as complete"); // Use Sonner toast
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800 border-gray-700 mb-4">
        <CardContent className="p-4 flex items-center justify-between">
          <span className={`text-gray-200 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
            {description}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleComplete}
              disabled={isCompleted}
              className="hover:bg-gray-700"
            >
              <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-green-500' : 'text-gray-400'}`} />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-800 border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-200">Delete Task?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-700 text-gray-200 hover:bg-gray-600">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => {
                      onDelete(id);
                      toast.success("Task deleted successfully"); // Use Sonner toast
                    }} 
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Box;
