/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import {
 useFetchTasks,
 useCreateTask,
 useUpdateTask,
 useDeleteTask,
} from '@/util/API';

const TasksPage = () => {
 const { data: tasks, isPending, isError, error } = useFetchTasks();
 const { mutate: createTask, isPending: isCreating } = useCreateTask();
 const { updateTask, isPending: isUpdating } = useUpdateTask();
 const { deleteTask, isPending: isDeleting } = useDeleteTask();

 const [newTask, setNewTask] = useState({
  title: '',
  description: '',
  dueDate: '',
  priority: 1,
  projectId: '',
 });

 const [editingTask, setEditingTask] = useState<any>(null);
 const [editForm, setEditForm] = useState({
  title: '',
  description: '',
  dueDate: '',
 });

 const handleCreateTask = (e: React.FormEvent) => {
  e.preventDefault();
  if (
   !newTask.title ||
   !newTask.description ||
   !newTask.dueDate ||
   !newTask.priority ||
   !newTask.projectId
  ) {
   alert('Please fill all fields');
   return;
  }
  createTask(newTask, {
   onSuccess: () =>
    setNewTask({
     title: '',
     description: '',
     dueDate: '',
     priority: 1,
     projectId: '',
    }),
  });
 };

 const handleUpdateTask = (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingTask) return;
  if (!editForm.title || !editForm.description || !editForm.dueDate) {
   alert('Please fill all fields');
   return;
  }
  updateTask(editingTask.id.toString(), editForm);
  setEditingTask(null);
  setEditForm({ title: '', description: '', dueDate: '' });
 };

 const handleDeleteTask = (taskId: string) => {
  if (window.confirm('Are you sure you want to delete this task?')) {
   deleteTask(taskId);
  }
 };

 return (
  <div
   style={{ padding: '20px', color: 'black', fontFamily: 'Arial, sans-serif' }}
  >
   <h1>Tasks</h1>
   {isPending && <p>Loading tasks...</p>}
   {isError && <p>Error fetching tasks: {error?.message}</p>}

   <div>
    {tasks && tasks.length > 0 ? (
     <ul style={{ listStyleType: 'none', padding: 0 }}>
      {tasks.map((task: any) => (
       <li
        key={task.id}
        style={{
         border: '1px solid #ccc',
         marginBottom: '10px',
         padding: '10px',
        }}
       >
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Due Date: {task.dueDate}</p>
        <p>Priority: {task.priority}</p>
        <button
         onClick={() => {
          setEditingTask(task);
          setEditForm({
           title: task.title,
           description: task.description,
           dueDate: task.dueDate,
          });
         }}
        >
         Edit
        </button>
        <button onClick={() => handleDeleteTask(task.id.toString())}>
         Delete
        </button>
       </li>
      ))}
     </ul>
    ) : (
     <p>No tasks available</p>
    )}
   </div>

   {editingTask && (
    <div
     style={{ marginTop: '20px', padding: '10px', border: '1px solid #aaa' }}
    >
     <h2>Edit Task</h2>
     <form onSubmit={handleUpdateTask}>
      <div style={{ marginBottom: '10px' }}>
       <label>Title: </label>
       <input
        type="text"
        value={editForm.title}
        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
       />
      </div>
      <div style={{ marginBottom: '10px' }}>
       <label>Description: </label>
       <input
        type="text"
        value={editForm.description}
        onChange={(e) =>
         setEditForm({ ...editForm, description: e.target.value })
        }
       />
      </div>
      <div style={{ marginBottom: '10px' }}>
       <label>Due Date: </label>
       <input
        type="date"
        value={editForm.dueDate}
        onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
       />
      </div>
      <button type="submit" disabled={isUpdating}>
       Update Task
      </button>
      <button type="button" onClick={() => setEditingTask(null)}>
       Cancel
      </button>
     </form>
    </div>
   )}

   <div
    style={{ marginTop: '20px', padding: '10px', border: '1px solid #aaa' }}
   >
    <h2>Create New Task</h2>
    <form onSubmit={handleCreateTask}>
     <div style={{ marginBottom: '10px' }}>
      <label>Title: </label>
      <input
       type="text"
       value={newTask.title}
       onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
     </div>
     <div style={{ marginBottom: '10px' }}>
      <label>Description: </label>
      <input
       type="text"
       value={newTask.description}
       onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
     </div>
     <div style={{ marginBottom: '10px' }}>
      <label>Due Date: </label>
      <input
       type="date"
       value={newTask.dueDate}
       onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
      />
     </div>
     <div style={{ marginBottom: '10px' }}>
      <label>Priority: </label>
      <input
       type="number"
       value={newTask.priority}
       onChange={(e) =>
        setNewTask({ ...newTask, priority: parseInt(e.target.value) })
       }
      />
     </div>
     <div style={{ marginBottom: '10px' }}>
      <label>Project ID: </label>
      <input
       type="text"
       value={newTask.projectId}
       onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
      />
     </div>
     <button type="submit" disabled={isCreating}>
      Create Task
     </button>
    </form>
   </div>
  </div>
 );
};

export default TasksPage;
