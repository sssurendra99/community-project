'use client'

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid, List, LayoutGrid, Columns } from "lucide-react";
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { Category } from '@/types/category';

const ProductGrid = ({ products, category} : {products: Product[], category: Category}) => {
  const [viewMode, setViewMode] = useState('grid-4')
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [sortBy, setSortBy] = useState('date-new')

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
  };

  const getGridClass = () => {
    switch (viewMode) {
      case 'list': return 'grid grid-cols-1 gap-4'
      case 'grid-2': return 'grid grid-cols-2 gap-4'
      case 'grid-3': return 'grid grid-cols-3 gap-4'
      case 'grid-4': return 'grid grid-cols-4 gap-4'
      default: return 'grid grid-cols-4 gap-4'
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col justify-between mb-6">
        <h1 className="text-2xl font-bold border-b-[1px] pb-5 tracking-wider">{category.name.toUpperCase()}</h1>
        
        {/* Filters section. */}
        <div className="flex flex-row items-center justify-between text-xs">
          <div className="flex items-center gap-2 ">
            <span className="text-sm">VIEW AS</span>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : ''}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid-2')}
                className={`p-2 ${viewMode === 'grid-2' ? 'bg-gray-200' : ''}`}
              >
                <Columns className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid-3')}
                className={`p-2 ${viewMode === 'grid-3' ? 'bg-gray-200' : ''}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid-4')}
                className={`p-2 ${viewMode === 'grid-4' ? 'bg-gray-200' : ''}`}
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className='flex gap-5 py-4'>
            <div className="flex items-center gap-2">
                <span className="text-sm">ITEMS PER PAGE</span>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-24 rounded-none">
                    <SelectValue placeholder="20" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="40">40</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm">SORT BY</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 rounded-none">
                    <SelectValue placeholder="Date, new to old" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="date-new">Date, new to old</SelectItem>
                    <SelectItem value="date-old">Date, old to new</SelectItem>
                    <SelectItem value="price-low">Price, low to high</SelectItem>
                    <SelectItem value="price-high">Price, high to low</SelectItem>
                </SelectContent>
                </Select>
            </div>
          </div>
        </div>
      </div>

      <div className={getGridClass()}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid;