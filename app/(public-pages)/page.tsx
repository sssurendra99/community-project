import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { getAllBannerImages } from "@/utils/getAllBannerImage";
import { fetchProducts } from "@/features/queries/product-queries";
import { Product } from "@/types/product";
import ProductCard from "@/components/ui-tools/ProductCard";

export default async function Home() {

  const data: Product[] = await fetchProducts()

  const newArrivals: Product[] = data.slice(0, 4);

  const categories = [
    {
      name: "Kelly felder",
      image: "/collections/collection-kelly-felder.png"
    },
    {
      name: "Scylla Zelus",
      image: "/collections/collection-zelus.png"
    },
    {
      name: "Redvers Buller",
      image: "/collections/collection-redvers-buller.png"
    },
    {
      name: "Kelly Felder Jeans",
      image: "/collections/collection-kf-jeans.png"
    },
    {
      name: "WORKWEAR",
      image: "/collections/collection-workwear.png"
    },
    {
      name: "EIGHTY %",
      image: "/collections/collection-eighty.png"
    },
    {
      name: "CASUALS",
      image: "/collections/collection-casuals.png"
    },
  ];
  const bannerArray = await getAllBannerImages();

  const wearMeAngelsImages = [
    "/wearmeangels/model1.png",
    "/wearmeangels/model2.png", 
    "/wearmeangels/model3.png",
    "/wearmeangels/model4.png",
    "/wearmeangels/model5.png",
    "/wearmeangels/model6.png",
    "/wearmeangels/model7.png",
  
  ];


  return (
    <>
      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-screen"
        >
          <CarouselContent>
            {bannerArray.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-0">
                  <Card className="border-0">
                    <CardContent className="relative h-[700px] p-0">
                      <Image
                        src={`/banners/${image}`}
                        alt={`Banner image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="100vw"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-1/2 left-2 flex items-center justify-center">
            <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0" />
          </div>
          <div className="absolute top-1/2 right-2 flex items-center justify-center">
            <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0" />
          </div>
        </Carousel>
      </div>

      {/* Collection Section */}
      <div className="py-16 px-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex-1 h-px bg-black"></div>
          <h2 className="px-8 text-xl font-semibold text-black tracking-wider">
            COLLECTIONS
          </h2>
          <div className="flex-1 h-px bg-black"></div>
        </div>
        <div className="text-center">
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-black transition-colors underline"
          >
            View All
          </a>
        </div>
      </div>

      <div className="grid xl:grid-cols-4 gap-2 py-2 lg:grid-cols-2">
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              className="relative h-[480] justify-center flex m-2 items-center overflow-hidden rounded-none group cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={category.image}
                alt={`${category.name} collection`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              {/* Text Content */}
              <div className="relative z-10 text-center">
                <h1 className="text-white font-bold text-lg md:text-xl lg:text-2xl tracking-wider drop-shadow-lg">
                  {category.name.toUpperCase()}
                </h1>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trending banner section */}
      <div className="relative w-full h-[900px] mb-3">
        <Image
          src={"/home_banners/trending_banner.png"}
          alt={`Trending Banner`}
          fill
          className="object-cover"
        />
      </div>

      {/* New Arrivals Section */}
      <div className="py-16 px-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex-1 h-px bg-black"></div>
          <h2 className="px-8 text-xl font-semibold text-black tracking-wider">
            NEW ARRIVALS
          </h2>
          <div className="flex-1 h-px bg-black"></div>
        </div>
        <div className="text-center">
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-black transition-colors underline"
          >
            View All
          </a>
        </div>
      </div>
      {/* New Arrivals Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 items-center w-fit m-auto mb-10">
      {
        newArrivals.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      }
      </div>

      {/* Accessories banner section */}
      <div className="relative w-full h-[900px] mb-3">
        <Image
          src={"/home_banners/accessories_banner.png"}
          alt={`Accessories Banner`}
          fill
          className="object-cover"
        />
      </div>

      {/* Wear me angel Section */}
      <div className="py-16 px-4">
        <div className="flex items-center justify-center mb-4">
          <h2 className="px-8 text-xl font-bold text-black tracking-wider">
            #WEARMEANGELS
          </h2>
        </div>
        <div className="text-center">
          <p>Feel. Gorgeous. Love. WEAR ME.</p>
        </div>
      </div>

      {/* #WEARMEANGELS Carousel */}
      <div className="relative w-full mb-16">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {wearMeAngelsImages.map((image, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="overflow-hidden rounded-none">
                  <div className="aspect-[3/4] relative group cursor-pointer">
                    <Image
                      src={image}
                      alt={`Wear Me Angels ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-1/2 left-2 flex items-center justify-center">
            <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 bg-white/80 hover:bg-white" />
          </div>
          <div className="absolute top-1/2 right-2 flex items-center justify-center">
            <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 bg-white/80 hover:bg-white" />
          </div>
        </Carousel>
      </div>
    </>
  );
}