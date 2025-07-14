import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface CarouselProps {
  images: { publicUrl: string; altText?: string }[];
}

export const ProductPageCarousel: React.FC<CarouselProps> = ({ images }) => {

  console.log("ProductPageCarousel images:", images);
  return (
    <div className="w-full relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-0">
                <Card className="border-0 shadow-none">
                  <CardContent className="relative p-0">
                    <img
                      src={image.publicUrl || `/public/uploads/products/d9a67791-bb29-432c-846d-da7df5c66680/d0ec43ac-4918-4351-aff1-d97c3a4d123a/1739380271235-web_0062__93A0010.webp`}
                      alt={image.altText || `Product Image ${index + 1}`}
                      className="w-full h-auto object-cover rounded-none"
                      style={{ aspectRatio: "2/3" }}
                      sizes="(min-width: 2000px) 1500px, (min-width: 1200px) 1200px, (min-width: 768px) calc((100vw - 30px) / 2), calc(100vw - 20px)"
                      srcSet={`${image.publicUrl} 1200w, ${image.publicUrl} 1500w`}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-md" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-md" />
      </Carousel>
    </div>
  );
};
