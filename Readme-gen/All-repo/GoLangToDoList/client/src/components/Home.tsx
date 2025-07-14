/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner'; // Import Sonner's toast
import Box from './Box';
import Navbar from './Navbar';

interface Todo {
  _id: string;
  body: string;
  completed: boolean;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/api/todo");
      setTodos(res.data);
    } catch (error) {
      toast.error("Failed to fetch todos"); // Updated to use Sonner
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:3000/api/todo/${id}`);
      if (res.status === 200) {
        setTodos(todos.filter(todo => todo._id !== id));
        toast.success("Task deleted successfully"); // Updated to use Sonner
      }
    } catch (error) {
      toast.error("Failed to delete task"); // Updated to use Sonner
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const res = await axios.post("http://127.0.0.1:3000/api/todo", { body: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo('');
      toast.success("New task added"); // Updated to use Sonner
    } catch (error) {
      toast.error("Failed to add task"); // Updated to use Sonner
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <Navbar />
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Tasks</h1>
        </div>

        <form onSubmit={handleAddTodo} className="mb-8 flex gap-2">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </Button>
        </form>

        <AnimatePresence>
          {todos.map((todo) => (
            <Box
              key={todo._id}
              id={todo._id}
              description={todo.body}
              completed={todo.completed}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
