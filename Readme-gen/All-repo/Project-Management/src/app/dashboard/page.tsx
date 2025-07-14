/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';
import {
 Folders,
 Plus,
 Pencil,
 Trash2,
 Calendar,
 Library,
 Loader2,
 Save,
 X,
 Eye,
} from 'lucide-react';
import {
 useFetchProjects,
 useCreateProject,
 useDeleteProject,
} from '@/util/API';
import {
 useFetchCategories,
 useCreateCategory,
 useUpdateCategory,
 useDeleteCategory,
} from '@/util/API';

export default function Dashboard() {
 const { data: categories, isFetching: categoriesLoading } =
  useFetchCategories();
 const [editingCategory, setEditingCategory] = useState<number | null>(null);
 const { data: projects, isFetching: projectsLoading } = useFetchProjects();
 const [editCategoryName, setEditCategoryName] = useState('');
 const { mutate: createProject } = useCreateProject();

 const [newProject, setNewProject] = useState<{
  name: string;
  description: string;
  dueDate: string;
  categoryId: number | null;
 }>({
  name: '',
  description: '',
  dueDate: '',
  categoryId: null,
 });

 const { mutate: createCategory } = useCreateCategory();
 const { mutate: updateCategory } = useUpdateCategory();
 const { mutate: deleteCategory } = useDeleteCategory();
 const { mutate: deleteProject } = useDeleteProject();
 const [newCategory, setNewCategory] = useState('');

 const handleCategoryCreate = (e: React.FormEvent) => {
  e.preventDefault();
  if (newCategory.trim() === '') {
   toast.error('Category name is required.');
   return;
  }
  createCategory({ name: newCategory });
  setNewCategory('');
 };

 const handleCategoryUpdate = (cat: any) => {
  if (editCategoryName.trim() === '') {
   toast.error('Category name is required.');
   return;
  }
  updateCategory({ categoryId: cat.id.toString(), name: editCategoryName });
  setEditingCategory(null);
  setEditCategoryName('');
 };

 const handleCategoryDelete = (catId: number) => {
  if (window.confirm('Are you sure you want to delete this category?')) {
   deleteCategory(catId.toString());
  }
 };

 const groupedProjects = useMemo(() => {
  const groups: Record<string, any[]> = {};
  if (projects) {
   projects.forEach((project: any) => {
    const catKey = project.categoryId
     ? project.categoryId.toString()
     : 'uncategorized';
    if (!groups[catKey]) groups[catKey] = [];
    groups[catKey].push(project);
   });
  }
  return groups;
 }, [projects]);

 const handleCreateProject = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newProject.name) {
   toast.error('Project name is required.');
   return;
  }
  const projectPayload: any = { ...newProject };
  if (newProject.categoryId !== null) {
   projectPayload.categoryId = newProject.categoryId;
  } else {
   delete projectPayload.categoryId;
  }
  createProject(projectPayload, {
   onSuccess: () => {
    setNewProject({
     name: '',
     description: '',
     dueDate: '',
     categoryId: null,
    });
   },
  });
 };

 const handleDeleteProject = (projectId: string) => {
  try {
   deleteProject(projectId);
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <div className="min-h-screen p-6 space-y-8">
   {/* Header */}
   <div className="space-y-2">
    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
    <p className="text-muted-foreground">
     Manage your projects and categories.
    </p>
   </div>

   {/* Categories Management */}
   <Card className="border-none bg-card/50 backdrop-blur-sm shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
     <CardTitle className="text-xl font-semibold">
      <Folders className="w-5 h-5 inline-block mr-2" />
      Manage Categories
     </CardTitle>
    </CardHeader>
    <CardContent>
     <form onSubmit={handleCategoryCreate} className="flex gap-2 mb-6">
      <Input
       placeholder="New Category Name"
       value={newCategory}
       onChange={(e) => setNewCategory(e.target.value)}
       className="max-w-sm"
      />
      <Button type="submit">
       <Plus className="w-4 h-4 mr-2" />
       Add Category
      </Button>
     </form>

     {categoriesLoading ? (
      <div className="flex items-center justify-center py-4">
       <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
     ) : (
      <div className="space-y-2">
       {categories?.map((cat: any) => (
        <div
         key={cat.id}
         className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50"
        >
         {editingCategory === cat.id ? (
          <>
           <Input
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            className="max-w-sm"
           />
           <Button size="sm" onClick={() => handleCategoryUpdate(cat)}>
            <Save className="w-4 h-4 mr-2" />
            Save
           </Button>
           <Button
            size="sm"
            variant="outline"
            onClick={() => setEditingCategory(null)}
           >
            <X className="w-4 h-4 mr-2" />
            Cancel
           </Button>
          </>
         ) : (
          <>
           <span className="flex-1 font-medium">{cat.name}</span>
           <Button
            size="sm"
            variant="outline"
            onClick={() => {
             setEditingCategory(cat.id);
             setEditCategoryName(cat.name);
            }}
           >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
           </Button>
           <Button
            size="sm"
            variant="destructive"
            onClick={() => handleCategoryDelete(cat.id)}
           >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
           </Button>
          </>
         )}
        </div>
       ))}
      </div>
     )}
    </CardContent>
   </Card>

   {/* Create Project */}
   <Card className="border-none bg-card/50 backdrop-blur-sm shadow-lg">
    <CardHeader>
     <CardTitle className="text-xl font-semibold">
      <Plus className="w-5 h-5 inline-block mr-2" />
      Create New Project
     </CardTitle>
    </CardHeader>
    <CardContent>
     <form onSubmit={handleCreateProject} className="space-y-4 max-w-2xl">
      <div className="space-y-2">
       <Input
        placeholder="Project Name"
        value={newProject.name}
        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
       />
      </div>
      <div className="space-y-2">
       <Input
        placeholder="Description"
        value={newProject.description}
        onChange={(e) =>
         setNewProject({ ...newProject, description: e.target.value })
        }
       />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div className="space-y-2">
        <Input
         type="date"
         value={newProject.dueDate}
         onChange={(e) =>
          setNewProject({ ...newProject, dueDate: e.target.value })
         }
        />
       </div>
       <div className="space-y-2">
        <Select
         value={
          newProject.categoryId !== null
           ? newProject.categoryId.toString()
           : undefined
         }
         onValueChange={(value) =>
          setNewProject({
           ...newProject,
           categoryId: value === 'none' ? null : parseInt(value),
          })
         }
        >
         <SelectTrigger>
          <SelectValue placeholder="Select Category (optional)" />
         </SelectTrigger>
         <SelectContent>
          <SelectItem value="none">No Category</SelectItem>
          {categories?.map((cat: any) => (
           <SelectItem key={cat.id} value={cat.id.toString()}>
            {cat.name}
           </SelectItem>
          ))}
         </SelectContent>
        </Select>
       </div>
      </div>
      <Button type="submit" className="w-full">
       <Plus className="w-4 h-4 mr-2" />
       Create Project
      </Button>
     </form>
    </CardContent>
   </Card>

   {/* Projects List */}
   {projectsLoading || categoriesLoading ? (
    <div className="flex items-center justify-center py-8">
     <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
   ) : (
    <div className="space-y-8">
     {Object.keys(groupedProjects).map((catKey) => {
      const category =
       catKey === 'uncategorized'
        ? { name: 'Uncategorized' }
        : categories.find((cat: any) => cat.id.toString() === catKey) || {
           name: 'Unknown Category',
          };

      return (
       <div key={catKey} className="space-y-4">
        <div className="flex items-center gap-2">
         <Library className="w-5 h-5 text-primary" />
         <h2 className="text-xl font-bold">{category.name}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {groupedProjects[catKey].map((project: any) => (
          <Card
           key={project.id}
           className="border-none bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
          >
           <CardContent className="pt-6">
            <div className="space-y-4">
             <div>
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-muted-foreground mt-1">
               {project.description}
              </p>
             </div>

             <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              Due: {project.dueDate}
             </div>

             <div className="flex items-center gap-2">
              <Link
               href={`/dashboard/projects/${project.id}`}
               className="flex-1"
              >
               <Button className="w-full" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Tasks
               </Button>
              </Link>
              <Button
               variant="destructive"
               size="icon"
               onClick={() => {
                if (
                 window.confirm('Are you sure you want to delete this project?')
                ) {
                 handleDeleteProject(project.id.toString());
                }
               }}
              >
               <Trash2 className="w-4 h-4" />
              </Button>
             </div>
            </div>
           </CardContent>
          </Card>
         ))}
        </div>
       </div>
      );
     })}
    </div>
   )}
  </div>
 );
}
