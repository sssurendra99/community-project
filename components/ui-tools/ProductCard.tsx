'use client'
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import ModelImage from "../../public/temp/IMG_9925.jpg";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProductCard = ({ product }: { product: Product }) => {
  const pathname = usePathname();
  const [firstImage, setFirstImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Function to get the first image from the product directory
    const getFirstImage = async () => {
      try {
        // Try common image extensions
        const extensions = ['jpg', 'jpeg', 'png', 'webp'];
        
        for (const ext of extensions) {
          const imagePath = `/uploads/products/${product.id}/1.${ext}`;
          
          // Check if image exists by trying to load it
          const img = new window.Image();
          img.onload = () => {
            setFirstImage(imagePath);
            setImageError(false);
          };
          img.onerror = () => {
            // Continue to next extension
          };
          img.src = imagePath;
          
          // If we found an image, break the loop
          if (firstImage) break;
        }
      } catch (error) {
        console.error('Error loading product image:', error);
        setImageError(true);
      }
    };

    getFirstImage();
  }, [product.id, firstImage]);

  const getImageSrc = () => {
    if (firstImage && !imageError) {
      return firstImage;
    }
    // Fallback to a default image or the ModelImage
    return ModelImage;
  };

  return (
    <Card className="relative p-0 border-none rounded-none shadow-none w-full">
      <CardHeader className="relative">
        <div className="relative overflow-clip">
          <p className="absolute bg-white text-black text-sm px-3 py-1 z-10">New</p>
          <Link href={`${pathname}/${product.id}`}>
            <Image
              src={getImageSrc()}
              alt={`${product.brand?.name} product image`}
              width={800}
              height={500}
              className="hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          </Link>
          <p className="absolute bottom-0 w-full bg-white text-center border-black border-[1px] text-sm py-2 hover:bg-black hover:text-white font-semibold cursor-pointer transition-colors duration-300">
            QUICK ADD
          </p>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-gray-400">
          {product.brand?.name.toUpperCase()}
        </p>
        <span className="text-sm text-gray-800">
          {product.productName || 'Boho Breeze Linen Dress - Cream'}
        </span>
        <p className="text-gray-800 font-semibold py-3">Rs {product.price}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row items-center justify-center w-full">
          <div className="border-2 border-red-900 flex items-center rounded-full justify-center m-1">
            <Badge
              variant={"outline"}
              className="relative p-0 w-8 h-8 rounded-full"
            >
              <Image
                src={ModelImage}
                alt={"Color variant"}
                fill
                className="rounded-full object-cover"
              />
            </Badge>
          </div>
          <div className="border-2 border-red-900 flex items-center rounded-full justify-center m-1">
            <Badge
              variant={"outline"}
              className="relative p-0 w-8 h-8 rounded-full"
            >
              <Image
                src={ModelImage}
                alt={"Color variant"}
                fill
                className="rounded-full object-cover"
              />
            </Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;