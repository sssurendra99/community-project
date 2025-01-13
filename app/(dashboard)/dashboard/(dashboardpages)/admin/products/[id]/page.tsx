import { ImageUpload } from '../../../../../../components/ImageUpload';
import React from 'react'

const ProductPage = ({ params} : { params: {id: string}}) => {
  return (
    <div>
        <ImageUpload 
        productId={parseInt(params.id)} 
        onUploadComplete={(image) => {
          // Handle successful upload
          console.log('Image uploaded:', image);
        }}
      />
    </div>
  )
}

export default ProductPage;