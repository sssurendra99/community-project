import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Collection } from '@/types/collection'

export default function CollectionCard({ collection, imageUrl }: { collection: Collection, imageUrl: string }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <Image
                src={imageUrl}
                alt={"#"}
                width={400}
                height={400}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="text-center space-y-3">
              <h3 className="text-xl font-bold tracking-wider text-black">{collection.name}</h3>

              <p className="text-gray-500 text-sm font-medium">{collection.productCount} PRODUCTS</p>

              <Button
                className="w-[40%] bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-none transition-colors duration-200"
                size="lg"
              >
                SHOP NOW
              </Button>
            </div>
          
      </div>
    </div>
  )
}
