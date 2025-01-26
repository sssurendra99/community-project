'use client'
import { useProductById } from '@/features/hooks/products'
import { useRouter } from 'next/router'
import React from 'react'

const ProductPage = () => {
  const router = useRouter()
  const { productId } = router.query;
  const {data } = useProductById({ productId: productId as string })

  return (
    <div>{data.productName}</div>
  )
}

export default ProductPage;