'use client'

import CreateProduct from '@/app/components/CreateProduct';
import AddCategoryFormComponent from '@/app/components/forms/AddCategoryFormComponent';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger } from '@/components/ui/dialog';

import { PlusIcon } from 'lucide-react';
import React from 'react'

const ProductPage = () => {
  return (
    <div>
      <div className='w-full flex justify-end gap-4'>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-black text-white font-semibold hover:bg-blue-900'>
                <PlusIcon strokeWidth={4}/>Category
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
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-black text-white font-semibold hover:bg-blue-900'>
                <PlusIcon strokeWidth={4}/>Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
              </DialogHeader>
                <CreateProduct />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default ProductPage;