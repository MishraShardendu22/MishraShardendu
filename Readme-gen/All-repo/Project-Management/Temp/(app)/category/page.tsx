'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
 useCreateCategory,
 useDeleteCategory,
 useFetchCategories,
 useUpdateCategory,
} from '@/util/API';
import { useState } from 'react';

const CategoriesPage = () => {
 const { data: categories, isPending, isError, error } = useFetchCategories();
 const { mutate: createCategory } = useCreateCategory();
 const { mutate: updateCategory } = useUpdateCategory();
 const { mutate: deleteCategory } = useDeleteCategory();

 const [newCategory, setNewCategory] = useState('');
 const [editing, setEditing] = useState<{ [key: number]: string }>({});

 const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (newCategory.trim() !== '') {
   // Hardcoding userId; adjust as needed.
   createCategory({ name: newCategory, userId: 1 });
   setNewCategory('');
  }
 };

 const handleUpdate = (id: number, name: string) => {
  if (name.trim() !== '') {
   updateCategory({ categoryId: id.toString(), name });
   setEditing((prev) => {
    const copy = { ...prev };
    delete copy[id];
    return copy;
   });
  }
 };

 return (
  <div className="container mx-auto p-4">
   <h1 className="text-2xl font-bold mb-4">Categories</h1>
   <form onSubmit={handleCreate} className="mb-6">
    <input
     type="text"
     value={newCategory}
     onChange={(e) => setNewCategory(e.target.value)}
     placeholder="New Category Name"
     className="border p-2 mr-2"
    />
    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
     Add Category
    </button>
   </form>
   {isPending && <p>Loading...</p>}
   {isError && <p>Error: {error?.message || 'Something went wrong'}</p>}
   {categories && (
    <ul>
     {categories.map((cat: any) => (
      <li key={cat.id} className="flex items-center mb-2">
       {editing[cat.id] !== undefined ? (
        <>
         <input
          type="text"
          value={editing[cat.id]}
          onChange={(e) =>
           setEditing((prev) => ({
            ...prev,
            [cat.id]: e.target.value,
           }))
          }
          className="border p-2 mr-2"
         />
         <button
          onClick={() => handleUpdate(cat.id, editing[cat.id])}
          className="bg-green-500 text-white p-2 rounded mr-2"
         >
          Save
         </button>
         <button
          onClick={() =>
           setEditing((prev) => {
            const copy = { ...prev };
            delete copy[cat.id];
            return copy;
           })
          }
          className="bg-gray-500 text-white p-2 rounded"
         >
          Cancel
         </button>
        </>
       ) : (
        <>
         <span className="mr-4">{cat.name}</span>
         <button
          onClick={() =>
           setEditing((prev) => ({ ...prev, [cat.id]: cat.name }))
          }
          className="bg-yellow-500 text-white p-2 rounded mr-2"
         >
          Edit
         </button>
         <button
          onClick={() => deleteCategory(cat.id.toString())}
          className="bg-red-500 text-white p-2 rounded"
         >
          Delete
         </button>
        </>
       )}
      </li>
     ))}
    </ul>
   )}
  </div>
 );
};

export default CategoriesPage;
