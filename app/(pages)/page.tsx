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

// Temporary categories.

export default async function Home() {
  const categories = [
    "Kelly felder",
    "Scylla Zelus",
    "Redvers Buller",
    "Kelly Felder Jeans",
    "50% - 70% OFF",
    "WORKWEAR",
    "EIGHTY %",
    "CASUALS",
  ];

  const bannerArray = await getAllBannerImages();

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
      <div className="grid xl:grid-cols-4 gap-2 py-2 lg:grid-cols-2">
        {categories.map((category, index) => {
          return (
            <div key={index} className="bg-slate-800 text-white h-96 justify-center flex m-2 items-center">
              <h1>{category.toUpperCase()}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}
