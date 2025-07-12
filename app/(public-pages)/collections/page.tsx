import BreadCrumbComponent from '@/components/ui-tools/BreadCrumbComponent';
import CollectionCard from '@/components/ui-tools/CollectionCard';
import { fetchCategories } from '@/features/queries/category-queries';
import { fetchProducts } from '@/features/queries/product-queries';
import { Category } from '@/types/category';
import { Collection } from '@/types/collection';
import { Product } from '@/types/product';
import React from 'react';


function createCollections(categories: Category[], products: Product[]): Collection[] {
  return categories.map(category => {
    const productCount = products.filter(product => product.categoryId === category.id).length;
    
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      productCount,
    };
  });
}

const CollectionPage = async () => {

  const data: Product[] = await fetchProducts()
  
  const categories: Category[] = await fetchCategories()

  const collections: Collection[] = createCollections(categories, data);


  return (
    <div className='lg:max-w-[1200px] m-auto mb-10'>
        <div className='py-5 text-m'>
            <BreadCrumbComponent/>
        </div>
        <h2 className='text-2xl font-bold tracking-wider my-4'>COLLECTIONS</h2>
        <div className='grid grid-cols-3 w-fit mx-auto gap-6'>
            {collections.map((collection) => (
                <div key={collection.id} className='w-full'> 
                  <CollectionCard key={collection.id} collection={collection}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CollectionPage;