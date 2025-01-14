import ProductGrid from '@/app/components/ui-tools/ProductGridComponent';
import React, { ReactNode } from 'react'

const DenimCollectionPage = () => {

    const products = [
        {
            id: 1,
            name: "Boho Breeze Linen Dress",
            brand: "EIGHTY %",
            price: 7500,
            imageUrl: "/path-to-image.jpg",
            isNew: true,
            colors: ["#8B4513", "#D2B48C"]
        },
    ]

  return (
    <div>
        <ProductGrid products={products} />
    </div>
  )
}

export default DenimCollectionPage;