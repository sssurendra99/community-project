'use client'

import { useParams } from 'next/navigation'
import { useProductById } from '@/features/hooks/products'

const ProductPage = () => {
  const params = useParams()
  const productId = params.productId as string
  const { data, isLoading, error } = useProductById({ productId })

  console.log('productId:', productId) // Debug log
  console.log('data:', data) // Debug log

  if (!productId) return <div>No product ID provided</div>
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading product: {error.message}</div>
  if (!data) return <div>Product not found</div>

  return (
    <div>{data.productName}</div>
  )
}

export default ProductPage