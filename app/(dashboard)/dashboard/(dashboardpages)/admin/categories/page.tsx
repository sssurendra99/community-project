'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit2, Trash2, Tag, PlusIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AddCategoryFormComponent from '@/app/components/forms/AddCategoryFormComponent';

interface CategoryResponseInterface{
    id: string,
    name: string,
    slug: string,
    description: string,
    size: number,
}


const CategoriesPage = () => {

const [categories, setCategories] = useState<CategoryResponseInterface[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2E3440]">Categories</h1>
        <div>
            <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-black text-white font-semibold hover:bg-blue-900'>
                <PlusIcon strokeWidth={4}/>Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
                <AddCategoryFormComponent />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-[#ECEFF4]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#2E3440]">Category List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#4C566A]" />
                <Input
                  placeholder="Search categories..."
                  className="pl-8 bg-white text-[#2E3440]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {categories.map((category: CategoryResponseInterface) => (
              <Card key={category.id} className="bg-white">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#5E81AC] bg-opacity-10 rounded-lg">
                      <Tag className="h-5 w-5 text-[#5E81AC]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2E3440]">
                        {category.name}
                      </h3>
                      <p className="text-sm text-[#4C566A]">
                        {category.description}
                      </p>
                      <div className="text-xs text-[#4C566A] mt-1">
                        Slug: {category.slug} • {category.size} products
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#5E81AC] hover:text-[#81A1C1]"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;