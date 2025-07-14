/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const api = axios.create({ baseURL: '/api' });

export const useFetchTasks = () => {
 const { data, error, isPending, isError, isFetching } = useQuery({
  queryKey: ['tasks'],
  queryFn: () => api.get('/tasks').then((res) => res.data.data),
 });
 console.log('The Data is: ', data);
 return { data, error, isPending, isError, isFetching };
};

export const useCreateTask = () => {
 const queryClient = useQueryClient();
 const { mutate, isPending, isError, error } = useMutation({
  mutationFn: (task: any) => api.post('/tasks', task).then((res) => res.data),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
 });
 return { mutate, isPending, isError, error };
};

export const useDeleteTask = () => {
 const queryClient = useQueryClient();

 const { mutate, isPending, isError, error } = useMutation({
  mutationFn: async (taskId: string) => {
   if (!taskId) throw new Error('Task ID is required');
   return api.delete(`/tasks/${taskId}`).then((res) => res.data);
  },
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
  onError: (err) => {
   console.error('Error deleting task:', err);
  },
 });

 const deleteTask = (taskId: string) => {
  if (!taskId) {
   console.warn('Task ID is missing!');
   return;
  }
  mutate(taskId);
 };

 return { deleteTask, isPending, isError, error };
};

export const useUpdateTask = () => {
 const queryClient = useQueryClient();

 const { mutate, isPending, isError, error } = useMutation({
  mutationFn: async ({ taskId, updates }: { taskId: string; updates: any }) => {
   if (!taskId) throw new Error('Task ID is required');
   return api.put(`/tasks/${taskId}`, updates).then((res) => res.data);
  },
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
  onError: (err) => {
   console.error('Error updating task:', err);
  },
 });

 const updateTask = (taskId: string, updates: any) => {
  if (!taskId) {
   console.warn('Task ID is missing!');
   return;
  }
  mutate({ taskId, updates });
 };

 return { updateTask, isPending, isError, error };
};

export const useFetchProjects = () => {
 return useQuery({
  queryKey: ['projects'],
  queryFn: async () => {
   const { data } = await api.get('/projects');
   return data.data;
  },
 });
};

export const useCreateProject = () => {
 const queryClient = useQueryClient();
 return useMutation({
  mutationFn: async (project: any) => {
   const { data } = await api.post('/projects', project);
   return data;
  },
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ['projects'] });
  },
 });
};

export const useUpdateProject = () => {
 const queryClient = useQueryClient();
 return useMutation({
  mutationFn: async ({
   projectId,
   updates,
  }: {
   projectId: string;
   updates: any;
  }) => {
   const { data } = await api.put(`/projects/${projectId}`, updates);
   return data;
  },
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ['projects'] });
  },
 });
};

export const useDeleteProject = () => {
 const queryClient = useQueryClient();
 return useMutation({
  mutationFn: async (projectId: string) => {
   console.log('Project ID: ', projectId);
   const { data } = await api.delete(`/projects/${projectId}`);
   return data;
  },
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ['projects'] });
  },
 });
};

export const useFetchCategories = () => {
 const { data, error, isPending, isError, isFetching } = useQuery({
  queryKey: ['categories'],
  queryFn: () => api.get('/categories').then((res) => res.data.data),
 });
 return { data, error, isPending, isError, isFetching };
};

export const useCreateCategory = () => {
 const queryClient = useQueryClient();
 const { mutate, isPending, isError, error } = useMutation({
  mutationFn: (category: any) =>
   api.post('/categories', category).then((res) => res.data),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
 });
 return { mutate, isPending, isError, error };
};

export const useUpdateCategory = () => {
 const queryClient = useQueryClient();
 const { mutate, isPending, isError, error } = useMutation({
  mutationFn: ({ categoryId, name }: { categoryId: string; name: string }) =>
   api.put(`/categories/${categoryId}`, { name }).then((res) => res.data),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
 });
 return { mutate, isPending, isError, error };
};

export const useDeleteCategory = () => {
 const queryClient = useQueryClient();
 const { mutate, isPending, isError, error } = useMutation({
  mutationFn: (categoryId: string) =>
   api.delete(`/categories/${categoryId}`).then((res) => res.data),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
 });
 return { mutate, isPending, isError, error };
};
