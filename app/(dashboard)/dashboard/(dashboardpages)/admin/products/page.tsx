'use client'

import CreateProduct from '@/app/components/CreateProduct';
import AddCategoryFormComponent from '@/app/components/forms/AddCategoryFormComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger } from '@/components/ui/dialog';

import { AlertTriangle, Package, PlusIcon } from 'lucide-react';
import React from 'react'

const ProductPage = () => {

  const [lowStockItems, setLowStockItems] = React.useState(0);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [activeProducts, setActiveProducts] = React.useState(0);

  return (
    <>
      <div className='w-full flex justify-end gap-4'>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-black text-white font-semibold hover:bg-blue-900'>
                <PlusIcon strokeWidth={4}/>Add Product
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
        <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="text-gray-400" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="text-green-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
            <AlertTriangle className="text-orange-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Product Name</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Stock</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Product rows will be mapped here */}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
      </div>
    </>
  )
}

export default ProductPage;