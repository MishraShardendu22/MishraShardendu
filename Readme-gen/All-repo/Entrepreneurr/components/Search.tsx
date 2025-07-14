'use client';
import React, { useRef } from 'react';
import Form from 'next/form';
import { SearchIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Search_Reset from './Search_Reset';

interface SearchProps {
  query: string | null;
}

const Search = ({ query }: SearchProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const resetForm = () => {
    formRef.current?.reset();
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-none">
      <CardHeader>
        
      </CardHeader>
      <CardContent>
        <Form
          action="/"
          scroll={false}
          className="relative flex gap-2"
          ref={formRef}
        >
          <div className="relative flex-1">
            <Input
              type="text"
              name="query"
              placeholder="Search it Away !!"
              defaultValue={query ?? ''}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="flex gap-2">
            {query && <Search_Reset onReset={resetForm} />}
            <button
              type="submit"
              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <SearchIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Search;