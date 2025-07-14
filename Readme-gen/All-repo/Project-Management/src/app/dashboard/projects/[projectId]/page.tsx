/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Calendar, Flag, Plus } from 'lucide-react';
import {
  useFetchTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from '@/util/API';

export default function ProjectDetail() {
  const editorRef = useRef<any>(null);
  const params = useParams();
  const projectId = params.projectId;
  const { deleteTask } = useDeleteTask();
  const { updateTask, isPending: isUpdating } = useUpdateTask();
  const { data: tasks, isPending, isError, error } = useFetchTasks();
  const { mutate: createTask, isPending: isCreating } = useCreateTask();

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 1,
    projectId: projectId,
  });
  const [editingTask, setEditingTask] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 1,
  });
  const [modalTask, setModalTask] = useState<any>(null);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      toast.error('Please fill all required fields.');
      return;
    }
    createTask(newTask, {
      onSuccess: () =>
        setNewTask({
          title: '',
          description: '',
          dueDate: '',
          priority: 1,
          projectId: projectId,
        }),
    });
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    if (!editForm.title || !editForm.description || !editForm.dueDate) {
      toast.error('Please fill all fields.');
      return;
    }
    updateTask(editingTask.id.toString(), editForm);
    setEditingTask(null);
    setEditForm({ title: '', description: '', dueDate: '', priority: 1 });
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return 'text-red-500 dark:text-red-400';
      case 2:
        return 'text-orange-500 dark:text-orange-400';
      case 3:
        return 'text-blue-500 dark:text-blue-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  const filteredTasks =
    tasks && projectId
      ? tasks.filter(
          (task: any) => task.projectId.toString() === projectId.toString()
        )
      : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Project Tasks</h1>
        <Button
          onClick={() =>
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
          }
        >
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      {isPending && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {isError && (
        <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">
              Error fetching tasks: {error?.message}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task: any) => {
            const sanitizedHTML = DOMPurify.sanitize(task.description);
            const textContent =
              new DOMParser().parseFromString(sanitizedHTML, 'text/html').body
                .textContent || '';
            const snippet =
              textContent.length > 100
                ? textContent.substring(0, 100) + '...'
                : textContent;

            return (
              <Card
                key={task.id}
                className="group hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">
                    {task.title}
                  </CardTitle>
                  <CardDescription className="mt-2 space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      {task.dueDate}
                    </div>
                    <div className="flex items-center text-sm">
                      <Flag
                        className={`mr-2 h-4 w-4 ${getPriorityColor(task.priority)}`}
                      />
                      {task.priority === 1
                        ? 'Very High'
                        : task.priority === 2
                        ? 'High'
                        : 'Moderate'}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {snippet}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setModalTask(task)}
                      variant="secondary"
                      size="sm"
                    >
                      View Description
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingTask(task);
                        setEditForm({
                          title: task.title,
                          description: textContent,
                          dueDate: task.dueDate,
                          priority: task.priority,
                        });
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteTask(task.id.toString())}
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="col-span-full">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No tasks available.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {editingTask && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateTask} className="space-y-6">
              <div className="space-y-4">
                <Input
                  placeholder="Title"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
                <Input
                  placeholder="Description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
                <Input
                  type="date"
                  value={editForm.dueDate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, dueDate: e.target.value })
                  }
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select
                    value={editForm.priority.toString()}
                    onValueChange={(value) =>
                      setEditForm({
                        ...editForm,
                        priority: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Very High</SelectItem>
                      <SelectItem value="2">High</SelectItem>
                      <SelectItem value="3">Moderate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-4">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Task
                </Button>
                <Button onClick={() => setEditingTask(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
          <CardDescription>Add a new task to your project</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateTask} className="space-y-6">
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <Editor
                value={newTask.description}
                onEditorChange={(content) =>
                  setNewTask({ ...newTask, description: content })
                }
                apiKey={process.env.NEXT_PUBLIC_API_KEY}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount',
                  ],
                  toolbar:
                    'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={newTask.priority.toString()}
                  onValueChange={(value) =>
                    setNewTask({
                      ...newTask,
                      priority: parseInt(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Very High</SelectItem>
                    <SelectItem value="2">High</SelectItem>
                    <SelectItem value="3">Moderate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={isCreating}>
              {isCreating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Task
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={!!modalTask} onOpenChange={() => setModalTask(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{modalTask?.title}</DialogTitle>
          </DialogHeader>
          <div className="prose dark:prose-invert max-h-[70vh] overflow-auto">
            {modalTask && parse(DOMPurify.sanitize(modalTask.description))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
