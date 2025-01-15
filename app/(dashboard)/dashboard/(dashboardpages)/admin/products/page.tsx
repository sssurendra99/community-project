'use client'

import CreateProduct from '@/app/components/CreateProduct';
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
      <div className='w-full flex justify-end'>
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
      <div>

      </div>
    </div>
  )
}

export default ProductPage;